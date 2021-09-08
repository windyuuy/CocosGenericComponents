
namespace gcc.layer {

	export type TLayerUri = string

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
	 * 内部调用的对话框接口
	 */
	export interface IDialogInnerCall {
		__callOnEnter(): void;
		__callDoClose(resolve: () => void, reject: (reason: any) => void)
		__callDoOpen(finished: () => void, reject: (reason: any) => void)
		__callOnExposed();
		__callOnShield();

		node: cc.Node;

		dialogModel: DialogModel
		readonly rawData: any

		/**
		 * 初次创建调用
		 */
		onCreate(data?: Object)

		onInit(data?: Object)

		/**
		 * 获取当前默认的layer管理器
		 */
		readonly layerMG

		__callOnOpening()
		__callOnOpened()

		/**
		 * 显示对话框
		 */
		show()
		/**
		 * 每次由隐藏变为显示调用
		 */
		__callOnShow()

		/**
		 * 隐藏对话框
		 */
		hide()
		/**
		 * 每次由显示变为隐藏调用
		 */
		__callOnHide()

		/**
		 * 关闭对话框
		 */
		close()
		/**
		 * 开始关闭调用
		 */
		__callOnClosing()

		/**
		 * 关闭调用
		 */
		__callOnClosed()

		/**
		 * 销毁前调用
		 */
		__callOnBeforeDestory()

		/**
		 * 顶级图层改变时调用
		 */
		__callOnCoverChanged?()

		/**
		 * 全局任意图层焦点改变时调用
		 */
		_callOnAnyFocusChanged?(focus: boolean)

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
		/**
		 * 图层管理
		 */
		layerOrderMG: LayerOrderMG

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
			// return -1;
			let order = this.layerOrderMG.getOrder(this.tags)
			return order
		}

		/**
		 * 模型ID
		 */
		public uri: string
		/**
		 * 资源uri
		 */
		public resUri: string
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
		public isShowing: boolean
		/**
		 * 对话框是否已经打开
		 */
		public isOpen: boolean

		/**
		 * 是否封面
		 */
		public isCover: boolean = false

		/**
		 * show图层的循序
		 * - 减少对资源异步加载顺序的依赖
		 */
		public showLayerOrder: number = -1

		public constructor(uri?: string, data?: object) {
			this.uri = uri
			this.data = data
			this.isCancelShowing = false;
			this.isShowing = false
			this.isOpen = false
		}
	}

}
