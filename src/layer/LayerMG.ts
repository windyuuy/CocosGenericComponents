
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
			record.tagsSet.clear();
			for (let tag of tags) {
				record.tagsSet.add(tag)
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
			this._tags = value
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

		public constructor(url?: string, data?: object, tags?: string[]) {
			this.uri = url
			this.data = data
			this.tags = tags
			this.isCancelShowing = false;
			this.isShow = true
		}
	}

	export class ShowDialogParam {
		protected _url?: string;
		protected _data?: object;
		protected _order?: number;

		constructor(url: string, data?: object) {
			this.uri = url
			this.data = data
		}

		public get uri(): string {
			return this._url ?? "";
		}
		public set uri(v: string) {
			this._url = "Prefabs/UI/" + v
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

	/**
	 * 对话框基类
	 */
	@ccclass("DialogComponent")
	export class Dialog extends cc.Component {

		dialogModel: DialogModel = new DialogModel()
		get rawData() {
			return this.dialogModel.data
		}

		@property({
			displayName: "遮罩",
			tooltip: "可空, 使用默认值",
		})
		modelLayer: cc.Node = null

		/**
		 * 初次创建调用
		 */
		protected onCreate(data?: Object) {
			this.onInit(data)
		}

		protected onInit(data?: Object) {

		}

		/**
		 * 获取当前默认的layer管理器
		 */
		protected get layerMG() {
			return LayerMG;
		}

		/**
		 * 播放关闭动画
		 */
		playCloseAnimation(finished: () => void) {
			setTimeout(finished);
		}

		/**
		 * 图层暴露
		 */
		protected onExposed() {

		}

		/**
		 * 图层被遮挡屏蔽
		 */
		protected onShield() {

		}

		/**
		 * 显示对话框
		 */
		show() {
			this.layerMG.showDialog(new ShowDialogParam(this.dialogModel.uri))
		}
		/**
		 * 每次由隐藏变为显示调用
		 */
		protected onShow() {

		}

		/**
		 * 隐藏对话框
		 */
		hide() {

		}
		/**
		 * 每次由显示变为隐藏调用
		 */
		protected onHide() {

		}

		/**
		 * 关闭对话框
		 */
		close() {

		}
		/**
		 * 关闭调用
		 */
		protected onClose() {

		}

		/**
		 * 顶级图层改变时调用
		 */
		protected onCoverChanged?()

		/**
		 * 焦点改变时调用
		 */
		protected onFocusChanged?()

	}

	@ccclass('LayerMGComp')
	export class LayerMGComp extends cc.Component {
		@property(cc.Node)
		public layerRoot: cc.Node = null!
		@property(cc.Prefab)
		public modalPrefab: cc.Prefab = null!
		@property(cc.Prefab)
		public toastPrefab: cc.Prefab = null!
		@property(UILoading)
		public loadingView: UILoading = null!
		@property(cc.Camera)
		public uiCamera: cc.Camera = null!

		public toastPrefabUrl: string = "gcc.layer:toast"

		public static inst: LayerMGComp

		public onLayerChange: (() => void)[] = []

		public onLoad() {
			LayerMGComp.inst = this;
			respool.MyNodePool.registerPrefab(this.toastPrefabUrl, this.toastPrefab)
			this.loadingView.node.active = false;
			cc.game.addPersistRootNode(this.node)
		}

	}

	export class TLayerMG {

		protected sharedLayerMGComp!: LayerMGComp

		/**
		 * 加载核心图层配置
		 * @returns 
		 */
		public loadMGConfig() {
			return respool.MyNodePool.loadAsync("Prefabs/UI/UICore").then((node) => {
				this.sharedLayerMGComp = node.getComponent(LayerMGComp)
			})
		}
		/**
		 * 获取核心图层配置
		 * @returns
		 */
		protected get MGConfig(): LayerMGComp {
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
						let dialog = dialogNode.getComponent(Dialog)
						if (dialog == null) {
							dialog = dialogNode.addComponent(Dialog);
						}

						{
							const dialogModel = dialog.dialogModel
							dialogModel.comp = dialog as any as IDialogInnerCall
							dialogModel.node = dialogNode

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

		public getDialogForLayer(layer: cc.Node): Dialog | null {
			return layer.getComponent(Dialog)
		}

		private refreshing: boolean = false;

		private refreshDialogState() {
			this.refreshing = true;

			let block = false
			let tInit = []
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

			tInit.forEach(v => v.onEnter())

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
				let layerComp = layerData.node.getComponent(Dialog)
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
