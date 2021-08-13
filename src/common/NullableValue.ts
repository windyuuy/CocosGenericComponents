
namespace gcc.objpool {

	export interface IMerge<T> {
		merge(a: T): this
	}

	export interface ISetable<T> {
		set(a: T): this
	}

	export class Nullable<T extends ISetable<T>> {
		protected cls: new () => T
		protected defaultValue: T
		constructor(cls: new () => T, defaultValue: T) {
			this.cls = cls
			this.defaultValue = defaultValue
		}

		protected member?: T

		get Value(): T {
			return this.member ?? this.defaultValue
		}

		get HasValue(): boolean {
			return typeof (this.member) != "undefined"
		}

		set(value?: T) {
			if (typeof (value) != "undefined") {
				if (this.member == null) {
					this.member = new this.cls()
				}
				// console.warn("moveV:", value);
				this.member.set(value)
			} else {
				this.member = undefined
			}
		}
	}

}
