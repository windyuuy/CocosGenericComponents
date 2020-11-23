
namespace gcc.uit {
	/**
	 * 鼠标滚轮数据
	 */
	export class ScrollData {
		curScroll: fsync.Vector3 = new fsync.Vector3()
		deltaScroll: fsync.Vector3 = new fsync.Vector3()

		update() {
			fsync.Vector.addUp(this.curScroll, this.deltaScroll)
			fsync.Vector.resetValues(this.deltaScroll)
		}
	}

	/**
	 * cocos触摸事件板
	 */
	export class CocosTouchPad {

		guesture: kitten.guesture.GuestureAnalyzer
		scrollData: ScrollData

		protected listenEvents: { [key: string]: Function }
		init() {
			this.guesture = new kitten.guesture.GuestureAnalyzer().init()
			this.scrollData = new ScrollData()
			this.listenEvents = fsync.EmptyTable()

			this.initEvents()

			return this
		}

		protected initEvents() {
			const touchedPointMap: { [key: string]: boolean } = {}

			this.listenEvents[cc.Node.EventType.TOUCH_START] = (event: cc.Event.EventTouch) => {
				// console.log("touchstart", event)
				let touches = event.getTouches()
				let vecs: fsync.Vector3[] = []
				touches.forEach((touch) => {
					let vec = this.getTouchEventPos(touch)
					vecs[touch.getID()] = vec
					touchedPointMap[touch.getID()] = true
				})
				this.testGuesture2(vecs)
				this.guesture.inputTouchPoints(true, vecs)
			}

			const onTouchOver = (event: cc.Event.EventTouch, key: string) => {
				// console.log("touchend", event)
				let touches = event.getTouches()
				let vecs: fsync.Vector3[] = []
				touches.forEach((touch) => {
					let vec = this.getTouchEventPos(touch)
					vecs[touch.getID()] = vec
					touchedPointMap[touch.getID()] = false
				})
				this.testGuesture2(vecs)
				this.guesture.inputTouchPoints(false, vecs)
			}
			const onTouchEnd = (event: cc.Event.EventTouch) => {
				onTouchOver(event, "TOUCH_END")
			}
			const onTouchCancel = (event: cc.Event.EventTouch) => {
				onTouchOver(event, "TOUCH_CANCEL")
			}
			this.listenEvents[cc.Node.EventType.TOUCH_CANCEL] = onTouchCancel
			this.listenEvents[cc.Node.EventType.TOUCH_END] = onTouchEnd
			this.listenEvents[cc.Node.EventType.TOUCH_MOVE] = (event: cc.Event.EventTouch) => {
				// console.log("touchmove", event)
				let touches = event.getTouches()
				let vecs: fsync.Vector3[] = []
				touches.forEach((touch) => {
					// 屏蔽掉没有经由touchstart发起的触摸点，避免缩放bug
					if (touchedPointMap[touch.getID()]) {
						let vec = this.getTouchEventPos(touch)
						vecs[touch.getID()] = vec
					}
				})
				this.testGuesture2(vecs)
				this.guesture.inputTouchPoints(true, vecs)
			}
			this.listenEvents[cc.Node.EventType.MOUSE_WHEEL] = (event: cc.Event.EventMouse) => {
				console.log("mouse wheel", event)
				this.scrollData.deltaScroll.x += event.getScrollX()
				this.scrollData.deltaScroll.y += event.getScrollY()
			}

		}

		/**
		 * 获取触摸事件坐标
		 * @param touch 
		 */
		protected getTouchEventPos(touch: cc.Touch): fsync.Vector3 {
			let designSize = cc.winSize
			let pt = touch.getLocation()
			let vec = new fsync.Vector3()
			// 转化屏幕中心点为坐标原点
			vec.x = pt.x - designSize.width / 2
			vec.y = pt.y - designSize.height / 2
			return vec
		}
		// 仅测试
		private testGuesture2(vecs: fsync.Vector3[]) {
			// vecs.push(new fsync.Vector3())
		}

		/**
		 * 接触侦听触摸事件
		 */
		unregisterTouchPad() {
			this.listenInfo.forEach(info => {
				let { node, useCapture } = info
				for (let key in this.listenEvents) {
					node.off(key, this.listenEvents[key], useCapture)
				}
			})
			this.listenInfo.length = 0
		}

		protected listenInfo: { node: cc.Node, useCapture: boolean }[] = []

		/**
		 * 注册触摸板事件
		 * @param touchPad
		 * @param useCapture 将触摸或鼠标事件注册在捕获阶段
		 */
		registerTouchPad(touchPad: cc.Node, useCapture: boolean = false) {
			// const touchedPointMap: { [key: string]: boolean } = {}

			// touchPad.on(cc.Node.EventType.TOUCH_START, (event: cc.Event.EventTouch) => {
			// 	// console.log("touchstart", event)
			// 	let touches = event.getTouches()
			// 	let vecs: fsync.Vector3[] = []
			// 	touches.forEach((touch) => {
			// 		let vec = this.getTouchEventPos(touch)
			// 		vecs[touch.getID()] = vec
			// 		touchedPointMap[touch.getID()] = true
			// 	})
			// 	this.testGuesture2(vecs)
			// 	this.guesture.inputTouchPoints(true, vecs)
			// }, this, useCapture)
			// const onTouchOver = (event: cc.Event.EventTouch, key: string) => {
			// 	// console.log("touchend", event)
			// 	let touches = event.getTouches()
			// 	let vecs: fsync.Vector3[] = []
			// 	touches.forEach((touch) => {
			// 		let vec = this.getTouchEventPos(touch)
			// 		vecs[touch.getID()] = vec
			// 		touchedPointMap[touch.getID()] = false
			// 	})
			// 	this.testGuesture2(vecs)
			// 	this.guesture.inputTouchPoints(false, vecs)
			// }
			// const onTouchEnd = (event: cc.Event.EventTouch) => {
			// 	onTouchOver(event, "TOUCH_END")
			// }
			// const onTouchCancel = (event: cc.Event.EventTouch) => {
			// 	onTouchOver(event, "TOUCH_CANCEL")
			// }
			// touchPad.on(cc.Node.EventType.TOUCH_CANCEL, onTouchCancel, this, useCapture)
			// touchPad.on(cc.Node.EventType.TOUCH_END, onTouchEnd, this, useCapture)
			// touchPad.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Event.EventTouch) => {
			// 	// console.log("touchmove", event)
			// 	let touches = event.getTouches()
			// 	let vecs: fsync.Vector3[] = []
			// 	touches.forEach((touch) => {
			// 		// 屏蔽掉没有经由touchstart发起的触摸点，避免缩放bug
			// 		if (touchedPointMap[touch.getID()]) {
			// 			let vec = this.getTouchEventPos(touch)
			// 			vecs[touch.getID()] = vec
			// 		}
			// 	})
			// 	this.testGuesture2(vecs)
			// 	this.guesture.inputTouchPoints(true, vecs)
			// }, this, useCapture)
			// touchPad.on(cc.Node.EventType.MOUSE_WHEEL, (event: cc.Event.EventMouse) => {
			// 	console.log("mouse wheel", event)
			// 	this.scrollData.deltaScroll.x += event.getScrollX()
			// 	this.scrollData.deltaScroll.y += event.getScrollY()
			// })

			for (let key in this.listenEvents) {
				touchPad.on(key, this.listenEvents[key], useCapture)
			}

			this.listenInfo.push({ node: touchPad, useCapture })
		}

	}
}
