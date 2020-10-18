
namespace gcc.prefab {
    const { ccclass, property } = cc._decorator;

    @ccclass('SimpleNodeLoader')
    export class SimpleNodeLoader extends cc.Component {

        @property({ type: [cc.Prefab] })
        childrenPrefabs: cc.Prefab[] = []

        @property({ type: [cc.Prefab] })
        siblingPrefabs: cc.Prefab[] = []

        @property
        siblingOrder: number = -1

        onLoad() {
            const selfNode = this.node
            const selfParent = this.node.parent
            for (let prefab of this.childrenPrefabs) {
                let node = cc.instantiate(prefab)
                node.parent = selfNode
            }
            for (let prefab of this.siblingPrefabs) {
                let node = cc.instantiate(prefab)
                node.parent = selfParent

                if (this.siblingOrder >= 0) {
                    node.setSiblingIndex(this.siblingOrder)
                }

            }

        }

    }
}
