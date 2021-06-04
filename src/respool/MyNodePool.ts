
namespace gcc.respool {

	export class MyNodePool {
		private static nodePoolMap: gcc.respool.CCEasyNodePoolMap = new gcc.respool.CCEasyNodePoolMap()

		static registerPrefabUrl(prefabId: string, prefabUrl: string) {
			this.nodePoolMap.registerPrefabUrl(prefabId, prefabUrl)
		}

		static put(node: cc.Node) {
			this.nodePoolMap.putNode(node)
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
						this.nodePoolMap.registerPrefabUrl(prefabId, prefabId)
					}
					call(node, err)
					return;
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

	}
}
