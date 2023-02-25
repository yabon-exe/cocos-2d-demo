
const { ccclass, property } = cc._decorator;

/**
* 弾丸発射台
*/
@ccclass
export default class Battery extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: any = null; // 弾のPrefab

    @property
    bulletInterval = 3.0; // 弾の発射間隔

    /**
     * 設定された弾丸を発射
     */
    fire() {
        // 弾のPrefabをインスタンス化(登場)させる
        const bullet = cc.instantiate(this.bulletPrefab);
        // 弾の位置は発射台と同じにする
        bullet.setPosition(this.node.position);
        // 弾は自分(発射台)の子オブジェクトとする
        bullet.parent = this.node.parent;
    }

    start() {
        // 弾の発射設定
        this.schedule(this.fire, this.bulletInterval);
    }

    // update (dt) {}
}
