
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

		stick: kitten.gamepad.CircleStick = null
		syncViewData(stick: kitten.gamepad.CircleStick) {
			this.stick = stick

			let stickView = this

			// 设置触摸范围
			{
				let vec = transform.transformTool.convPos3ToVector(stickView.stickRange.convertToWorldSpaceAR(new cc.Vec3()))
				let rect = new fsync.Rect()
				rect.width = stickView.stickRange.width
				rect.height = stickView.stickRange.height
				rect.x = vec.x - rect.width / 2
				rect.y = vec.y - rect.height / 2
				stick.setTouchRange(rect)
			}
			// 设置触摸中心点
			{
				let vec = transform.transformTool.convPos3ToVector(stickView.stickCenter.convertToWorldSpaceAR(new cc.Vec3()))
				stick.setStartPosOrigin(vec)
				let r = (stickView.stickCenter.width + stickView.stickCenter.height) / 2
				stick.setCircleRadius(r / 2)
				stick.resetTouchPoint()
			}
		}

		updateView() {
			let stick = this.stick
			if (stick == null) {
				return
			}

			let stickView = this
			if (stickView.stickCenter) {
				// 更新摇杆中心点视图位置
				let ctrlCenter = stick.getCtrlCenterPos()
				let pos = stickView.stickCenter.parent.convertToNodeSpaceAR(transform.transformTool.convVectorToPos3(ctrlCenter))
				stickView.stickCenter.position = pos
			}
			if (stickView.stickTouchPoint) {
				// 更新摇杆触摸点视图位置
				let ctrlCenter = stick.getCtrlCenterPos()
				let touchPoint = stick.ctrlStatus.touchPoint

				let offset = fsync.Vector.subDown(touchPoint.clone(), ctrlCenter)
				if (fsync.Vector.len(offset) > stick.getCircleRadius()) {
					fsync.Vector.multUpVar(fsync.Vector.normalizeSelf(offset), stick.getCircleRadius())
					let pos = fsync.Vector.addUp(offset, ctrlCenter)
					let ccpos = stickView.stickTouchPoint.parent.convertToNodeSpaceAR(transform.transformTool.convVectorToPos3(pos))
					stickView.stickTouchPoint.position = ccpos
				} else {
					let ccpos = stickView.stickTouchPoint.parent.convertToNodeSpaceAR(transform.transformTool.convVectorToPos3(touchPoint))
					stickView.stickTouchPoint.position = ccpos
				}
			}

			// 其他更新
			if (stickView.stickTouchPoint) {
				if (stick.ctrlStatus.pressed) {
					stickView.stickTouchPoint.scale = 1.22
				} else {
					stickView.stickTouchPoint.scale = 1
				}
			}
		}
	}
}
