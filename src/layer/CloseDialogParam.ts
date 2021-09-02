
namespace gcc.layer {

	export class CloseDialogParam {
		/**
		 * 不播放动画, 立即关闭
		 */
		instant?: boolean
		/**
		 * 关闭时直接销毁
		 */
		destroyOnClose?: boolean
		protected _uri?: string;
		protected _data?: object;
		protected _tags: string[];
		protected _resUri?: string
		public get tags(): string[] {
			return this._tags;
		}
		public set tags(value: string[]) {
			this._tags = value;
		}

		/**
		 * 
		 * @param uri 图层uri (约定: 图层预制体的资源uri缺省使用 `${路径前缀}/${uri}`, 路径前缀默认为 "prefabs/ui")
		 * @param data 图层模型中的自定义数据
		 * @param resUri 图层预制体的资源uri (约定: 图层预制体的资源uri缺省使用 `${路径前缀}/${uri}`, 路径前缀默认为 "prefabs/ui")
		 * @param tags 图层标签
		 */
		constructor(uri: string, instant: boolean = false, destroyOnClose: boolean = false) {
			this.uri = uri
			this.instant = instant
			this.destroyOnClose = destroyOnClose
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

	}

}
