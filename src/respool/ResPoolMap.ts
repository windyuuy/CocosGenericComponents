namespace gcc.respool {
	export class ResMap<T> {
		resMap: { [key: string]: T } = EmptyTable()
		getItem<F extends T = T>(key: string): F {
			return this.resMap[key] as F
		}

		setItem<F extends T = T>(key: string, item: F): void {
			this.resMap[key] = item
		}

		clear() {
			this.resMap = EmptyTable()
		}
	}

	/**
	 * 资源池
	 */
	export class ResPoolMap<T> {
		protected resPoolMap: { [key: string]: T[] } = EmptyTable()

		getResPool(key: string): T[] {
			let pool = this.resPoolMap[key]
			if (pool == null) {
				pool = []
				this.resPoolMap[key] = pool
			}
			return pool
		}

		clear() {
			this.resPoolMap = EmptyTable()
		}

		forEachAllRes(call: (node: T, key: string) => void) {
			for (let key in this.resPoolMap) {
				for (let node of this.resPoolMap[key]) {
					call(node, key)
				}
			}
		}

	}
}
