
const { ccclass, property, menu } = cc._decorator;

@ccclass('LayerMGComp')
export class LayerMGComp extends cc.Component {
	@property(cc.Node)
	public layerRoot: cc.Node = null!
	@property(cc.Prefab)
	public modalPrefab: cc.Prefab = null!
	@property(cc.Prefab)
	public toastPrefab: cc.Prefab = null!
	@property(UILoading)
	public loadingView: UILoading = null!
	@property(cc.Camera)
	public uiCamera: cc.Camera = null!

	public toastPrefabUrl: string = "gcc.layer:toast"

	public static inst: LayerMGComp

	public onLayerChange: (() => void)[] = []

	public onLoad() {
		LayerMGComp.inst = this;
		respool.MyNodePool.registerPrefab(this.toastPrefabUrl, this.toastPrefab)
		this.loadingView.node.active = false;
		cc.game.addPersistRootNode(this.node)
	}

}
