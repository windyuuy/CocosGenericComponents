/// <reference path="./CCNodePoolMap.ts" />

namespace gcc.respool {

	/**
	 * cocos节点池
	 */
	export class CCEasyNodePoolMap extends CCNodePoolMap {
		protected prefabUrlMap: { [key: string]: string } = {}
		protected prefabMap: { [key: string]: cc.Prefab } = {}
		protected prefabLoaderMap: { [key: string]: resloader.CCPrefabLoadLisenter } = {}

		registerPrefabUrl(prefabId: string, prefabUrl: string) {
			this.prefabUrlMap[prefabId] = prefabUrl
			if (this.prefabMap[prefabId] == null) {
				cc.resources.load<cc.Prefab>(prefabId, (err, prefab: cc.Prefab) => {
					if (err != null) {
						return
					}

					if (this.prefabMap[prefabId] == null) {
						this.prefabMap[prefabId] = prefab
					}
				})
			}
		}

		registerPrefab(prefabId: string, prefab: cc.Prefab) {
			this.prefabMap[prefabId] = prefab
		}

		registerPrefabLoader(prefabId: string, prefabLoadListener: resloader.CCPrefabLoadLisenter) {
			this.prefabLoaderMap[prefabId] = prefabLoadListener
		}

		getNode(prefabId: string): cc.Node {
			let prefab = this.prefabMap[prefabId]
			let node = this.getOrCreateNodeWithPrefab(prefabId, prefab)
			return node
		}

		loadNode(prefabId: string, call: (node: cc.Node, err?: Error) => void) {
			let prefab = this.prefabMap[prefabId]
			if (prefab != null) {
				let node = this.getOrCreateNodeWithPrefab(prefabId, prefab)
				call(node)
				return
			}

			let prefabLoader = this.prefabLoaderMap[prefabId]
			if (prefabLoader != null) {
				this.getOrCreateNodeDynamicly(prefabId, prefabLoader, call)
				return
			}

			let prefabUrl = this.prefabUrlMap[prefabId]
			if (prefabUrl != null) {
				this.getOrCreateNodeWithPrefabUrl(prefabId, prefabUrl, call)
				return
			}

			call(null, new Error("no res found"))
		}

		putNode(node: cc.Node, remove: boolean = false) {
			let prefabId: string = node[CCNodeSaveKey]
			if (remove) {
				this.putNodeToRemove(prefabId, node)
			} else {
				this.putNodeToCull(prefabId, node)
			}
		}

	}
}
