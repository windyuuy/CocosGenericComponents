
const { ccclass, property, menu } = cc._decorator;

@ccclass("CCGameStick")
@menu("gccuit/CCGameStick")
export class CCGameStick extends cc.Component {

	protected delegate: gcc.uit.CCGameStick

	/**
	 * 整体节点
	 */
	@property({ type: cc.Node, displayName: "整体节点" })
	viewNode: cc.Node = null

	/**
	 * 触摸区域
	 */
	@property({ type: cc.Node, displayName: "触控范围", })
	stickRange: cc.Node = null;

	/**
	 * 摇杆中心视图
	 */
	@property({ type: cc.Node, displayName: "滑动区域", tooltip: "控制摇杆触点的滑动区域", })
	stickCenter: cc.Node = null

	/**
	 * 摇杆触摸点视图
	 */
	@property({ type: cc.Node, displayName: "触点" })
	stickTouchPoint: cc.Node = null

	constructor(...args) {
		super(...args)
		this.delegate = new gcc.uit.CCGameStick()
		this.delegate.loadFromJson(this as any)
	}

	syncViewData(stick: kitten.gamepad.CircleStick) {
		this.delegate.syncViewData(stick)
	}

	updateView() {
		this.delegate.updateView()
	}
}
