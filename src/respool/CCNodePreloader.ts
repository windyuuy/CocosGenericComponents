/// <reference path="./ResPoolMap.ts" />

namespace gcc.respool {

	const CCMYURL = "myurl"
	export const CCNodeSaveKey = "mynodename"

	/**
	 * cocos节点预加载工具
	 */
	export class CCNodePreloader extends ResPoolMap<cc.Node>{
		protected _preloadTaskMap: { [key: string]: number }

		protected _preShowTask: {
			parent: cc.Node
			duration: number
		}

		init() {
			this._preloadTaskMap = EmptyTable()
			return this
		}

		static getNodeKey(node: cc.Node): string {
			return node[CCNodeSaveKey]
		}

		static isRecyclableNode(node: cc.Node): boolean {
			return !!node[CCNodeSaveKey]
		}

		addPrefabLoadTask(url: string, count: number = 0) {
			this._preloadTaskMap[url] = this._preloadTaskMap[url] || 0
			this._preloadTaskMap[url] += count
			return this
		}

		addPreShowTask(parent: cc.Node, duration: number = 0) {
			this._preShowTask = {
				parent: parent,
				duration: duration || (this._preShowTask && this._preShowTask.duration) || 0,
			}
			return this
		}

		execute(call: Function, onError?: (err: Error) => void) {
			let onAllDone = () => {
				call && call()
			}
			let preloadTaskMap = this._preloadTaskMap
			let urls = Object.keys(preloadTaskMap)
			cc.resources.load(urls.concat(), cc["Prefab"], (err, reses: cc.Prefab[]) => {
				if (err) {
					onError && onError(err)
					return
				}

				let taskLength = urls.length
				let doneCount = 0
				let onOneTaskDone = () => {
					doneCount++
					if (doneCount == taskLength) {
						onAllDone()
					}
				}
				urls.forEach((url, index) => {
					let prefab = reses[index]
					if (prefab) {
						if (!prefab.name) {
							prefab.name = prefab.data.name
						}
						let saveKey = prefab.name
						// prefab[CCMYURL] = saveKey = url
						let ls = this.resPoolMap[saveKey] = this.resPoolMap[saveKey] || []
						let count = preloadTaskMap[url]
						for (let i = 0; i < count; i++) {
							ls.push(cc.instantiate(prefab))
						}
					}

					if (this._preShowTask) {
						let parent = this._preShowTask.parent
						let duration = this._preShowTask.duration
						this.forEachAllRes((node) => {
							node.parent = parent
							node.active = false
						})
						let comp = parent.getComponents(cc.Component)[0]
						if (comp) {
							comp.scheduleOnce(() => {
								this.forEachAllRes((node) => {
									node.active = true
									node.parent = null
								})
								onOneTaskDone()
							}, duration)
						} else {
							this.forEachAllRes((node) => {
								node.active = true
								node.parent = null
							})
							onOneTaskDone()
						}
					} else {
						onOneTaskDone()
					}
				})
			})
			return this
		}
		clearTasks() {
			this._preloadTaskMap = EmptyTable()
			return this
		}

		instantiate(prefab: cc.Prefab): cc.Node {
			// let url = prefab[CCMYURL]
			if (!prefab.name) {
				prefab.name = prefab.data.name
			}
			let saveKey = prefab.name
			let pool = this.resPoolMap[saveKey]
			let node: cc.Node
			if (saveKey && pool && pool.length > 0) {
				node = pool.pop()
			} else {
				node = cc.instantiate(prefab)
			}
			if (!node[CCNodeSaveKey]) {
				node[CCNodeSaveKey] = prefab.name
			}
			return node
		}

		popByKey(key: string): cc.Node | undefined {
			let pool = this.resPoolMap[key]
			if (pool && pool.length > 0) {
				let node = pool.pop()
				return node
			}
			return undefined
		}

		put(node: cc.Node) {
			if (cc.isValid(node)) {
				node.parent = null
				let saveKey = node[CCNodeSaveKey]
				if (!!saveKey) {
					let pool = this.getResPool(saveKey)
					if (pool.indexOf(node) < 0) {
						pool.push(node)
					}
				} else {
					if (cc.isValid(node)) {
						node.destroy()
					}
					console.error("invalid saveKey")
				}
			} else {
				try {
					node.parent = null
				} catch (e) {
					console.error("invalid node to recycle:", node)
				}
			}
		}

	}

	export const ccNodePreloader = new CCNodePreloader().init()

}
