
namespace gcc.layer {

	const { ccclass, property } = cc._decorator;

	export type TagTarget = Object

	/**
	 * 对象tag属性记录
	 */
	export class TagRecord {
		target: TagTarget
		tagsSet: Set<string> = new Set<string>()
	}

	/**
	 * tag管理类
	 */
	export class TagFilter {

		/**
		 * 记录项列表
		 */
		protected records: TagRecord[] = []

		protected getRecord(target: TagTarget) {
			let record = this.records.find(r => r.target == target);
			return record;
		}

		/**
		 * 更新对象的tag设置
		 * @param target 
		 * @param tags 
		 */
		updateTargetTags(target: TagTarget, tags: string[]) {
			let record = this.getRecord(target);
			if (record != null) {
				record.tagsSet.clear();
				for (let tag of tags) {
					record.tagsSet.add(tag)
				}
			}
		}

		/**
		 * 移除记录的对象
		 * @param target 
		 */
		removeTarget(target: TagTarget) {
			let record = this.getRecord(target);
			this.records.remove(record)
		}

		/**
		 * 通过tag筛选所有对象
		 * @param tags 
		 */
		filterTargetsByTags<T extends Object>(tags: string[]): TagTarget[] {
			let result = this.records.filter(r => {
				let matched = true
				for (let tag of tags) {
					if (!r.tagsSet.has(tag)) {
						matched = false
					}
				}
				return matched
			}).map(r => r.target)
			return result
		}
	}

	export interface ILoadingDelegate {
		onShowLoading?()
		onHideLoading?()
		onCloseLoading?()
	}

	/**
	 * 对话框的状态
	 */
	export enum DialogState {
		/**
		 * 待创建
		 */
		BeforeCreate,
		/**
		 * 已经初始化
		 */
		Inited,
		/**
		 * 是否屏蔽
		 */
		Shield,
		/**
		 * 是否显露
		 */
		Exposed,
		/**
		 * 已经销毁
		 */
		Destoryed,
	}

	/**
	 * 基于tag的图层顺序管理
	 */
	export class LayerOrderMG {
		/**
		 * 设置tag初始依赖顺序
		 */
		setupTagsDepends(tags: string[]) {

		}

		/**
		 * 设置tag依赖关系
		 * @param tag 
		 * @param dependTags 
		 */
		setTagDepends(tags: string[], dependTags: string[]) {

		}

	}

	/**
	 * 内部调用的对话框接口
	 */
	export interface IDialogInnerCall {
		onEnter(): void;
		playCloseAnimation(finished: () => void)
		onExposed();
		onShield();
		node: cc.Node;

		dialogModel: DialogModel
		readonly rawData: any

		modelLayer: cc.Node

		/**
		 * 初次创建调用
		 */
		onCreate(data?: Object)

		onInit(data?: Object)

		/**
		 * 获取当前默认的layer管理器
		 */
		readonly layerMG

		/**
		 * 显示对话框
		 */
		show()
		/**
		 * 每次由隐藏变为显示调用
		 */
		onShow()

		/**
		 * 隐藏对话框
		 */
		hide()
		/**
		 * 每次由显示变为隐藏调用
		 */
		onHide()

		/**
		 * 关闭对话框
		 */
		close()
		/**
		 * 关闭调用
		 */
		onClose()

		/**
		 * 顶级图层改变时调用
		 */
		onCoverChanged?()

		/**
		 * 焦点改变时调用
		 */
		onFocusChanged?(focus: boolean)

	}

	/**
	 * 对话框的模型
	 */
	export class DialogModel {

		public state: DialogState = DialogState.BeforeCreate
		/**
		 * 对话框的根节点
		 */
		public node?: cc.Node

		public comp!: IDialogInnerCall

		public destroyOnClose: boolean = false

		/**
		 * 分配的tag过滤器
		 */
		tagFilter: TagFilter

		protected _tags: string[] = []
		/**
		 * tag列表
		 */
		public get tags(): string[] {
			return this._tags
		}
		public set tags(value: string[]) {
			if (value != null) {
				value.copyTo(this._tags)
			} else {
				this._tags.clear()
			}
			this.tagFilter.updateTargetTags(this, value)
		}

		/**
		 * 获取层级
		 */
		getOrder(): number {
			return -1;
		}

		/**
		 * 图层url
		 */
		public uri: string
		/**
		 * 图层数据
		 */
		public data?: object
		/**
		 * 是否中断异步展示流程
		 */
		public isCancelShowing: boolean

		/**
		 * 显示当前对话框
		 */
		public isShow: boolean

		/**
		 * 是否封面
		 */
		public isCover: boolean = false

		public constructor(url?: string, data?: object) {
			this.uri = url
			this.data = data
			this.isCancelShowing = false;
			this.isShow = true
		}
	}

	export class ShowDialogParam {
		protected _url?: string;
		protected _data?: object;
		protected _order?: number;
		protected _tags: string[];
		public get tags(): string[] {
			return this._tags;
		}
		public set tags(value: string[]) {
			this._tags = value;
		}

