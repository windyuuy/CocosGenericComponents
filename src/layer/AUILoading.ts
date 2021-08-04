

namespace gcc.layer {

    const { ccclass, property, integer } = cc._decorator;

    @ccclass('UILoading')
    export class UILoading extends cc.Component {
        @property(cc.Node)
        anim: cc.Node = null!

        @integer
        public confDelay: number = 1

        private loadingCount: number = 0;

        public show() {
            this.loadingCount++;
            if (this.loadingCount == 1) {
                this.node.active = true;
                this.scheduleOnce(this.showAnim.bind(this), this.confDelay);
            }
        }

        private showAnim() {
            this.anim.active = true
        }

        public hide() {
            this.loadingCount--;
            if (this.loadingCount == 0) {
                this.unscheduleAllCallbacks()
                this.node.active = false;
            }
        }
    }
}
