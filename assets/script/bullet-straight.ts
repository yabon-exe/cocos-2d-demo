
const {ccclass, property} = cc._decorator;

/**
* まっすぐ飛ぶ弾丸
*/
@ccclass
export default class BulletStraight extends cc.Component {

    rigidBody: any = null;

    onLoad() {
        // 自身のボディを取得する
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    }

    start() {
        this.rigidBody.linearVelocity = cc.v2(5, 0);
    }

    update() {

    }
}