		constructor(url: string, data?: object, tags?: string[]) {
			this.uri = url
			this.data = data
			this.tags = tags
		}

		public get uri(): string {
			return this._url ?? "";
		}
		public set uri(v: string) {
			this._url = "prefabs/ui/" + v
		}

		public get data(): object | undefined {
			return this._data;
		}

		public set data(v: object | undefined) {
			this._data = v;
		}

		public get order(): number {
			return this._order ?? 0;
		}

		public set order(v: number) {
			this._order = v;
		}
	}

	export interface IUILoading {

	}

	export interface ILayerMGComp {
		layerRoot: cc.Node
		modalPrefab: cc.Prefab
		toastPrefab: cc.Prefab
		loadingView: IUILoading
		uiCamera: cc.Camera
	}

	export class TLayerMG {
		protected dialogClassMap: { [key: string]: new () => cc.Component } = EmptyTable()
		registerDialogClass(key: string, cls: new () => cc.Component) {
			this.dialogClassMap[key] = cls
		}
		getDialogClass(key: string): new () => cc.Component {
			return this.dialogClassMap[key]
		}

		protected tagFilter: TagFilter = new TagFilter()

		protected sharedLayerMGComp!: ILayerMGComp

		/**
		 * 加载核心图层配置
		 * @returns 
		 */
		public loadMGConfig() {
			return respool.MyNodePool.loadAsync("prefabs/ui/UICore").then((node) => {
				this.sharedLayerMGComp = node.getComponent("LayerMGComp") as ILayerMGComp
				node.setParent(cc.director.getScene())
			})
		}
		/**
		 * 获取核心图层配置
		 * @returns
		 */
		get MGConfig(): ILayerMGComp {
			return this.sharedLayerMGComp
		}

		createDialog(p: ShowDialogParam): Promise<DialogModel> {
			return new Promise((resolve, reject) => {
				this.showLoading()
				let uri = p.uri
				respool.MyNodePool.load(uri, (dialogNode, err) => {
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
							dialogModel.tags = p.tags

							// 记录到层列表
							this._dialogList.push(dialogModel)

							dialog["onCreate"](dialogModel.data)
							dialogModel.state = DialogState.Inited

							resolve(dialogModel)
						}

					}
				});
			})
		}

		findDialog(uri: string) {
			return this._dialogList.find(d => d.uri == uri);
		}

		getOrCreateDialog(p: ShowDialogParam): Promise<DialogModel> {
			return new Promise((resolve, reject) => {
				let dialogModel = this.findDialog(p.uri);
				if (dialogModel != null) {
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

		protected _loadingDelegate: Set<ILoadingDelegate> = new Set()

		addLoadingDelegate(delegate: ILoadingDelegate) {
			this._loadingDelegate.add(delegate)
		}
		removeLoadingDelegate(delegate: ILoadingDelegate) {
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

						block = dialog.isCover
					}
				}
			}

			tInit.forEach(v => v.comp.onEnter())

			tPause.forEach(v => {
				v.comp.onShield()
				v.state = DialogState.Shield
			})
			tResume.forEach(v => {
				v.comp.onExposed()
				v.state = DialogState.Exposed
			})

			this.refreshing = false;
		}

		private postLayerChange(dialogNode: cc.Node) {
			this.refreshDialogState();
			this._dialogList.forEach(layer => {
				const comp = layer.comp
				if (comp.onFocusChanged) {
					let focus = dialogNode == comp.node
					comp.onFocusChanged(focus);
				}
			})
		}

		/**
		 * 记录的layer列表
		 */
		protected _dialogList: Array<DialogModel> = new Array()

		showDialog(p: ShowDialogParam) {
			return this.getOrCreateDialog(p).then((dialogModel) => {
				dialogModel.node.active = true
				if (dialogModel.node.parent == null) {
					dialogModel.node.parent = this.MGConfig.layerRoot
				}
				this.postLayerChange(dialogModel.node)
			})
		}

		closeDialog(uri: string, instant: boolean = true) {
			let layerData = this.findDialog(uri)
			if (!layerData) {
				console.warn("no layer", uri)
				return
			}

			if (!layerData.node) {
				this.doClose(layerData)
			} else {
				let layerComp = layerData.node.getComponent(this.getDialogClass("CCDialogComp")) as IDialogInnerCall
				if (layerComp) {
					layerComp["onClose"] && layerComp["onClose"]()
					if (instant) {
						this.doClose(layerData, layerData.destroyOnClose)
					} else {
						layerComp.playCloseAnimation(() => this.doClose(layerData, layerData.destroyOnClose))
					}
				} else {
					this.doClose(layerData)
				}
			}
		}

		private doClose(v: DialogModel, destroy: boolean = false) {
			if (v.node && v.node.isValid) {
				let root = v.node
				root.active = false
				if (destroy) {
					root.destroy()
					this._dialogList.remove(v)
				}
			} else {
				v.isCancelShowing = true;
			}
			this.postLayerChange(v.node)
		}

	}

	export const LayerMG = new TLayerMG()
}
