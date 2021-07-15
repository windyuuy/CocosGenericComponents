
namespace gcc.resloader {
	export type LoadPrefabFunc = () => ResLoadNotifier<cc.Prefab>
	export type PrefabSource = string | ResLoadNotifier<cc.Prefab>

	export type CCPrefabLoadLisenter = IResLoadListener<cc.Prefab>

	export type CCLoaderFunc<T> = (paths: string, type: typeof cc.Asset, onComplete: (error: Error, assets: T) => void) => void
	export type CCLoaderFunc2<T> = (paths: string, type: typeof cc.Asset, onProgress: (finish: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (error: Error, assets: T) => void) => void

	export class TCCRawResLoader implements IResAsyncLoader<cc.Prefab> {

		protected static getLoaderFunc(): CCLoaderFunc<cc.Prefab> {
			if (cc && cc["resources"] && cc["resources"].load) {
				return cc["resources"].load.bind(cc["resources"]);
			} else if (cc && cc["loader"] && cc["loader"].loadRes) {
				return cc["loader"].loadRes.bind(cc["loader"])
			} else {
				return null
			}
		}
		protected static loaderFunc0: CCLoaderFunc<cc.Prefab> = null;

		load(url: string, onDone: (err: Error, asset: cc.Prefab) => void) {
			let loaderFunc = TCCRawResLoader.loaderFunc0 || (TCCRawResLoader.loaderFunc0 = TCCRawResLoader.getLoaderFunc());

			if (loaderFunc != null) {
				loaderFunc(url, cc["Prefab"], onDone)
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

	}

	export const ccResLoader = new TCCResLoader()
}
