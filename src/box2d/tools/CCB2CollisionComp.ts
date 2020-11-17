// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

namespace gcc.box2d.tools {
	const { ccclass, property, menu } = cc._decorator;

	@ccclass
	export class CCB2CollisionComp extends cc.Component {
		toJson(): { oid: string, groupIndex: string, categoryBits: string, maskBits: string, } {
			return null
		}
	}
}
