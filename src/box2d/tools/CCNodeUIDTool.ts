// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

namespace gcc.box2d.tools {
	export class CCNodeUIDTool {
		uuidConvMap: { [key: string]: number } = {}
		uuidAcc: number = 1
		reset() {
			this.uuidConvMap = {}
			this.uuidAcc = 1
		}
		getUIDNum(uid: string) {
			let num = this.uuidConvMap[uid]
			if (num == null) {
				num = this.uuidConvMap[uid] = this.uuidAcc++
			}
			return num
		}
		getBodyNodeUID(node: cc.Node) {
			let num = this.getUIDNum(node.uuid)
			return `uid%${node.parent.name}%${node.name}%${num}`
			// return node.uuid
		}

		getCompUID(comp: cc.Component) {
			let num = this.getUIDNum(comp.uuid)
			return `uid%${comp.node.parent.name}%${comp.node.name}%${comp.name}%${num}`
			// return comp.uuid
		}

		getNodeUID(node: cc.Node) {
			let num = this.getUIDNum(node.uuid)
			return `uid%${node.name}%${num}`
			// return node.uuid
		}
	}

	export const nodeUIDTool = new CCNodeUIDTool()
}
