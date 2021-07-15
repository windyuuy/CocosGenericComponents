
namespace gcc.respool {

	export class MyNodePool {
		private static nodePoolMap: gcc.respool.CCEasyNodePoolMap = new gcc.respool.CCEasyNodePoolMap()

		static registerPrefabUrl(prefabId: string, prefabUrl: string, preload: boolean = true) {
			this.nodePoolMap.registerPrefabUrl(prefabId, prefabUrl, preload)
		}

		static put(node: cc.Node, retain: boolean = false) {
			this.nodePoolMap.putNode(node, retain)
		}

		static get(prefabId: string): cc.Node {
			return this.nodePoolMap.getNode(prefabId)
		}

		static load(prefabId: string, call: (node: cc.Node, err?: Error) => void) {
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

		static async loadAsync(prefabId: string) {
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

		static loadPrefab(prefabId: string, call: (prefab: cc.Prefab, err?: Error) => void) {
			this.nodePoolMap.loadPrefab(prefabId, (prefab, err) => {
				if (prefab != null) {
					call(prefab, err)
					return
				}

				this.nodePoolMap.loadPrefab(prefabId, call)
			})
		}

		static loadPrefabAsync(prefabId: string) {
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
}
