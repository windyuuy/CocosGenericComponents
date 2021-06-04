// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 适配坐标系 up(z) -> up(y)
 */
@ccclass('CCAdaptCoord')
export class CCAdaptCoord extends Component {

    onLoad() {
        let rotate = this.node.eulerAngles.clone()
        rotate.x += 90
        this.node.eulerAngles = rotate
    }
}
