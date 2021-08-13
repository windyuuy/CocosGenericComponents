
namespace gcc.objpool {

	class ObjectPool<T>{
		protected pool: T[]
		protected creator: () => T
		constructor(creator: () => T) {
			this.pool = []
			this.creator = creator
		}

		obtain(): T {
			if (this.pool.length == 0) {
				return this.creator()
			} else {
				return this.pool.pop()!
			}
		}

		recycle(v: T) {
			if ((v as any)["__$tmp"]) {
				(v as any)["__$tmp"] = false;
			}
			// if (typeof ((v as any)["clear"]) == "function") {
			if ((v as any)["clear"]) {
				(v as any).clear();
			}
			this.pool.push(v)
		}

		using<F>(count: number, handle: (value: T[]) => F): F {
			const paras = listPool.obtain()
			for (var i = 0; i < count; i++) {
				paras.push(this.obtain())
			}
			var ret = handle(paras)
			paras.forEach(v => this.recycle(v))
			paras.clear()
			listPool.recycle(paras)
			return ret
		}

		with<F>(handle: (...value: T[]) => F): F {
			const paras = listPool.obtain()
			var count = handle.length
			for (var i = 0; i < count; i++) {
				paras.push(this.obtain())
			}
			var ret = handle.apply(this, paras)
			paras.forEach(v => this.recycle(v))
			// paras.clear()
			listPool.recycle(paras)
			return ret
		}

		private statisticMap: { [key: string]: number } = Object.create(null)
		private _record(key: string) {
			let n = this.statisticMap[key] ?? (this.statisticMap[key] = 0)
			this.statisticMap[key]++
		}

		protected releaseTimerId: any
		protected obtainOnceList: T[] = []

		protected enableRecord: boolean = false
		tempNow(): T {
			var ret = this.obtain();
			(ret as any)["__$tmp"] = true;
			this.obtainOnceList.push(ret);

			if (this.enableRecord) {
				(ret as any)["__$stack"] = new Error().stack!;
			}

			if (this.releaseTimerId == null) {
				this.releaseTimerId = setInterval(() => {
					for (let o of this.obtainOnceList) {
						if ((o as any)["__$tmp"]) {
							if (this.enableRecord) {
								this._record((ret as any)["__$stack"])
							}
							this.recycle(o)
						}
					}
					this.obtainOnceList.clear()
				}, 1)
			}
			return ret
		}
		recycleTemp(value: T) {
			this.obtainOnceList.remove(value)
			this.recycle(value)
		}
		stopRecycleTask() {
			if (this.releaseTimerId != null) {
				clearInterval(this.releaseTimerId)
				this.releaseTimerId = undefined
			}
		}
		markTemp(o: T) {
			if (false == (o as any)["__$tmp"]) {
				(o as any)["__$tmp"] = true;
				this.obtainOnceList.push(o);
			}
		}

	}

	export const listPool = new ObjectPool(() => new Array())
	export const vec2Pool = new ObjectPool(() => new cc.Vec2())
	export const vec3Pool = new ObjectPool(() => new cc.Vec3())
	export const vec4Pool = new ObjectPool(() => new cc.Vec4())
	export const quatPool = new ObjectPool(() => new cc.Quat())
	export const colorPool = new ObjectPool(() => new cc.Color())
	export const mat4Pool = new ObjectPool(() => new cc.Mat4())

	export function withVec3<T>(handle: (...value: cc.Vec3[]) => T) {
		return vec3Pool.with(handle)
	}

	export function withQuat<T>(handle: (...value: cc.Quat[]) => T) {
		return quatPool.with(handle)
	}

	export function withMat4<T>(handle: (...value: cc.Mat4[]) => T) {
		return mat4Pool.with(handle)
	}

	export function withList<T>(handle: (...value: Array<any>[]) => T) {
		return listPool.with(handle)
	}

}
