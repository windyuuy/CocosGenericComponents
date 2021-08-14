
namespace gcc.layer {

	export interface ILayerMGComp {
		layerRoot: cc.Node
		modalPrefab: cc.Prefab
		toastPrefab: cc.Prefab
		loadingView: IUILoading
		uiCamera: cc.Camera
	}
}
