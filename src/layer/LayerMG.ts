
namespace gcc.layer {

	export class TLayerMG {
		protected dialogClassMap: { [key: string]: new () => cc.Component } = EmptyTable()
		registerDialogClass(key: string, cls: new () => cc.Component) {
			this.dialogClassMap[key] = cls
		}
		getDialogClass(key: string): string {
			// return this.dialogClassMap[key]
			return key
		}

		protected tagFilter: TagFilter = new TagFilter()
		layerOrderMG: LayerOrderMG = new LayerOrderMG()

		protected sharedLayerMGComp!: ILayerMGComp
		get layerRoot() {
			return this.sharedLayerMGComp.layerRoot
		}
		get layerComp(): cc.Component & IDialogInnerCall {
			return this.sharedLayerMGComp as any as (cc.Component & IDialogInnerCall)
		}

		/**
		 * 加载核心图层配置
		 * @returns 
		 */
		public loadMGConfig(prefab?: cc.Node | cc.Prefab) {
			const handleConfigSource = (node: cc.Node) => {
				this.sharedLayerMGComp = node.getComponent("LayerMGComp") as ILayerMGComp
				node.setParent(cc.director.getScene())
			}
			if (prefab) {
				return new Promise((resolve, reject) => {
					let node = cc.instantiate(prefab) as cc.Node
					handleConfigSource(node)
					resolve(node)
				})
			}
			return respool.MyNodePool.loadAsync("prefabs/uibase/UICore").then((node) => {
				handleConfigSource(node)
			})
		}
		/**
		 * 获取核心图层配置
		 * @returns
		 */
		get MGConfig(): ILayerMGComp {
			return this.sharedLayerMGComp
		}

		preloadDialog(p0: string | ShowDialogParam): Promise<DialogModel> {
			let p: ShowDialogParam
			if (typeof (p0) == "string") {
				p = new ShowDialogParam(p0)
			} else {
				p = p0
			}

			return new Promise((resolve, reject) => {
				this.createDialog(p).then((dialogModel) => {
					// const node = dialogModel.node
					// if (!node.active) {
					// 	node.active = true
					// }
					// if (node.parent == null) {
					// 	node.parent = this.MGConfig.layerRoot
					// }
					resolve(dialogModel)
				}, (reason) => {
					reject(reason)
				})
			})
		}

		createDialog(p0: string | ShowDialogParam): Promise<DialogModel> {
			let p: ShowDialogParam
			if (typeof (p0) == "string") {
				p = new ShowDialogParam(p0)
			} else {
				p = p0
			}

			return new Promise((resolve, reject) => {
				this.showLoading()
				let resUri = p.resUri
				respool.MyNodePool.load(resUri, (dialogNode, err) => {
					this.closeLoading()

					if (err) {
						reject(err);
					} else {
						let dialog = dialogNode.getComponent(this.getDialogClass("CCDialogComp")) as IDialogInnerCall
						if (dialog == null) {
							dialog = dialogNode.addComponent(this.getDialogClass("CCDialogComp")) as any as IDialogInnerCall
						}

						{
							const dialogModel = dialog.dialogModel
							dialogModel.comp = dialog as any as IDialogInnerCall
							dialogModel.node = dialogNode
							dialogModel.tagFilter = this.tagFilter
							dialogModel.layerOrderMG = this.layerOrderMG
							{
								if (p.tags != null) {
									dialogModel.tags = p.tags
								}
								dialogModel.uri = p.uri
								dialogModel.resUri = p.resUri
								dialogModel.data = p.data
							}

							// 记录到层列表
							this._layerList.push(dialogModel)

							dialog["onCreate"](dialogModel.data)
							dialogModel.state = DialogState.Inited

							resolve(dialogModel)
						}

					}
				});
			})
		}

		protected _findDialog(uri: string) {
			return this._layerList.find(d => d.uri == uri);
		}

		findDialog(uri: string) {
			return this._findDialog(uri);
		}

