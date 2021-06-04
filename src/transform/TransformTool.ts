
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

		// 缓动跟随旋转
		swiftlyFollowRotateStep(entityManager: fsync.EntityManager, entity: fsync.Entity, targetRotation: fsync.Vector4, swiftParams: fsync.math.BezierParams2, dt: number) {
			let rotate = entityManager.getComponent(entity, fsync.Rotation)
			if (false) {
				// fsync.Vector.merge(rotate.value, heroRotate)
			} else {
				const cameraRotate = rotate.value.clone()
				let heroRotateEuler = new fsync.Vector3()
				fsync.Vector.transQuaternionToEuler(heroRotateEuler, targetRotation)
				let cameraRotateEuler = new fsync.Vector3()
				fsync.Vector.transQuaternionToEuler(cameraRotateEuler, cameraRotate)
				let dthEuler = heroRotateEuler.clone()
				fsync.Vector.subDown(dthEuler, cameraRotateEuler)

				// let dthEulerStep = new fsync.Vector3()
				let newCameraRotate = cameraRotateEuler.clone()

				for (let i = 0; i < dthEuler.getBinData().length; i++) {
					let dthEulerN = dthEuler.getBinData()[i]
					dthEulerN = math.calcMinAngle(dthEulerN)
					let dthEulerStepN = math.bezier2(swiftParams.C1, swiftParams.C2, swiftParams.C3, Math.abs(dthEulerN) / 180)
					dthEulerStepN = dthEulerStepN * swiftParams.speed * dt / 1000
					dthEulerStepN = Math.abs(math.minByAbs(dthEulerStepN, dthEulerN)) * math.getSign(dthEulerN)
					let newCameraRotateN = newCameraRotate.getBinData()[i]
					newCameraRotateN += dthEulerStepN
					newCameraRotateN = math.calcMinAngle(newCameraRotateN)
					newCameraRotate.getBinData()[i] = newCameraRotateN
				}

				fsync.Vector.transEulerToQuaternion(rotate.value, newCameraRotate)
			}
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
