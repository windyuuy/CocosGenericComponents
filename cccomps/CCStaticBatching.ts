// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import * as cc from "cc"
const { ccclass, property } = cc._decorator;

/**
 * 支持静态合批
 */
@ccclass('CCStaticBatching')
export class CCStaticBatching extends cc.Component {

    onLoad() {

        let batchingRoot = new cc.Node()
        batchingRoot.parent = this.node.parent
        cc.BatchingUtility.batchStaticModel(this.node, batchingRoot);
    }
}
