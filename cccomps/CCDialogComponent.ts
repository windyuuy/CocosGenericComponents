
/**
 * 对话框基类
 */
@ccclass("CCDialogComp")
export class CCDialogComp extends cc.Component {

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
		return gcc.layer.LayerMG;
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
