
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

	export type LoadPrefabFunc = () => ResLoadNotifier<cc.Prefab>
	export type PrefabSource = string | ResLoadNotifier<cc.Prefab>

	export type CCPrefabLoadLisenter = IResLoadListener<cc.Prefab>

	/**
	 * 预制体动态加载工具
	 */
	export class ResLoader {
		protected loadMap: { [key: string]: ResLoadNotifier<any> } = {}
		getNotifier(uri: string) {
			let notifier = this.loadMap[uri]
			if (notifier == null) {
				notifier = new ResLoadNotifier<cc.Prefab>()
				this.loadMap[uri] = notifier
			}
			return notifier
		}
		existNotifier(uri: string): boolean {
			let notifier = this.loadMap[uri]
			return !!notifier
		}
		addNotifier(uri: string, notifier: ResLoadNotifier<any>): void {
			this.loadMap[uri] = notifier
		}

		loadPrefab(url: string): CCPrefabLoadLisenter {
			let existNotifier = this.existNotifier(url)
			let notifier = this.getNotifier(url)
			if (!existNotifier) {
				var onLoaded = (err, asset) => {
					let isLoaded = (err == null && asset != null)
					if (isLoaded) {
						notifier.notifyOnLoad(asset)
					} else {
						// 加载失败
						console.error(`load res failed, url:${url}, err:`, err)
						notifier.notifyOnError(err)
					}
				}
				if (cc && cc["resources"] && cc["resources"].load) {
					cc && cc["resources"] && cc["resources"].load(url, cc["Prefab"], onLoaded)
				} else if (cc && cc["loader"] && cc["loader"].loadRes) {
					cc && cc["loader"] && cc["loader"].loadRes(url, cc["Prefab"], onLoaded)
				} else {
					throw new Error("ccloader not implemented")
				}
			}
			return notifier
		}

	}

	export const resLoader = new ResLoader()

}
