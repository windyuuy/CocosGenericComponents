/// <reference path="./CCNodePoolMap.ts" />

namespace gcc.respool {

	/**
	 * cocos节点池
	 */
	export class CCEasyNodePoolMap extends CCNodePoolMap {
		protected prefabUrlMap: { [key: string]: string } = {}
		protected prefabMap: { [key: string]: cc.Prefab } = {}
		protected prefabLoaderMap: { [key: string]: resloader.CCPrefabLoadLisenter } = {}

		protected loadAndSavePrefab(prefabId: string, prefabUrl: string, call?: (prefab: cc.Prefab, err?: Error) => void) {
			if (this.prefabMap[prefabId] == null) {
				this.loadPrefabRaw(prefabUrl, (prefab, err) => {
					if (err != null) {
						if (call != null) {
							call(prefab, err)
						}
						return
					}

					if (prefab != null) {
						if (this.prefabMap[prefabId] == null) {
							this.prefabMap[prefabId] = prefab
						}
					}
					if (call != null) {
						call(prefab, err)
					}
				})
			}
		}

		registerPrefabUrl(prefabId: string, prefabUrl: string, preload: boolean) {
			this.prefabUrlMap[prefabId] = prefabUrl
			if (preload) {
				this.loadAndSavePrefab(prefabId, prefabUrl)
			}
		}

		registerPrefab(prefabId: string, prefab: cc.Prefab) {
			this.prefabMap[prefabId] = prefab
		}

		registerPrefabLoader(prefabId: string, prefabLoadListener: resloader.CCPrefabLoadLisenter) {
			this.prefabLoaderMap[prefabId] = prefabLoadListener
		}

		loadPrefab(prefabId: string, call: (prefab: cc.Prefab, err?: Error) => void) {
			let prefab = this.prefabMap[prefabId]
			if (prefab != null) {
				call(prefab, null)
				return
			}

			let prefabLoader = this.prefabLoaderMap[prefabId]
			if (prefabLoader != null) {
				prefabLoader.onLoad((prefab) => {
					if (call != null) {
						call(prefab, null)
						call = null
					}
				})
				prefabLoader.onError((err) => {
					if (call != null) {
						call(null, err)
						call = null
					}
				})
				return
			}

			let prefabUrl = this.prefabUrlMap[prefabId]
			if (prefabUrl != null) {
				this.loadAndSavePrefab(prefabId, prefabUrl, call)
				return
			}

			call(null, new Error("invalid prefabId"))
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
				// this.getOrCreateNodeWithPrefabUrl(prefabId, prefabUrl, (node)=>{})
				this.loadAndSavePrefab(prefabId, prefabUrl, (prefab, err) => {
					if (err != null) {
						call(null, err)
						return
					}

					let node = this.getOrCreateNodeWithPrefab(prefabId, prefab)
					call(node)
					return
				})
				return
			}

			call(null, new Error("no res found"))
		}

		putNode(node: cc.Node, retain: boolean = false) {
			let prefabId: string = node[CCNodeSaveKey]
			if (retain) {
				this.putNodeToRemove(prefabId, node)
			} else {
				this.putNodeToCull(prefabId, node)
			}
		}

	}
}
