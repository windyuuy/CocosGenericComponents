
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

	export type TOnProgress = (count: number, total: number) => void

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

		protected count: number = 0
		protected total: number = 0.1
		protected isProgressChanged: boolean = false
		protected onProgressList: ((count: number, total: number) => void)[] = []
		notifyOnPrgress(count: number, total: number) {
			this.isProgressChanged = true
			this.onProgressList.slice().forEach((call) => {
				call(count, total)
			})
		}
		onProgress(call: TOnProgress) {
			this.onProgressList.push(call)
			if (this.isLoaded || this.isProgressChanged) {
				call(this.count, this.total)
			}
		}
		offProgress(call: TOnProgress) {
			let index = this.onProgressList.indexOf(call)
			if (index >= 0) {
				this.onProgressList.splice(index, 1)
			}
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
