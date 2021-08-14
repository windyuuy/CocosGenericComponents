
namespace gcc.layer {

	export class ShowDialogParam {
		protected _uri?: string;
		protected _data?: object;
		protected _order?: number;
		protected _tags: string[];
		protected _resUri?: string
		public get tags(): string[] {
			return this._tags;
		}
		public set tags(value: string[]) {
			this._tags = value;
		}

		constructor(uri: string, data?: object, resUri?: string, tags?: string[]) {
			this.uri = uri
			this.data = data
			this.tags = tags
			this.resUri = resUri ?? uri
		}

		public get uri(): string {
			return this._uri ?? "";
		}
		public set uri(v: string) {
			this._uri = v
		}

		public get resUri(): string {
			return this._resUri
		}
		public set resUri(value: string) {
			this._resUri = LayerUriUtil.wrapUri(value)
		}

		public get data(): object | undefined {
			return this._data;
		}

		public set data(v: object | undefined) {
			this._data = v;
		}

		/**
		 * 如果dat为空, 则复用之前的模型数据
		 */
		reuseData: boolean = true

		public get order(): number {
			return this._order ?? 0;
		}

		public set order(v: number) {
			this._order = v;
		}
	}

}
