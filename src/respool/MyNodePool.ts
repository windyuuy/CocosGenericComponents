
namespace gcc.respool {

	export class TMyNodePool<TNode = cc.Node, TPrefab = cc.Prefab> {
		protected nodePoolMap: gcc.respool.CCEasyNodePoolMap = new gcc.respool.CCEasyNodePoolMap()

		registerPrefabUrl(prefabId: string, prefabUrl: string, preload: boolean = true, call?: (prefab: TPrefab, err?: Error) => void) {
			this.nodePoolMap.registerPrefabUrl(prefabId, prefabUrl, preload, call as any)
		}

		registerPrefabUrlAsync(prefabId: string, prefabUrl: string) {
			return new Promise((resolve, reject) => {
				this.registerPrefabUrl(prefabId, prefabUrl, true, (prefab, err) => {
					if (err) {
						reject(err)
					} else {
						resolve(prefab)
					}
				})
			})
		}

		registerPrefab(prefabId: string, prefab: TPrefab) {
			this.nodePoolMap.registerPrefab(prefabId, prefab as any as cc.Prefab)
		}

		put(node: TNode, retain: boolean = false) {
			this.nodePoolMap.putNode(node as any as cc.Node, retain)
		}

		get(prefabId: string): TNode {
			return this.nodePoolMap.getNode(prefabId) as any as TNode
		}

		getPrefab(prefabId: string): TPrefab {
			return this.nodePoolMap.getPrefab(prefabId) as any as TPrefab
		}

		instantiate(sampleNode: TNode, saveKey0?: string): TNode {
			return this.nodePoolMap.instantiate(sampleNode as any as cc.Node, saveKey0) as any as TNode
		}

		load(prefabId: string, call: (node: TNode, err?: Error) => void): void {
			this.nodePoolMap.loadNode(prefabId, (node, err) => {
				if (node != null) {
					call(node as any as TNode, err)
					return
				}

				this.nodePoolMap.getOrCreateNodeWithPrefabUrl(prefabId, prefabId, (node, err) => {
					if (node != null) {
						this.nodePoolMap.registerPrefabUrl(prefabId, prefabId, true)
					}
					call(node as any as TNode, err)
					return;
				})
			})
		}

		async loadAsync(prefabId: string): Promise<TNode> {
			return new Promise((resolve, reject) => {
				this.load(prefabId, (node, err) => {
					if (err) {
						reject(err)
					} else {
						resolve(node)
					}
				})
			})
		}

		loadPrefab(prefabId: string, call: (prefab: TPrefab, err?: Error) => void) {
			this.nodePoolMap.loadPrefab(prefabId, (prefab, err) => {
				if (prefab != null) {
					call(prefab as any as TPrefab, err)
					return
				}

				this.nodePoolMap.loadPrefab(prefabId, call as any)
			})
		}

		loadPrefabAsync(prefabId: string) {
			return new Promise((resolve, reject) => {
				this.loadPrefab(prefabId, (prefab, err) => {
					if (err) {
						reject(err)
					} else {
						resolve(prefabId)
					}
				})
			})
		}

	}

	export const MyNodePool = new TMyNodePool();
}
