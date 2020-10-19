
namespace gcc.uit {
    const { ccclass, property } = cc._decorator;

    // @ccclass("CCGamepad")
    export class CCGamepad extends cc.Component {

        @property(cc.Node)
        leftStick: cc.Node = null;

        @property(cc.Node)
        rightStick: cc.Node = null;

        @property([cc.Node])
        skillSticks: cc.Node[] = [];

        gamepad: kitten.gamepad.NormalGamepad

        onLoad() {
            this.gamepad = new kitten.gamepad.NormalGamepad().init()
        }

        start() {
            let syncViewData = (stick: kitten.gamepad.CircleStick, node: cc.Node) => {
                let vec = gcc.transform.transformTool.convPos3ToVector(node.convertToWorldSpaceAR(new cc.Vec3()))
                stick.setPos(vec)
                let r = (node.width + node.height) / 2
                stick.setCircleRadius(r)
            }
            syncViewData(this.gamepad.leftStick, this.leftStick)
            syncViewData(this.gamepad.rightStick, this.rightStick)
            for (let node of this.skillSticks) {
                let stick = new kitten.gamepad.CircleStick().init(`skill_${node.getSiblingIndex()}`)
                syncViewData(stick, node)
                this.gamepad.virutalCtrls.push(stick)
            }
            this.gamepad.setupSimpleView()
        }

    }
}
