
namespace gcc.uit {
    const { ccclass, property } = cc._decorator;

    const Vector = fsync.Vector

    // @ccclass("CCGamepad")
    export class CCGamepad {

        @property({ type: CCGameStick, displayName: "左侧摇杆", })
        public get leftStick(): CCGameStick {
            return this.data.leftStick;
        }
        public set leftStick(value: CCGameStick) {
            this.data.leftStick = value;
        }

        @property({ type: CCGameStick, displayName: "右侧摇杆", })
        public get rightStick(): CCGameStick {
            return this.data.rightStick;
        }
        public set rightStick(value: CCGameStick) {
            this.data.rightStick = value;
        }

        @property({ type: [CCGameStick], displayName: "其他摇杆列表", })
        get skillSticks(): CCGameStick[] {
            return this.data.skillSticks
        }

        @property({ type: Boolean, displayName: "是否显示调试视图", })
        public get toDrawDebugView(): boolean {
            return this.data.toDrawDebugView;
        }
        public set toDrawDebugView(value: boolean) {
            this.data.toDrawDebugView = value;
        }

        protected data: CCGamepad
        loadFromJson(data: CCGamepad) {
            this.data = data
        }

        gamepad: kitten.gamepad.NormalGamepad

        onLoad() {
            this.gamepad = new kitten.gamepad.NormalGamepad().init()

            if (this.leftStick) {
                this.leftStick.syncViewData(this.gamepad.leftStick)
            }
            if (this.rightStick) {
                this.rightStick.syncViewData(this.gamepad.rightStick)
            }
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

        protected getSkillStickViews() {
            let skillStickViews = []
            if (this.leftStick) {
                skillStickViews.push(this.leftStick)
            }
            if (this.rightStick) {
                skillStickViews.push(this.rightStick)
            }
            skillStickViews.push(...this.skillSticks)
            return skillStickViews
        }

        updateViewVisible() {
            let skillStickViews = this.getSkillStickViews()
            let sticks = this.gamepad.virutalCtrls
            skillStickViews.forEach((view, index) => {
                let stick = sticks[index]
                view.viewNode.active = stick.enable
            })
        }

        updateView() {
            this.updateViewVisible()

            let skillStickViews = this.getSkillStickViews()
            let sticks = this.gamepad.virutalCtrls
            skillStickViews.forEach((stickView, index) => {
                let stick = sticks[index]
                stickView.stick = stick
                stickView.updateView()
            })
        }

        update() {
            this.updateView()
        }

        setSkillEnabled(index: number, b: boolean) {
            this.gamepad.virutalCtrls[index].enable = b
        }

    }
}
