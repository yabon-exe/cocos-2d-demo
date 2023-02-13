const { ccclass, property } = cc._decorator;

/**
プレイヤー
*/
@ccclass
export default class Player extends cc.Component {

    touchController: any = null;
    rigidBody: any = null;

    onLoad() {
        let physicsManager = cc.director.getPhysicsManager(); // 物理マネージャーを取得する
        physicsManager.enabled = true; // 物理マネージャーを有効にする

        // touch-controllerを取得する
        this.touchController = cc.find("touch-controller", this.node.parent).getComponent('touch-controller');

        // 自身のボディを取得する
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    }

    start() {


    }

    update() {

        // touch-controllerの入力を読み取って動作する
        if (this.touchController.swiping) {
            let vel = this.touchController.swipeVec;
            this.rigidBody.linearVelocity = vel;
        } else {
            this.rigidBody.linearVelocity = cc.v2(0, 0);
        }
    }
}
