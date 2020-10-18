
namespace gcc.prefab {
    const { ccclass, property, executeInEditMode } = cc._decorator;

    @ccclass('ChildrenLoader')
    @executeInEditMode
    export class ChildrenLoader extends cc.Component {

        @property({ type: [cc.Prefab] })
        childrenPrefabs: cc.Prefab[] = []

        private _showChildren: boolean = false;
        public get showChildren(): boolean {
            return this._showChildren;
        }

        @property({ type: cc.Boolean, tooltip: "是否展开预制体节点", displayName: "是否展开预制体节点", })
        public set showChildren(value: boolean) {
            this._showChildren = value;

            this.updateChildrenView()
        }

        protected updateChildrenView() {
            if (this._showChildren) {
                this.showProtectedChildren()
            } else {
                this.showPrivateChildren()
            }
        }
        protected showPrivateChildren() {
            this.cleanChildren()

            for (let prefab of this.childrenPrefabs) {
                let prefabName = prefab.data && prefab.data.name
                let uuid = prefab["_uuid"] || prefab["url"]
                let pnode2 = new cc.Node(`&${prefabName}_预制体节点_${uuid}`)
                pnode2.addComponent(RuntimeNewNode)

                let pnode = new cc.PrivateNode(`pnode_${prefabName}_${uuid}`)
                let node = cc.instantiate(prefab)

                node.parent = pnode
                pnode.parent = pnode2
                pnode2.parent = this.node
            }
        }

        protected showProtectedChildren() {
            this.cleanChildren()

            for (let prefab of this.childrenPrefabs) {
                let prefabName = prefab.data && prefab.data.name
                let pnode = new cc.Node(`&${prefabName}_此节点下所有内容修改后无法保存`)
                pnode.addComponent(RuntimeNewNode)
                let node = cc.instantiate(prefab)
                node.parent = pnode
                pnode.parent = this.node
            }
        }

        protected cleanChildren() {
            let rmList = this.node.children.filter((node) => node.getComponent(RuntimeNewNode) != null)
            rmList.forEach(node => {
                node.parent = null
                node.destroy()
            })
        }

        onLoad() {
            if (CC_EDITOR) {
                this.updateChildrenView()
            } else {
                this.cleanChildren()

                for (let prefab of this.childrenPrefabs) {
                    let node = cc.instantiate(prefab)
                    node.addComponent(RuntimeNewNode)
                    node.parent = this.node
                }
            }
        }

    }
}
