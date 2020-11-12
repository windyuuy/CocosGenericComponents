
namespace gcc.uit {
    const { ccclass, property } = cc._decorator;

    const Vector = fsync.Vector

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

            this.leftStick.syncViewData(this.gamepad.leftStick)
            this.rightStick.syncViewData(this.gamepad.rightStick)
            for (let stickView of this.skillSticks) {
                let stick = new kitten.gamepad.GameStick().init(`skill_${stickView.stickRange.parent.getSiblingIndex()}`, this.gamepad.sharedState)
                this.gamepad.virutalCtrls.push(stick)
                stickView.syncViewData(stick)
            }
            if (this.toDrawDebugView) {
                this.gamepad.setupSimpleView()
            }

            this.updateView()
        }

        start() {

        }

        updateViewVisible() {
            let skillStickViews = [this.leftStick, this.rightStick].concat(this.skillSticks)
            let sticks = this.gamepad.virutalCtrls
            skillStickViews.forEach((view, index) => {
                let stick = sticks[index]
                view.viewNode.active = stick.enable
            })
        }

        updateView() {
            this.updateViewVisible()

            let skillStickViews = [this.leftStick, this.rightStick].concat(this.skillSticks)
            this.gamepad.virutalCtrls.forEach((stick, index) => {
                let stickView = skillStickViews[index]
                stickView.stick = stick
                stickView.updateView()
            })
        }

        protected update(dt: number) {
            this.updateView()
        }

        setSkillEnabled(index: number, b: boolean) {
            this.gamepad.virutalCtrls[index].enable = b
        }

    }
}
