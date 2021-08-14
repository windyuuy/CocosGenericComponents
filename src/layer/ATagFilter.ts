
namespace gcc.layer {

	export type TagTarget = Object

	/**
	 * 对象tag属性记录
	 */
	export class TagRecord {
		target: TagTarget
		tagsSet: Set<string> = new Set<string>()
	}

	/**
	 * tag管理类
	 */
	export class TagFilter {

		/**
		 * 记录项列表
		 */
		protected records: TagRecord[] = []

		protected getRecord(target: TagTarget) {
			let record = this.records.find(r => r.target == target);
			return record;
		}

		/**
		 * 更新对象的tag设置
		 * @param target 
		 * @param tags 
		 */
		updateTargetTags(target: TagTarget, tags: string[]) {
			let record = this.getRecord(target);
			if (record != null) {
				record.tagsSet.clear();
				for (let tag of tags) {
					record.tagsSet.add(tag)
				}
			}
		}

		/**
		 * 移除记录的对象
		 * @param target 
		 */
		removeTarget(target: TagTarget) {
			let record = this.getRecord(target);
			this.records.remove(record)
		}

		/**
		 * 通过tag筛选所有对象
		 * @param tags 
		 */
		filterTargetsByTags<T extends Object>(tags: string[]): TagTarget[] {
			let result = this.records.filter(r => {
				let matched = true
				for (let tag of tags) {
					if (!r.tagsSet.has(tag)) {
						matched = false
					}
				}
				return matched
			}).map(r => r.target)
			return result
		}
	}

}
