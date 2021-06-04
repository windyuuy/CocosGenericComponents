
namespace gcc.uit {
	const { ccclass, property } = cc._decorator;

	import transformTool = transform.transformTool

	// @ccclass("CCGamepad")
	export class CCGameStick {

		/**
		 * 整体节点
		 */
		@property({ type: cc.Node, displayName: "整体节点" })
		public get viewNode(): cc.Node {
			return this.data.viewNode;
		}
		public set viewNode(value: cc.Node) {
			this.data.viewNode = value;
		}

		/**
		 * 触摸区域
		 */
		@property({ type: cc.Node, displayName: "触控范围", })
		public get stickRange(): cc.Node {
			return this.data.stickRange;
		}
		public set stickRange(value: cc.Node) {
			this.data.stickRange = value;
		}

		/**
		 * 摇杆中心视图
		 */
		@property({ type: cc.Node, displayName: "滑动区域", tooltip: "控制摇杆触点的滑动区域", })
		public get stickCenter(): cc.Node {
			return this.data.stickCenter;
		}
		public set stickCenter(value: cc.Node) {
			this.data.stickCenter = value;
		}

		/**
		 * 摇杆触摸点视图
		 */
		@property({ type: cc.Node, displayName: "触点" })
		public get stickTouchPoint(): cc.Node {
			return this.data.stickTouchPoint;
		}
		public set stickTouchPoint(value: cc.Node) {
			this.data.stickTouchPoint = value;
		}

		protected data: CCGameStick
		loadFromJson(data: CCGameStick) {
			this.data = data
		}

		stick: kitten.gamepad.CircleStick = null
		syncViewData(stick: kitten.gamepad.CircleStick) {
			this.stick = stick

			let stickView = this

			// 设置触摸范围
			{
				let stickRangeTransform = transformTool.getUITransform(stickView.stickRange)
				let worldPos: cc.Vec3 = stickRangeTransform.convertToWorldSpaceAR(new cc.Vec3())
				let vec = transformTool.convPos3ToVector(worldPos)
				let rect = new fsync.BLRect()
				rect.width = stickRangeTransform.width
				rect.height = stickRangeTransform.height
				rect.x = vec.x - rect.width / 2
				rect.y = vec.y - rect.height / 2
				stick.setTouchRange(rect)
			}
			// 设置触摸中心点
			{
				let stickCenterTransform = transformTool.getUITransform(stickView.stickCenter)
				let vec = transformTool.convPos3ToVector(stickCenterTransform.convertToWorldSpaceAR(new cc.Vec3()))
				stick.setStartPosOrigin(vec)
				let r = (stickCenterTransform.width + stickCenterTransform.height) / 2
				stick.setCircleRadius(r / 2)
				stick.resetTouchPoint()
			}
		}

		updateMainView() {
			let stick = this.stick
			let stickView = this
			if (stickView.stickCenter) {
				// 更新摇杆中心点视图位置
				let ctrlCenter = stick.getCtrlCenterPos()
				let pos = transformTool.getUITransform(stickView.stickCenter.parent).convertToNodeSpaceAR(transform.transformTool.convVectorToPos3(ctrlCenter))
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
					let ccpos = transformTool.getUITransform(stickView.stickTouchPoint.parent).convertToNodeSpaceAR(transform.transformTool.convVectorToPos3(pos))
					stickView.stickTouchPoint.position = ccpos
				} else {
					let ccpos = transformTool.getUITransform(stickView.stickTouchPoint.parent).convertToNodeSpaceAR(transform.transformTool.convVectorToPos3(touchPoint))
					stickView.stickTouchPoint.position = ccpos
				}
			}
		}

		updateDetailView() {
			let stick = this.stick
			let stickView = this
			// 其他更新
			if (stickView.stickTouchPoint) {
				if (stick.ctrlStatus.pressed) {
					transformTool.setScale(stickView.stickTouchPoint, 1.22)
				} else {
					transformTool.setScale(stickView.stickTouchPoint, 1)
				}
			}
		}
		updateView() {
			let stick = this.stick
			if (stick == null) {
				return
			}

			this.updateMainView()
			this.updateDetailView()
		}

	}
}
