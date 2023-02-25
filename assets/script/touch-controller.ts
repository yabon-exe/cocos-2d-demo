const { ccclass, property } = cc._decorator;

/**
スマホ画面タッチコントローラー
*/
@ccclass
export default class TouchController extends cc.Component {

    canvas: any = null;
    graphics: any = null;
    camera: any = null;
    controllerLineStart: cc.Vec2 = cc.v2(0, 0);
    swipeVecBase: cc.Vec2 = cc.v2(0, 0);

    /**
    スワイプ中フラグ
    */
    @property
    swiping: boolean = false;

    /**
    スワイプベクトル
    */
    @property(cc.Vec2)
    swipeVec: cc.Vec2 = cc.v2(0, 0);

    /**
    スワイプベクトルスケール
    */
    @property
    swipeScale = 1.0;

    /**
    スワイプベクトルの最大の長さ
    */
    @property
    swipeDistanceLimit = 500.0;

    /**
    スワイプラインスタート位置を更新する
    @param touchLocation 画面タッチ位置
    */
    resetLatestLocation(touchLocation: cc.Vec2) {
        this.controllerLineStart = touchLocation;
    }

    /**
    スワイプラインを描画する（ぷにコン？みたいなもの）
    @param touchLocation 画面タッチ位置
    */
    drawSwipeLine() {
        this.graphics.clear();

        let distance = this.swipeVec.mag()  / 5.0;
        if (distance > this.swipeDistanceLimit) {
            // スワイプベクトルの最大値制限
            distance = this.swipeDistanceLimit;
        }
        let lineTo = cc.v2(
            this.controllerLineStart.x + this.swipeVecBase.x,
            this.controllerLineStart.y + this.swipeVecBase.y
        );

        // スワイプライン描画
        this.graphics.lineWidth = distance / 5.0;
        this.graphics.strokeColor = cc.Color.WHITE;
        this.graphics.strokeColor.setA(128);
        this.graphics.moveTo(this.controllerLineStart.x, this.controllerLineStart.y);
        this.graphics.lineTo(lineTo.x, lineTo.y);
        this.graphics.stroke();
    }

    /**
    描画した内容を削除
    */
    clearGraphics() {
        this.graphics.clear();
    }

    /**
    画面タッチ位置をワールド座標系に変換
    @param touchLocation 画面タッチ位置

    !!!本来、this.camera.getScreenToWorldPoint を使うべきだが、動作が確認できないため、代用として実装
    */
    screenToWorldPoint(touchLocation: cc.Vec2) {
        let location = touchLocation;
        let canvasSize = this.canvas.getContentSize();
        let x = location.x - canvasSize.width / 2.0;
        let y = location.y - canvasSize.height / 2.0;
        location.x = x;
        location.y = y;
        return location;
    }

    /**
    スワイプベクトルを更新
    @param touchLocation 画面タッチ位置
    */
    updateSwipeVec(touchLocation: cc.Vec2) {
        let vx = touchLocation.x - this.controllerLineStart.x;
        let vy = touchLocation.y - this.controllerLineStart.y;
        this.swipeVecBase = cc.v2(vx, vy);
        this.swipeVec = cc.v2(vx * this.swipeScale, vy * this.swipeScale);
    }

    /**
    スワイプベクトルをリセット
    */
    resetSwipeVec() {
        this.swipeVec = cc.v2(0, 0);
    }


    onLoad() {
        this.canvas = this.node.parent;
        this.camera = cc.Camera.findCamera(this.node);
        this.graphics = this.node.getComponent(cc.Graphics);

        this.canvas.on(cc.Node.EventType.TOUCH_START, (e: cc.Event.EventTouch) => {
            // タッチ、スワイプ開始
            let location = this.screenToWorldPoint(e.getLocation());
            this.resetLatestLocation(location);
            this.swiping = true;
            this.resetSwipeVec();
        });
        this.canvas.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            // スワイプ中
            let location = this.screenToWorldPoint(e.getLocation());
            this.updateSwipeVec(location);
            this.drawSwipeLine();
        });
        this.canvas.on(cc.Node.EventType.TOUCH_END, (e: cc.Event.EventTouch) => {
            // スワイプ終了
            let location = e.getLocation();
            this.swiping = false;
            this.resetSwipeVec();
            this.clearGraphics();
        });
        this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, (e: cc.Event.EventTouch) => {
            // スワイプキャンセル
            let location = e.getLocation();
            this.swiping = false;
            this.resetSwipeVec();
            this.clearGraphics();
        });
    }

    start() {


    }

    update() {

    }
}
