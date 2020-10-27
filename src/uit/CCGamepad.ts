
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
            let syncViewData = (stick: kitten.gamepad.CircleStick, node: cc.Node) => {
                let vec = gcc.transform.transformTool.convPos3ToVector(node.convertToWorldSpaceAR(new cc.Vec3()))
                stick.setStartPosOrigin(vec)
                let r = (node.width + node.height) / 2
                stick.setCircleRadius(r)
            }
            syncViewData(this.gamepad.leftStick, this.leftStick.stickRange)
            syncViewData(this.gamepad.rightStick, this.rightStick.stickRange)
            for (let node of this.skillSticks) {
                let stick = new kitten.gamepad.CircleStick().init(`skill_${node.stickRange.getSiblingIndex()}`)
                syncViewData(stick, node.stickRange)
                this.gamepad.virutalCtrls.push(stick)
            }
            if (this.toDrawDebugView) {
                this.gamepad.setupSimpleView()
            }

            this.udpate()
        }

        udpate() {
            let skillStickViews = this.skillSticks.concat([this.leftStick, this.rightStick])
            this.gamepad.virutalCtrls.forEach((stick, index) => {
                let stickView = skillStickViews[index]
                if (stickView.stickCenter) {
                    // 更新摇杆中心点视图位置
                    let ctrlCenter = stick.getCtrlCenterPos()
                    stickView.stickCenter.position.set(new cc.Vec3(ctrlCenter.x, ctrlCenter.y, 0))
                }
                if (stickView.stickTouchPoint) {
                    // 更新摇杆触摸点视图位置
                    let touchPoint = stick.ctrlStatus.touchPoint
                    stickView.stickTouchPoint.position.set(new cc.Vec3(touchPoint.x, touchPoint.y, 0))
                }
            })
        }

    }
}
