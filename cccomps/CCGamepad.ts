import { CCGameStick } from "./CCGameStick";

const { ccclass, property, menu } = cc._decorator;

@ccclass("CCGamepad")
@menu("gccuit/CCGamepad")
export default class CCGamepad extends cc.Component {
	protected delegate: gcc.uit.CCGamepad

	@property({ type: CCGameStick, displayName: "移动摇杆", })
	leftStick: CCGameStick = null

	@property({ type: CCGameStick, displayName: "攻击摇杆", })
	rightStick: CCGameStick = null

	@property({ type: [CCGameStick], displayName: "其他摇杆列表", })
	skillSticks: CCGameStick[] = []

	onLoad() {
		this.delegate = new gcc.uit.CCGamepad()
		this.delegate.loadFromJson(this as any)
		this.delegate.onLoad()
	}

	start() {
		this.delegate.start()
	}

	update() {
		this.delegate.update()
	}

	get gamepad() {
		return this.delegate.gamepad
	}

	/**
	 * 显示隐藏触摸板
	 */
	setPadVisible(b: boolean) {
		this.delegate.gamepad.inputEnabled = b
		if (this.node.active != b) {
			try {
				this.node.active = b
			} catch (e) {
				console.error(e)
			}
		}
	}
}
