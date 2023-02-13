// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

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
            this.rigidBody.linearVelocity = this.touchController.swipeVector;
        } else {
            this.rigidBody.linearVelocity = cc.v2(0, 0);
        }
    }
}
