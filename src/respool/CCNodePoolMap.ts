/// <reference path="./ResPoolMap.ts" />

namespace gcc.respool {

	/**
	 * cocos节点池
	 */
	export class CCNodePoolMap extends ResPoolMap<cc.Node> {

		getOrCreateNodeWithPrefabUrl(prefabId: string, prefabUrl: string, call: (node: cc.Node, err: Error) => void) {
			let pool = this.getResPool(prefabId)
			if (pool.length > 0) {
				const node = pool.pop()
				node.emit("ecs:reuse")

				call(node, null)
			} else {
				cc.resources.load<cc.Prefab>(prefabUrl, (err, prefab: cc.Prefab) => {
					if (err) {
						call(null, err)
					}

					var node = this.getOrCreateNodeWithPrefab(prefabId, prefab)
					call(node, null)
				})
			}
		}

		getOrCreateNodeWithPrefab(prefabId: string, prefab: cc.Prefab) {
			let pool = this.getResPool(prefabId)
			if (pool.length > 0) {
				const node = pool.pop()
				node.emit("ecs:reuse")
				return node
			} else {
				if (prefab != null) {
					const node = ccNodePreloader.instantiate(prefab)
					node.emit("ecs:reuse")
					return node
				}
			}
			return null
		}

		getOrCreateNodeDynamicly(prefabId: string, prefabLoadListener: resloader.CCPrefabLoadLisenter, call: (node: cc.Node) => void) {
			let pool = this.getResPool(prefabId)
			if (pool.length > 0) {
				const node = pool.pop()
				node.emit("ecs:reuse")

				call(node)
			} else {
				prefabLoadListener.onLoad((prefab) => {
					let node = ccNodePreloader.instantiate(prefab)
					node.emit("ecs:reuse")

					call(node)
				})
			}
		}

		putNodeToCull(prefabId: string, node: cc.Node) {
			let pool = this.getResPool(prefabId)
			if (pool.indexOf(node) < 0) {
				node.position = new cc.Vec3(100000, 0, 0)
				let animComps = node.getComponentsInChildren(cc.Animation)
				animComps.forEach((comp) => {
					comp.stop()
				})
				pool.push(node)
			}
		}

		putNodeToRemove(prefabId: string, node: cc.Node) {
			let pool = this.getResPool(prefabId)
			if (pool.indexOf(node) < 0) {
				// node.position = new cc.Vec3(100000, 0, 0)
				node.parent = null
				let animComps = node.getComponentsInChildren(cc.Animation)
				animComps.forEach((comp) => {
					comp.stop()
				})
				pool.push(node)
			}
		}

		clear() {
			for (let key in this.resPoolMap) {
				let pool = this.resPoolMap[key]
				for (let node of pool) {
					ccNodePreloader.put(node)
				}
			}

			super.clear()
		}
	}
}
