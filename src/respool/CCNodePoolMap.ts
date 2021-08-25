/// <reference path="./ResPoolMap.ts" />

namespace gcc.respool {

	/**
	 * cocos节点池
	 */
	export class CCNodePoolMap extends ResPoolMap<cc.Node> {

		loadPrefabRaw(prefabUrl: string, call: (prefab: cc.Prefab, err?: Error) => void) {
			// cc.resources.load<cc.Prefab>(prefabUrl, (err, prefab: cc.Prefab) => {
			// 	call(prefab, err)
			// })
			var loader = resloader.ccResLoader.loadPrefab(prefabUrl)
			loader.onLoad((prefab) => {
				if (call != null) {
					call(prefab)
					call = null
				}
			})
			loader.onError((err) => {
				if (call != null) {
					call(null, err)
					call = null
				}
			})
		}

		getOrCreateNodeWithPrefabUrl(prefabId: string, prefabUrl: string, call: (node: cc.Node, err: Error) => void) {
			let pool = this.getResPool(prefabId)
			if (pool.length > 0) {
				const node = pool.pop()
				node.emit("ecs:reuse")

				call(node, null)
			} else {
				this.loadPrefabRaw(prefabUrl, (prefab: cc.Prefab, err?: Error) => {
					if (err != null) {
						call(null, err)
						return;
					}

					var node = this.getOrCreateNodeWithPrefab(prefabId, prefab)
					call(node, null)
					return;
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

		getOrCreateNodeDynamicly(prefabId: string, prefabLoadListener: resloader.CCPrefabLoadLisenter, call: (node: cc.Node, err?: Error) => void) {
			let pool = this.getResPool(prefabId)
			if (pool.length > 0) {
				const node = pool.pop()
				node.emit("ecs:reuse")

				call(node)
			} else {
				prefabLoadListener.onLoad((prefab) => {
					if (call != null) {
						let node = ccNodePreloader.instantiate(prefab)
						node.emit("ecs:reuse")

						call(node)
					}
				})
				prefabLoadListener.onError((err) => {
					if (call != null) {
						call(null, err)
						call = null
					}
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

		popByKey(key: string): cc.Node | undefined {
			return ccNodePreloader.popByKey(key)
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
