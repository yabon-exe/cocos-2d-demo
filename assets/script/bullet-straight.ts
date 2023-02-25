const { ccclass, property } = cc._decorator;

/**
* まっすぐ飛ぶ弾丸
*/
@ccclass
export default class BulletStraight extends cc.Component {

    player: any = null;

    rigidBody: any = null;

    @property
    bulletSpeed = 1000.0; // 弾の発射間隔

    onLoad() {
        // player情報を取得する
        this.player = cc.find("player", this.node.parent).getComponent('player');

        // 自身のボディを取得する
        this.rigidBody = this.node.getComponent(cc.RigidBody);

        // //衝突した時の動作を設定する
        let collider: cc.CircleCollider = this.node.getComponent(cc.CircleCollider);
        collider.node.on('collision-enter', this.onCollisionEnter, this);
        cc.log(collider);
    }

    onCollisionEnter(other: Node, self: Node) {
        cc.log('collision detected!');

    }

    start() {
        //プレイヤーに向けて一直線に飛ぶ
        let playerPos: cc.Vec2 = cc.v2(this.player.node.position);
        let vel: cc.Vec2 = playerPos.sub(cc.v2(this.node.position));
        //単位ベクトル(長さ1のベクトル)にして、速度分伸ばす
        vel = vel.normalize().mul(this.bulletSpeed);
        this.rigidBody.linearVelocity = vel;
    }

    update() {
    }
}
