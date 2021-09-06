/// <reference path="./CCNodePoolMap.ts" />

namespace gcc.respool {

	/**
	 * cocos节点池
	 */
	export class CCEasyNodePoolMap extends CCNodePoolMap {
		protected prefabUrlMap: { [key: string]: string } = EmptyTable()
		protected prefabMap: { [key: string]: cc.Prefab } = EmptyTable()
		protected prefabLoaderMap: { [key: string]: resloader.CCPrefabLoadLisenter } = EmptyTable()

		onLoadResProgress(prefabUrl: string, call: (count: number, total: number) => void) {
			return this.onLoadResProgressRaw(prefabUrl, call)
		}

		offLoadResProgress(prefabUrl: string, call: (count: number, total: number) => void) {
			return this.offLoadResProgressRaw(prefabUrl, call)
		}

		protected instSaveKeyAcc = 1
		protected savedKeys: { [key: string]: Node } = EmptyTable()
		instantiate(sampleNode: cc.Node, saveKey0?: string): cc.Node {
			let saveKey = sampleNode[CCNodeSaveKey]
			if (saveKey === undefined) {
				saveKey = saveKey0
			}
			if (saveKey === undefined) {
				saveKey = sampleNode[CCNodeSaveKey] = `#sample_node_${this.instSaveKeyAcc++}`
				let node = cc.instantiate(sampleNode)
				node[CCNodeSaveKey] = saveKey
			} else {
				let node = this.popByKey(saveKey)
				if (node === undefined) {
					node = cc.instantiate(sampleNode)
					node[CCNodeSaveKey] = saveKey
				}
				return node
			}
		}

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
			} else {
				if (call != null) {
					call(this.prefabMap[prefabId], null)
				}
			}
		}

		registerPrefabUrl(prefabId: string, prefabUrl: string, preload: boolean, call?: (prefab: cc.Prefab, err?: Error) => void) {
			this.prefabUrlMap[prefabId] = prefabUrl
			if (preload) {
				this.loadAndSavePrefab(prefabId, prefabUrl, call)
			} else {
				call && call(null, null)
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

		getPrefab(prefabId: string): cc.Prefab {
			let prefab = this.prefabMap[prefabId]
			if (prefab == null) {
				this.getPrefabRaw(prefabId, (prefab0, err) => {
					if (err == null) {
						prefab = prefab0
					}
				})
			}
			return prefab
		}

		getNode(prefabId: string): cc.Node {
			let prefab = this.prefabMap[prefabId]
			if (prefab == null) {
				this.getPrefabRaw(prefabId, (prefab0, err) => {
					if (err == null) {
						prefab = prefab0
					}
				})
			}
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
