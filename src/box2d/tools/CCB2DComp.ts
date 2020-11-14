// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

namespace gcc.box2d.tools {
	const { ccclass, property, menu } = cc._decorator;

	export class CCB2DComp extends cc.Component {
		toJson(): { oid: string, skillType: string, } {
			return {
				oid: this.uuid,
				skillType: "",
			}
		}
	}
}
