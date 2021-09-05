/*
 * @Author: your name
 * @Date: 2021-08-27 08:26:19
 * @LastEditTime: 2021-09-03 17:46:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \CocosGenericComponents\src\layer\SceneBundle.ts
 */

namespace gcc.layer {

	export type TLayerBundleId = string
	export type LayerBundleInputItem = TLayerUri | LayerBundle | TLayerBundleId
	export type LayerBundleItem = TLayerUri | TLayerBundleId
	export type LayerBundleMap = { [key: string]: LayerBundleItem[] }

	export const DefaultBundleName = "default"

	/**
	 * 管理图层约束
	 */
	export class LayerBundle {
		uid: string = ""

		layerMG!: TLayerMG

		protected layerBundleMap: LayerBundleMap = EmptyTable()

		init(layerMG: TLayerMG = LayerMG) {
			this.layerMG = layerMG
			return this
		}

		/**
		 * 构建图层束
		 */
		setupOneBundle(name: string, items: LayerBundleInputItem[]) {
			this.layerBundleMap[name] = items.map(item => {
				if (typeof (item) == "string") {
					return item
				} else {
					return item.uid
				}
			})
		}

		/**
		 * 构建图层束
		 */
		setupBundles(map: TStrMap<LayerBundleInputItem[]>) {
			for (let name in map) {
				this.setupOneBundle(name, map[name])
			}
		}

		/**
		 * 获取bundle列表
		 * @param bundleName 
		 * @returns 
		 */
		getBundle(bundleName: string = DefaultBundleName) {
			let bundle = this.layerBundleMap[bundleName]
			if (bundle == undefined) {
				bundle = this.layerBundleMap[bundleName] = []
			}
			return bundle
		}


		addBundleItem(item: LayerBundleInputItem, bundleName: string = DefaultBundleName) {
			let bundle = this.getBundle(bundleName)
			if (typeof (item) == "string") {
				bundle.push(item)
			} else {
				bundle.push(item.uid)
			}
		}

		removeBundleItem(item: LayerBundleInputItem, bundleName: string = DefaultBundleName) {
			let bundle = this.getBundle(bundleName)
			if (typeof (item) == "string") {
				bundle.remove(item)
			} else {
				bundle.remove(item.uid)
			}
		}

		/**
		 * 展开层束
		 */
		foreachLayerBundleItems(name: TLayerBundleId | TLayerUri, call: (item: TLayerUri) => void) {
			let bundle = this.layerBundleMap[name]
			if (bundle && bundle instanceof Array) {
				for (let subName of bundle) {
					this.foreachLayerBundleItems(subName, call)
				}
			} else {
				call(name)
			}
		}

		showBundle(name: string, layerMG: TLayerMG = this.layerMG) {
			this.foreachLayerBundleItems(name, (item) => {
				layerMG.showDialog(item)
			})
		}

		closeBundle(name: string, layerMG: TLayerMG = this.layerMG) {
			this.foreachLayerBundleItems(name, (item) => {
				layerMG.closeDialog(item)
			})
		}

		hideBundle(name: string, layerMG: TLayerMG = this.layerMG) {
			this.foreachLayerBundleItems(name, (item) => {
				layerMG.hideDialog(item)
			})
		}

		preloadBundle(name: string, layerMG: TLayerMG = this.layerMG) {
			let ls: Promise<DialogModel>[] = []
			this.foreachLayerBundleItems(name, (item) => {
				ls.push(layerMG.preloadDialog(item))
			})
			return Promise.all(ls)
		}

		createBundleItems(name: string, layerMG: TLayerMG = this.layerMG) {
			this.foreachLayerBundleItems(name, (item) => {
				layerMG.createDialog(item)
			})
		}

		recordBundleName?: string
		setRecordBundle(name: string) {
			this.recordBundleName = name
		}
		getRecordBundle() {
			if (this.recordBundleName) {
				return this.getBundle(this.recordBundleName)
			}
			return undefined
		}
		addRecordItem(item: LayerBundleInputItem) {
			if (this.recordBundleName) {
				this.addBundleItem(item, this.recordBundleName)
			}
		}
		closeRecordBundle() {
			if (this.recordBundleName) {
				this.closeBundle(this.recordBundleName)
			}
		}

	}
}