		getOrCreateDialog(p: ShowDialogParam): Promise<DialogModel> {
			return new Promise((resolve, reject) => {
				let dialogModel = this._findDialog(p.uri);
				if (dialogModel != null) {
					if ((!p.reuseData) || p.data !== undefined) {
						dialogModel.data = p.data
					}
					if (p.tags != null) {
						dialogModel.tags = p.tags
					}
					resolve(dialogModel)
				} else {
					this.createDialog(p).then((dialogModel) => {
						resolve(dialogModel)
					}, (reason) => {
						reject(reason)
					})
				}
			})
		}

		protected _loadingDelegate: Set<ILoadingHandler> = new Set()

		addLoadingDelegate(delegate: ILoadingHandler) {
			this._loadingDelegate.add(delegate)
		}
		removeLoadingDelegate(delegate: ILoadingHandler) {
			this._loadingDelegate.delete(delegate)
		}

		/**
		 * 展示加载界面
		 */
		public showLoading() {
			this._loadingDelegate.forEach((d) => {
				try {
					d.onShowLoading && d.onShowLoading();
				} catch (e) {
					console.error(e)
				}
			})
		}

		/**
		 * 关闭加载界面
		 */
		public closeLoading() {
			this._loadingDelegate.forEach((d) => {
				try {
					if (d.onHideLoading) {
						d.onHideLoading()
					} else {
						d.onCloseLoading && d.onCloseLoading();
					}
				} catch (e) {
					console.error(e)
				}
			})
		}

		public getDialogForLayer(layer: cc.Node): IDialogInnerCall | null {
			return layer.getComponent(this.getDialogClass("CCDialogComp")) as IDialogInnerCall
		}

		private refreshing: boolean = false;

		private refreshDialogState() {
			this.refreshing = true;

			let block = false
			let tInit: DialogModel[] = []
			let tPause: DialogModel[] = []
			let tResume: DialogModel[] = []
			for (let i = this.MGConfig.layerRoot.children.length - 1; i >= 0; i--) {
				let v = this.MGConfig.layerRoot.children[i]
				let dialogComp = this.getDialogForLayer(v)
				if (dialogComp) {
					let dialog = dialogComp.dialogModel
					if (dialog.state == DialogState.Inited) {
						tInit.push(dialog)
					}
					if (block) {
						if (dialog.state != DialogState.Shield) {
							tPause.push(dialog)
						}
					} else {
						if (dialog.state != DialogState.Exposed) {
							tResume.push(dialog)
						}

						if (dialog.isShowing) {
							block = dialog.isCover
						}
					}
				}
			}

			tInit.forEach(v => v.comp.onEnter())

			tPause.forEach(v => {
				v.state = DialogState.Shield
			})
			tResume.forEach(v => {
				v.state = DialogState.Exposed
			})
			tPause.forEach(v => {
				v.comp.onShield()
			})
			tResume.forEach(v => {
				v.comp.onExposed()
			})

			this.refreshing = false;
		}

		private postLayerChange(dialogNode: cc.Node) {
			this.refreshDialogState();
			this._layerList.forEach(layer => {
				const comp = layer.comp
				if (comp.onAnyFocusChanged) {
					let focus = dialogNode == comp.node
					comp.onAnyFocusChanged(focus);
				}
			})
		}

		/**
		 * 记录的layer列表
		 */
		protected _layerList: Array<DialogModel> = new Array()

