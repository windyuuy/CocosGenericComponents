
namespace gcc.cct {
	export interface NodeTree {
		// node: cc.Node
		// id: number
		// childIndex: number
		[key: string]: NodeTree
	}

	const ANodeName = "*_"

	export class CCNodeTyper {

		/**
		 * 打印单个节点的信息 childName(childIndex, uid)
		 */
		protected _collNode(node: cc.Node, index: { id: number }, childIndex: number, tree: NodeTree) {
			this.nodeMap[index.id] = node

			let name = `${node.name}(${childIndex},${index.id})`
			let obj = Object.create(null)
			obj[ANodeName] = node
			tree[name] = obj
			return name
		}

		protected _collNodeRecursely(node: cc.Node, index: { id: number }, childIndex: number, tree: NodeTree) {
			index.id++
			let name = this._collNode(node, index, childIndex, tree)
			let subTree = tree[name]
			node.children.forEach((child, cindex) => {
				this._collNodeRecursely(child, index, cindex, subTree)
			})
		}

		protected nodeMap: { [key: number]: cc.Node } = {}
		protected nodeTree: { [key: number]: NodeTree } = {}
		collectNode(root: cc.Node) {
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

		protected _typeNode(node: NodeTree, index: number, key: string, info: string[]) {
			info.push(`${"|\t".repeat(index)}${key}`)
		}

		protected _typeNodeRecursely(node: NodeTree, index: number, key: string, info: string[]) {
			this._typeNode(node, index, key, info)

			for (let subKey in node) {
				if (subKey == ANodeName) {
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

		getNodeById(id: number): cc.Node {
			return this.nodeMap[id]
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
