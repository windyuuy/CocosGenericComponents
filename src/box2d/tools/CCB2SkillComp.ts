// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

namespace gcc.box2d.tools {
	const { ccclass, property, menu } = cc._decorator;

	/**
	 * 技能组件基类
	 */
	@ccclass
	export class CCB2SkillComp extends cc.Component {
		toJson(): { oid: string, skillType: string, } {
			return {
				oid: this.uuid,
				skillType: "",
			}
		}

		getSelfUID() {
			return this.getCompUID(this)
		}

		getBodyNodeUID(node: cc.Node) {
			return nodeUIDTool.getBodyNodeUID(node)
			// return `uid^${node.parent.name}^${node.name}`
			// return node.uuid
		}

		getCompUID(comp: cc.Component) {
			return nodeUIDTool.getCompUID(comp)
			// return `uid^${comp.node.parent.name}^${comp.node.name}^${comp.name}`
			// return comp.uuid
		}

		getNodeUID(node: cc.Node) {
			return nodeUIDTool.getNodeUID(node)
			// return `uid^${node.name}`
			// return node.uuid
		}

	}
}
