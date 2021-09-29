
namespace gcc.layer {

	export interface IUILoading {

	}

	/**
	 * 触发loading事件处理器
	 */
	export interface ILoadingHandler {
		onShowLoading?(key?: string)
		onHideLoading?(key?: string)
		onCloseLoading?(key?: string)
	}

}
