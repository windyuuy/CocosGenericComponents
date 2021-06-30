declare namespace cc {
	/**
	 * @en
	 * The component of transform in UI.
	 *
	 * @zh
	 * UI 变换组件。
	 */
	export class UITransform extends Component {
		get contentSize(): Readonly<math.Size>;
		set contentSize(value: Readonly<math.Size>);
		get width(): number;
		set width(value: number);
		get height(): number;
		set height(value: number);
		get anchorPoint(): Readonly<math.Vec2>;
		set anchorPoint(value: Readonly<math.Vec2>);
		get anchorX(): number;
		set anchorX(value: number);
		get anchorY(): number;
		set anchorY(value: number);
		get priority(): number;
		set priority(value: number);
		protected _priority: number;
		get visibility(): number;
		static EventType: typeof SystemEventType;
		_canvas: Canvas | null;
		protected _contentSize: math.Size;
		protected _anchorPoint: math.Vec2;
		__preload(): void;
		onEnable(): void;
		onDisable(): void;
		onDestroy(): void;
		/**
		 * @en
		 * Sets the untransformed size of the node.<br/>
		 * The contentSize remains the same no matter if the node is scaled or rotated.<br/>
		 * All nodes have a size. Layer and Scene have the same size of the screen.
		 *
		 * @zh
		 * 设置节点原始大小，不受该节点是否被缩放或者旋转的影响。
		 *
		 * @param size - 节点内容变换的尺寸或者宽度。
		 * @param height - 节点内容未变换的高度。
		 * @example
		 * ```ts
		 * import { Size } from 'cc';
		 * node.setContentSize(new Size(100, 100));
		 * node.setContentSize(100, 100);
		 * ```
		 */
		setContentSize(size: math.Size | number, height?: number): void;
		/**
		 * @en
		 * Sets the anchor point in percent. <br/>
		 * anchor point is the point around which all transformations and positioning manipulations take place. <br/>
		 * It's like a pin in the node where it is "attached" to its parent. <br/>
		 * The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.<br/>
		 * But you can use values higher than (1,1) and lower than (0,0) too.<br/>
		 * The default anchor point is (0.5,0.5), so it starts at the center of the node.
		 *
		 * @zh
		 * 设置锚点的百分比。<br>
		 * 锚点应用于所有变换和坐标点的操作，它就像在节点上连接其父节点的大头针。<br>
		 * 锚点是标准化的，就像百分比一样。(0，0) 表示左下角，(1，1) 表示右上角。<br>
		 * 但是你可以使用比（1，1）更高的值或者比（0，0）更低的值。<br>
		 * 默认的锚点是（0.5，0.5），因此它开始于节点的中心位置。<br>
		 * 注意：Creator 中的锚点仅用于定位所在的节点，子节点的定位不受影响。
		 *
		 * @param point - 节点锚点或节点 x 轴锚。
		 * @param y - 节点 y 轴锚。
		 * @example
		 * ```ts
		 * import { Vec2 } from 'cc';
		 * node.setAnchorPoint(new Vec2(1, 1));
		 * node.setAnchorPoint(1, 1);
		 * ```
		 */
		setAnchorPoint(point: math.Vec2 | number, y?: number): void;
		/**
		 * @zh
		 * 当前节点的点击计算。
		 *
		 * @param point - 屏幕点。
		 * @param listener - 事件监听器。
		 */
		isHit(point: math.Vec2, listener?: __private.cocos_core_platform_event_manager_event_listener_EventListener): any;
		/**
		 * @en
		 * Converts a Point to node (local) space coordinates.
		 *
		 * @zh
		 * 将一个 UI 节点世界坐标系下点转换到另一个 UI 节点 (局部) 空间坐标系，这个坐标系以锚点为原点。
		 * 非 UI 节点转换到 UI 节点(局部) 空间坐标系，请走 Camera 的 `convertToUINode`。
		 *
		 * @param worldPoint - 世界坐标点。
		 * @param out - 转换后坐标。
		 * @returns - 返回与目标节点的相对位置。
		 * @example
		 * ```ts
		 * const newVec3 = uiTransform.convertToNodeSpaceAR(cc.v3(100, 100, 0));
		 * ```
		 */
		convertToNodeSpaceAR(worldPoint: math.Vec3, out?: math.Vec3): math.Vec3;
		/**
		 * @en
		 * Converts a Point in node coordinates to world space coordinates.
		 *
		 * @zh
		 * 将距当前节点坐标系下的一个点转换到世界坐标系。
		 *
		 * @param nodePoint - 节点坐标。
		 * @param out - 转换后坐标。
		 * @returns - 返回 UI 世界坐标系。
		 * @example
		 * ```ts
		 * const newVec3 = uiTransform.convertToWorldSpaceAR(3(100, 100, 0));
		 * ```
		 */
		convertToWorldSpaceAR(nodePoint: math.Vec3, out?: math.Vec3): math.Vec3;
		/**
		 * @en
		 * Returns a "local" axis aligned bounding box of the node. <br/>
		 * The returned box is relative only to its parent.
		 *
		 * @zh
		 * 返回父节坐标系下的轴向对齐的包围盒。
		 *
		 * @return - 节点大小的包围盒
		 * @example
		 * ```ts
		 * const boundingBox = uiTransform.getBoundingBox();
		 * ```
		 */
		getBoundingBox(): math.Rect;
		/**
		 * @en
		 * Returns a "world" axis aligned bounding box of the node.<br/>
		 * The bounding box contains self and active children's world bounding box.
		 *
		 * @zh
		 * 返回节点在世界坐标系下的对齐轴向的包围盒（AABB）。
		 * 该边框包含自身和已激活的子节点的世界边框。
		 *
		 * @returns - 返回世界坐标系下包围盒。
		 * @example
		 * ```ts
		 * const newRect = uiTransform.getBoundingBoxToWorld();
		 * ```
		 */
		getBoundingBoxToWorld(): math.Rect;
		/**
		 * @en
		 * Returns the minimum bounding box containing the current bounding box and its child nodes.
		 *
		 * @zh
		 * 返回包含当前包围盒及其子节点包围盒的最小包围盒。
		 *
		 * @param parentMat - 父节点矩阵。
		 * @returns
		 */
		getBoundingBoxTo(parentMat: math.Mat4): math.Rect;
		/**
		 * @en
		 * Compute the corresponding aabb in world space for raycast.
		 *
		 * @zh
		 * 计算出此 UI_2D 节点在世界空间下的 aabb 包围盒
		 */
		getComputeAABB(out?: geometry.AABB): geometry.AABB | undefined;
		_updateVisibility(): void;
		protected _parentChanged(node: Node): void;
		protected _sortSiblings(): void;
	}

	export const UITransformComponent = UITransform
	export type UITransformComponent = UITransform
}
