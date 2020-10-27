
namespace gcc.uit {
    const { ccclass, property } = cc._decorator;

    // @ccclass("CCGamepad")
    export class CCGamepad extends cc.Component {

        leftStick: CCGameStick

        rightStick: CCGameStick

        skillSticks: CCGameStick[]

        gamepad: kitten.gamepad.NormalGamepad

        @property
        toDrawDebugView: boolean = false

        onLoad() {
            this.gamepad = new kitten.gamepad.NormalGamepad().init()
        }

        start() {
            let syncViewData = (stick: kitten.gamepad.CircleStick, stickView: CCGameStick) => {
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
                    stick.setCircleRadius(r)
                }
            }
            syncViewData(this.gamepad.leftStick, this.leftStick)
            syncViewData(this.gamepad.rightStick, this.rightStick)
            for (let stickView of this.skillSticks) {
                let stick = new kitten.gamepad.CircleStick().init(`skill_${stickView.stickRange.getSiblingIndex()}`)
                syncViewData(stick, stickView)
                this.gamepad.virutalCtrls.push(stick)
            }
            if (this.toDrawDebugView) {
                this.gamepad.setupSimpleView()
            }

            this.updateView()
        }

        updateView() {
            let skillStickViews = this.skillSticks.concat([this.leftStick, this.rightStick])
            this.gamepad.virutalCtrls.forEach((stick, index) => {
                let stickView = skillStickViews[index]
                if (stickView.stickCenter) {
                    // 更新摇杆中心点视图位置
                    let ctrlCenter = stick.getCtrlCenterPos()
                    let pos = stickView.stickCenter.parent.convertToNodeSpaceAR(transform.transformTool.convVectorToPos3(ctrlCenter))
                    stickView.stickCenter.position = pos
                }
                if (stickView.stickTouchPoint) {
                    // 更新摇杆触摸点视图位置
                    let touchPoint = stick.ctrlStatus.touchPoint
                    let pos = stickView.stickCenter.parent.convertToNodeSpaceAR(transform.transformTool.convVectorToPos3(touchPoint))
                    stickView.stickTouchPoint.position = pos
                }
            })
        }

        protected update(dt: number) {
            this.updateView()
        }

    }
}
