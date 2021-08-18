
namespace gcc.layer {

	/**
	 * 基于tag的图层顺序管理
	 */
	export class LayerOrderMG {
		/**
		 * tag的顺序map
		 */
		protected tagsOrderMap: { [key: string]: number } = EmptyTable()

		/**
		 * 设置tag初始依赖顺序
		 */
		setupTagsDepends(tags: string[]) {
			tags.forEach((tag, index) => {
				this.tagsOrderMap[tag] = index
			})
		}

		protected reOrderMap: number[] = []
		/**
		 * 设置tag依赖关系
		 * - 所有tag必须是单向依赖关系
		 * @param tag 
		 * @param dependTags 
		 */
		setTagDepends(tag: string, dependTags: string[], force: boolean = false) {
			if (this.tagsOrderMap[tag] == undefined) {
				this.tagsOrderMap[tag] = 0
			}
			for (let dtag of dependTags) {
				if (this.tagsOrderMap[dtag] == undefined) {
					this.tagsOrderMap[dtag] = 0
				}
			}

			// 展开依赖
			{
				let curOrder = this.tagsOrderMap[tag]
				for (let dtag of dependTags) {
					let dOrder = this.tagsOrderMap[dtag]
					if (curOrder == dOrder) {
						curOrder = dOrder + 1
					} else if (curOrder < dOrder) {
						if (force) {
							curOrder = dOrder + 1
						} else {
							console.error("无法展开回环依赖")
						}
					}
				}
				this.tagsOrderMap[tag] = curOrder
			}

			// 缩紧索引空间
			{
				let reOrderMap: number[] = this.reOrderMap
				reOrderMap.clear()
				for (let key in this.tagsOrderMap) {
					let order = this.tagsOrderMap[key]
					reOrderMap[order] = order
				}

				let maxOrder0 = 0
				for (let i = reOrderMap.length - 1; i >= 0; i--) {
					let order = reOrderMap[i]
					if (order > maxOrder0) {
						maxOrder0 = order
					}
				}

				let maxOrder = 0
				let curOrder = 0
				while (maxOrder <= maxOrder0) {
					let oldOrder = reOrderMap[maxOrder]
					if (oldOrder !== undefined) {
						reOrderMap[maxOrder] = curOrder
						curOrder++
					}
					maxOrder++
				}

				for (let key in this.tagsOrderMap) {
					let order = this.tagsOrderMap[key]
					this.tagsOrderMap[key] = reOrderMap[order]
				}
			}

		}

		/**
		 * 设置tag依赖关系
		 * - 所有tag必须是单向依赖关系
		 * @param tag
		 * @param dependTags
		 */
		setTagDepend(tag: string, dependTag: string, force: boolean = false) {
			return this.setTagDepends(tag, [dependTag], force)
		}

		/**
		 * 获取图层顺序
		 * @param tags 
		 * @returns 
		 */
		getOrder(tags: string[]): number {
			let tag = lang.helper.ArrayHelper.max(tags, (tag) => {
				return this.tagsOrderMap[tag]
			})
			if (tag) {
				return this.tagsOrderMap[tag]
			} else {
				return 0
			}
		}

	}

}
