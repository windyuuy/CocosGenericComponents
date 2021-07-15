namespace gcc.respool {
	export interface IAsset {
		oid: number | string
	}

	export class AssetsManager {
		protected pool: { [key: string]: object } = EmptyTable()

		protected getSubPool(key: string) {
			let subPool = this.pool[key]
			if (subPool == null) {
				subPool = this.pool[key] = EmptyTable()
			}
			return subPool
		}

		put(key: string, asset: IAsset) {
			let subPool = this.getSubPool(key)
			subPool[asset.oid] = asset
		}

		putWithId(key: string, asset: any, oid: string = "null") {
			let subPool = this.getSubPool(key)
			subPool[oid] = asset
		}

		getGroupKeys(key: string): string[] {
			let subPool = this.getSubPool(key)
			let keys = Object.keys(subPool)
			return keys
		}

		getWithDefault<T>(key: string, oid: string, call: () => T): T {
			let subPool = this.getSubPool(key)
			let asset = subPool[oid]
			if (asset == undefined) {
				asset = call()
				subPool[oid] = asset
			}
			return asset
		}

		get<T>(key: string, id: string | number = "null"): T {
			let subPool = this.getSubPool(key)
			return subPool[id]
		}

		delete(key: string, id: string) {
			let subPool = this.getSubPool(key)
			delete subPool[id]
		}

		clearGroup(key: string) {
			delete this.pool[key]
		}
	}

	export const sharedAssetsManager = new AssetsManager()

}
