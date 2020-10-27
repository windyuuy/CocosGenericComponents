
namespace gcc.uit {
	const { ccclass, property } = cc._decorator;

	// @ccclass("CCGamepad")
	export class CCGameStick {
		/**
		 * 触摸区域
		 */
		@property(cc.Node)
		stickRange: cc.Node = null;

		/**
		 * 摇杆中心视图
		 */
		@property(cc.Node)
		stickCenter: cc.Node = null

		/**
		 * 摇杆触摸点视图
		 */
		@property(cc.Node)
		stickTouchPoint: cc.Node = null
	}
}