		showDialog(p0: string | ShowDialogParam) {
			let p: ShowDialogParam
			if (typeof (p0) == "string") {
				p = new ShowDialogParam(p0)
			} else {
				p = p0
			}

			return new Promise<DialogModel>((resolve, reject) => {
				this.getOrCreateDialog(p).then((dialogModel) => {
					if (dialogModel.isOpen) {
						return
					}
					dialogModel.isOpen = true

					if (dialogModel.isShowing) {
						return
					}
					dialogModel.isShowing = true

					let layerComp = dialogModel.comp
					if (layerComp) {
						layerComp.__callOnOpening && layerComp.__callOnOpening()

						// 调整图层顺序
						{
							const node = dialogModel.node
							if (!node.active) {
								node.active = true
							}
							// 更新图层顺序
							{
								let parent = this.MGConfig.layerRoot
								let order = dialogModel.getOrder()
								let idx = -1
								for (let a of this._layerList) {
									let v = a.node
									if (v.active) {
										let vOrder = a.getOrder()
										if (vOrder <= order) {
											let vIdx = v.getSiblingIndex()
											if (vIdx > idx) {
												idx = vIdx
											}
										}
									}
								}

								if (node.parent == parent) {
									if (node.getSiblingIndex() <= idx) { idx = idx - 1 }
								} else {
									node.parent = parent
								}
								node.setSiblingIndex(idx + 1)
							}
						}

						layerComp.__callOnShow && layerComp.__callOnShow()
						if (p.instant) {
							this.postLayerChange(dialogModel.node)
							layerComp["__callOnOpened"] && layerComp["__callOnOpened"]()
							resolve(dialogModel)
						} else {
							layerComp.playOpenAnimation(() => {
								this.postLayerChange(dialogModel.node)
								layerComp["__callOnOpened"] && layerComp["__callOnOpened"]()
								resolve(dialogModel)
							})
						}
					} else {
						reject("no such component")
					}
				}).catch((reason) => {
					reject(reason)
				})
			})
		}

		hideDialog(uri: string | DialogModel) {
			return this.closeDialog(uri)
		}

		closeDialog(uri0: string | DialogModel | CloseDialogParam, instant: boolean = true): Promise<DialogModel> {
			let p: CloseDialogParam
			if (uri0 instanceof CloseDialogParam) {
				p = uri0
				p.instant = instant
			} else if (uri0 instanceof DialogModel) {
				p = new CloseDialogParam(p.uri, instant)
			} else {
				p = new CloseDialogParam(uri0, instant)
			}
			const uri = p.uri
			instant = p.instant

			return new Promise<DialogModel>((resolve, reject) => {
				let layerModel: DialogModel
				if (uri0 instanceof DialogModel) {
					layerModel = uri0
				} else {
					layerModel = this._findDialog(uri)
				}
				if (!layerModel) {
					console.warn("no layer", uri)
					return
				}
				if (!layerModel.isOpen) {
					return
				}
				layerModel.isOpen = false

				layerModel.isShowing = false
				if (!layerModel.node) {
					this.doClose(layerModel)
					resolve(layerModel)
				} else {
					// let layerComp = layerModel.node.getComponent(this.getDialogClass("CCDialogComp")) as IDialogInnerCall
					let layerComp = layerModel.comp
					if (layerComp) {
						layerComp["__callOnClosing"] && layerComp["__callOnClosing"]()
						layerComp["__callOnHide"] && layerComp["__callOnHide"]()
						if (instant) {
							this.doClose(layerModel, layerModel.destroyOnClose)
							layerComp["__callOnClosed"] && layerComp["__callOnClosed"]()
							resolve(layerModel)
						} else {
							layerComp.playCloseAnimation(() => {
								this.doClose(layerModel, layerModel.destroyOnClose)
								layerComp["__callOnClosed"] && layerComp["__callOnClosed"]()
								resolve(layerModel)
							})
						}
					} else {
						this.doClose(layerModel, true)
						resolve(layerModel)
					}
				}
			})
		}

		/**
		 * 关闭所有对话框
		 */
		closeAllDialogs() {
			this._layerList.concat().forEach(d => this.closeDialog(d));
		}

		destoryDialog(uri: string | DialogModel) {
			let layerModel: DialogModel
			if (uri instanceof DialogModel) {
				layerModel = uri
			} else {
				layerModel = this._findDialog(uri)
			}
			if (!layerModel) {
				console.warn("no layer", uri)
				return
			}

			layerModel.destroyOnClose = true
			return this.closeDialog(uri)
		}

		private doClose(v: DialogModel, destroy: boolean = false) {
			this.postLayerChange(v.node)
			if (v.node && v.node.isValid) {
				let root = v.node
				root.active = false
				if (destroy) {
					v.comp.__callOnBeforeDestory()
					root.destroy()
					this._layerList.remove(v)
				}
			} else {
				v.isCancelShowing = true;
			}
		}

	}

	export const LayerMG = new TLayerMG()
}
