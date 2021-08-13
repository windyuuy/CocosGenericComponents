
namespace gcc.respool {

	export class TMyNodePool {
		protected nodePoolMap: gcc.respool.CCEasyNodePoolMap = new gcc.respool.CCEasyNodePoolMap()

		registerPrefabUrl(prefabId: string, prefabUrl: string, preload: boolean = true, call?: (prefab: cc.Prefab, err?: Error) => void) {
			this.nodePoolMap.registerPrefabUrl(prefabId, prefabUrl, preload, call)
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

		registerPrefab(prefabId: string, prefab: cc.Prefab) {
			this.nodePoolMap.registerPrefab(prefabId, prefab)
		}

		put(node: cc.Node, retain: boolean = false) {
			this.nodePoolMap.putNode(node, retain)
		}

		get(prefabId: string): cc.Node {
			return this.nodePoolMap.getNode(prefabId)
		}

		load(prefabId: string, call: (node: cc.Node, err?: Error) => void): void {
			this.nodePoolMap.loadNode(prefabId, (node, err) => {
				if (node != null) {
					call(node, err)
					return
				}

				this.nodePoolMap.getOrCreateNodeWithPrefabUrl(prefabId, prefabId, (node, err) => {
					if (node != null) {
						this.nodePoolMap.registerPrefabUrl(prefabId, prefabId, true)
					}
					call(node, err)
					return;
				})
			})
		}

		async loadAsync(prefabId: string): Promise<cc.Node> {
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

		loadPrefab(prefabId: string, call: (prefab: cc.Prefab, err?: Error) => void) {
			this.nodePoolMap.loadPrefab(prefabId, (prefab, err) => {
				if (prefab != null) {
					call(prefab, err)
					return
				}

				this.nodePoolMap.loadPrefab(prefabId, call)
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
