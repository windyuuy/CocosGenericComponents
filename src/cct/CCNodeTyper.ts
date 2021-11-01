
namespace gcc.cct {
	export interface NodeTree {
		// node: cc.Node
		// id: number
		// childIndex: number
		[key: string]: NodeTree
	}

	const ANodeName = "*_"
	const ANodeAttr = "*__attrs"

	export class CCNodeTyper {

		/**
		 * 是否自动清理缓存中不可用的节点
		 */
		needAutoCleanInvalidNodes: boolean = true

		/**
		 * 打印单个节点的信息 childName(childIndex, uid)
		 */
		protected _collNode(node: cc.Node, index: { id: number }, childIndex: number, tree: NodeTree) {
			let indexID = this.nodeIndexMap[node.uuid]
			if (indexID == null) {
				indexID = ++index.id
				this.nodeMap[indexID] = node
				this.nodeIndexMap[node.uuid] = indexID
			}

			let name = `${node.name}(${childIndex},${indexID})`
			let obj = Object.create(null)
			obj[ANodeName] = node

			let nodeAttrs = Object.create(null)
			let active = node.active
			if (!active) {
				nodeAttrs['a'] = 'T'
			}
			let pos = node.position
			let posInfo = Object.create(null)
			let posLines: string[] = ['x', 'y', 'z',].filter(k => pos[k] !== 0).map(k => `${k}:${pos[k]}`)
			if (posLines.length > 0) {
				nodeAttrs['pos'] = `(${posLines.join(",")})`
			}

			if (Object.keys(nodeAttrs).length > 0) {
				obj[ANodeAttr] = nodeAttrs
			}

			tree[name] = obj
			this.nodeTree[indexID] = obj
			return name
		}

		protected _collNodeRecursely(node: cc.Node, index: { id: number }, childIndex: number, tree: NodeTree) {
			let name = this._collNode(node, index, childIndex, tree)
			let subTree = tree[name]
			node.children.forEach((child, cindex) => {
				this._collNodeRecursely(child, index, cindex, subTree)
			})
		}

		protected nodeMap: { [key: number]: cc.Node } = Object.create(null)
		protected nodeIndexMap: { [key: string]: number } = this.nodeMap as any
		protected nodeTree: { [key: number]: NodeTree } = Object.create(null)

		autoCleanInvalidNodes() {
			if (this.needAutoCleanInvalidNodes) {
				this.cleanInvalidNodes()
			}
		}
		cleanInvalidNodes() {
			for (let key in this.nodeIndexMap) {
				let index = this.nodeIndexMap[key]
				let node = this.nodeMap[index]

				if (!cc.isValid(node)) {
					delete this.nodeIndexMap[key]
					delete this.nodeMap[index]
					delete this.nodeTree[index]
				}
			}
		}

		collectNode(root: cc.Node) {
			this.autoCleanInvalidNodes()
			let rootTree = Object.create(null)
			this._collNodeRecursely(root, { id: 0 }, 0, rootTree)
			return rootTree
		}
		collectAll() {
			// let root = cc.find("Canvas").parent as cc.Node
			let root = cc.find("") as cc.Node
			return this.collectNode(root)
		}

		/**
		 * 获取所有节点
		 */
		get all() {
			return this.collectAll()
		}

		protected _typeNode(tree: NodeTree, index: number, key: string, info: string[]) {
			let node = tree[ANodeName] as any as cc.Node
			let nodeInfoLine = ""
			if (node) {
				let nodeInfo = []
				nodeInfo.push(`active:${node.active}`)

				let pos = node.position
				nodeInfo.push(`pos:(x:${pos.x},y:${pos.y},z:${pos.z})`)
				if (nodeInfo.length > 0) {
					nodeInfoLine = `\t\t-> ${nodeInfo.join(", ")}`
				}
			}
			info.push(`${"|\t".repeat(index)}${key}${nodeInfoLine}`)
		}

		protected _typeNodeRecursely(node: NodeTree, index: number, key: string, info: string[]) {
			this._typeNode(node, index, key, info)

			for (let subKey in node) {
				if (subKey == ANodeName || subKey == ANodeAttr) {
					continue
				}
				let subNode = node[subKey]
				this._typeNodeRecursely(subNode, index + 1, subKey, info)
			}
		}

		typeNode(node: cc.Node) {
			let typeList: string[] = []
			let root = this.collectNode(node)
			this._typeNode(root, 0, "$root", typeList)
			for (let key in root) {
				let subNode = root[key]
				this._typeNodeRecursely(subNode, 1, key, typeList)
			}
			// let content = typeList.join("\n")
			// return content
			return typeList
		}
		typeAll() {
			let root = cc.find("Canvas").parent as cc.Node
			return this.typeNode(root)
		}

		printAll() {
			this.typeAll().forEach(l => console.log(l))
		}

		getNodeById(id: number): cc.Node {
			return this.nodeMap[id]
		}

		getTreeById(id: number): NodeTree {
			return this.nodeTree[id]
		}

		findNodeByName(name: string): cc.Node | undefined {
			for (let id in this.nodeMap) {
				let node = this.nodeMap[id]
				if (node.name == name) {
					return node
				}
			}
			return undefined
		}

		findNodesByName(name: string): cc.Node[] {
			let nodes: cc.Node[] = []
			for (let id in this.nodeMap) {
				let node = this.nodeMap[id]
				if (node.name == name) {
					nodes.push(node)
				}
			}
			return nodes
		}

		hideNode(id: number) {
			this.getNodeById(id).active = false
		}
		showNode(id: number) {
			this.getNodeById(id).active = true
		}
	}

	export const cctyper = new CCNodeTyper()
	window["cct"] = cctyper
}
