
namespace gcc.resloader {
	export interface IResAsyncLoader<T> {
		load(url: string, onDone: (err: Error, asset: T) => void, onProgress: (finish: number, total: number) => void)
		get(url: string, onDone: (err: Error, asset: T) => void)
	}

	/**
	 * 预制体动态加载工具
	 */
	export class ResLoader<T> {
		protected loadMap: { [key: string]: ResLoadNotifier<T> } = EmptyTable()
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

		onLoadResProgress(url: string, call: TOnProgress): TOnProgress {
			let notifier = this.getNotifier(url)
			notifier.onProgress(call)
			return call
		}

		offLoadResProgress(url: string, call: TOnProgress): void {
			let notifier = this.getNotifier(url)
			notifier.offProgress(call)
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
					loader.load(url, onLoaded, (finish, total) => {
						notifier.notifyOnPrgress(finish, total)
					});
				} else {
					throw new Error("loader not implemented")
				}
			}
			return notifier
		}

		getRes(url: string, loader: IResAsyncLoader<T>): IResLoadListener<T> | undefined {
			let existNotifier = this.existNotifier(url)
			let notifier = this.getNotifier(url)
			if (!existNotifier) {
				var onLoaded = (err, asset) => {
					let isLoaded = (err == null && asset != null)
					if (isLoaded) {
						notifier.notifyOnPrgress(1, 1)
						notifier.notifyOnLoad(asset)
					} else {
						// 加载失败
						console.error(`load res failed, url:${url}, err:`, err)
						notifier.notifyOnError(err)
					}
				}
				if (loader != null) {
					loader.get(url, onLoaded);
				} else {
					throw new Error("loader not implemented")
				}
			}
			return notifier
		}

	}
}
