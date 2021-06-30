
namespace gcc.transform {
	import math = fsync.math

	const Vec3 = cc.Vec3
	type Vec3 = cc.Vec3

	const Vec4 = cc.Vec4
	type Vec4 = cc.Vec4

	const Quat = cc.Quat
	type Quat = cc.Quat

	/**
	 * 需要改进，所有对cocos的依赖提前计算分离
	 */
	export class TransformTool {

		init() {
			return this
		}

		convVectorToPos3(pt: fsync.Vector3): Vec3 {
			let pos = new Vec3()
			pos.x = pt.x
			pos.y = pt.y
			pos.z = pt.z
			return pos
		}
		convPos3ToVector(pt: Vec3, pout?: fsync.Vector3): fsync.Vector3 {
			if (pout == null) {
				pout = new fsync.Vector3()
			}
			pout.x = pt.x
			pout.y = pt.y
			pout.z = pt.z
			return pout
		}
		convPos4ToVector(pt: Vec4): fsync.Vector4 {
			let pos = new fsync.Vector4()
			pos.x = pt.x
			pos.y = pt.y
			pos.z = pt.z
			pos.w = pt.w
			return pos
		}
		convQuatToVector(pt: Quat): fsync.Vector4 {
			let pos = new fsync.Vector4()
			pos.x = pt.x
			pos.y = pt.y
			pos.z = pt.z
			pos.w = pt.w
			return pos
		}

		convertToWorldSpaceAR<T extends (cc.Vec2 | cc.Vec3)>(node: cc.Node, pos: T): T {
			let worldPos: T
			if (node["convertToWorldSpaceAR"]) {
				worldPos = node["convertToWorldSpaceAR"](pos)
			} else {
				let p: cc.Vec3 = pos as any
				if (pos instanceof cc.Vec2) {
					p = new cc.Vec3(pos.x, pos.y, 0)
				}
				worldPos = node.getComponent(cc.UITransform).convertToWorldSpaceAR(p)
			}
			return worldPos
		}

		getUITransform(node: cc.Node): cc.UITransform {
			if (node["convertToWorldSpaceAR"]) {
				return node as any
			} else {
				return node.getComponent(cc.UITransformComponent)
			}
		}

		setScale(node: cc.Node, scale: number) {
			if (typeof (node.scale) == "number") {
				node.scale = scale
				//@ts-expect-error
			} else if (node.scale instanceof cc.Vec3) {
				//@ts-expect-error
				node.scale = new cc.Vec3(scale, scale, scale)
			}
		}

		getWinSize(): cc.Size {
			return cc["winSize"]
		}

	}

	export const transformTool = new TransformTool().init()
}
