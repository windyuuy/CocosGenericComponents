
namespace gcc.resloader {
	export type LoadPrefabFunc = () => ResLoadNotifier<cc.Prefab>
	export type PrefabSource = string | ResLoadNotifier<cc.Prefab>

	export type CCPrefabLoadLisenter = IResLoadListener<cc.Prefab>

	export type CCLoaderFunc1<T> = (paths: string, type: typeof cc.Asset, onComplete: (error: Error, assets: T) => void) => void
	export type CCLoaderFunc2<T> = (paths: string, type: typeof cc.Asset, onProgress: (finish: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (error: Error, assets: T) => void) => void
	export type CCLoaderFunc<T> = CCLoaderFunc2<T>

	export type CCGettterFunc<T> = (paths: string, type: typeof cc.Asset) => (T | undefined)

	export class TCCRawResLoader implements IResAsyncLoader<cc.Prefab> {

		protected static getLoaderFunc(url: string): CCLoaderFunc<cc.Prefab> {
			if (/^\w+\:\/\/.+/.test(url)) {
				if (cc && cc.assetManager && cc.assetManager.loadRemote) {
					return cc.assetManager.loadRemote.bind(cc.assetManager)
				} else {
					return null
				}
			} else {
				if (cc && cc["resources"] && cc["resources"].load) {
					return cc["resources"].load.bind(cc["resources"]);
				} else if (cc && cc["loader"] && cc["loader"].loadRes) {
					return cc["loader"].loadRes.bind(cc["loader"])
				} else {
					return null
				}
			}
		}
		protected static getGetterFunc(): CCGettterFunc<cc.Prefab> {
			if (cc && cc["resources"] && cc["resources"].get) {
				return cc["resources"].get.bind(cc["resources"]);
			} else if (cc && cc["loader"] && cc["loader"].getRes) {
				return cc["loader"].getRes.bind(cc["loader"])
			} else {
				return null
			}
		}
		protected static loaderFunc0: CCLoaderFunc<cc.Prefab> = null;

		load(url: string, onDone: (err: Error, asset: cc.Prefab) => void, onProgress: (finish: number, total: number) => void) {
			let loaderFunc = TCCRawResLoader.loaderFunc0 || (TCCRawResLoader.loaderFunc0 = TCCRawResLoader.getLoaderFunc(url));

			if (loaderFunc != null) {
				loaderFunc(url, cc["Prefab"], onProgress, onDone)
			} else {
				throw new Error("loader not implemented")
			}
		}

		protected static getterFunc0: CCGettterFunc<cc.Prefab> = null;
		get(url: string, onDone: (err: Error, asset: cc.Prefab) => void) {
			let getterFunc = TCCRawResLoader.getterFunc0 || (TCCRawResLoader.getterFunc0 = TCCRawResLoader.getGetterFunc());

			if (getterFunc != null) {
				let asset = getterFunc(url, cc["Prefab"])
				if (asset == null) {
					onDone(new Error("no asset loaded"), undefined)
				} else {
					onDone(undefined, asset)
				}
			} else {
				throw new Error("loader not implemented")
			}
		}
	}
	export const ccRawResLoader = new TCCRawResLoader();

	/**
	 * 预制体动态加载工具
	 */
	export class TCCResLoader extends ResLoader<cc.Prefab> {
		protected rawResLoader: IResAsyncLoader<cc.Prefab> = ccRawResLoader

		loadPrefab(url: string): CCPrefabLoadLisenter {
			return this.loadRes(url, this.rawResLoader);
		}
		getPrefab(url: string): CCPrefabLoadLisenter {
			return this.getRes(url, this.rawResLoader)
		}

	}

	export const ccResLoader = new TCCResLoader()
}
