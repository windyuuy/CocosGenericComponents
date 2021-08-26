
/**
 * 目标：
 * - 支持失败的资源重新加载生效
 * - 对于异步加载成功的节点，支持坐标更改应用
 */

namespace gcc.resloader {
	export interface IResLoadListener<T> {
		onLoad(call: (res: T) => void)
		onError(call: (err: Error) => void)
	}

	/**
	 * 资源加载通知
	 */
	export class ResLoadNotifier<T> implements IResLoadListener<T>{
		isFinished: boolean = false
		isLoaded: boolean = false
		err?: Error
		res?: T
		protected onLoadList: ((res: T) => void)[] = []
		get isResReady() {
			return this.isFinished && this.isLoaded
		}
		getRes(): T | undefined {
			if (this.isResReady) {
				return this.res
			}
			return undefined
		}
		onLoad(call: (res: T) => void) {
			this.onLoadList.push(call)

			if (this.isFinished && this.isLoaded) {
				call(this.res!)
			}
		}
		notifyOnLoad(res: T) {
			this.isFinished = true
			this.isLoaded = true
			this.res = res
			delete this.err
			this.onLoadList.slice().forEach((call) => {
				call(res)
			})
		}

		protected onErrorList: ((err: Error) => void)[] = []
		onError(call: (err: Error) => void) {
			this.onErrorList.push(call)

			if (this.isFinished && (!this.isLoaded)) {
				call(this.err!)
			}
		}
		notifyOnError(err: Error) {
			this.isFinished = true
			this.isLoaded = false
			this.err = err
			this.onErrorList.slice().forEach((call) => {
				call(err)
			})
		}
	}

}
