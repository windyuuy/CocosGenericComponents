
namespace gcc.uit {
	const { ccclass, property } = cc._decorator;

	// @ccclass("CCGamepad")
	export class CCGameStick {
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
	}
}
