
namespace gcc.resloader {
	export interface IResAsyncLoader<T> {
		load(url: string, onDone: (err: Error, asset: T) => void)
	}

	/**
	 * 预制体动态加载工具
	 */
	export class ResLoader<T> {
		protected loadMap: { [key: string]: ResLoadNotifier<T> } = {}
		getNotifier(uri: string) {
			let notifier = this.loadMap[uri]
			if (notifier == null) {
				notifier = new ResLoadNotifier<T>()
				this.loadMap[uri] = notifier
			}
			return notifier
		}
		existNotifier(uri: string): boolean {
			let notifier = this.loadMap[uri]
			return !!notifier
		}
		addNotifier(uri: string, notifier: ResLoadNotifier<T>): void {
			this.loadMap[uri] = notifier
		}

		loadRes(url: string, loader: IResAsyncLoader<T>): IResLoadListener<T> {
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
				if (loader != null) {
					loader.load(url, onLoaded);
				} else {
					throw new Error("loader not implemented")
				}
			}
			return notifier
		}

	}
}
