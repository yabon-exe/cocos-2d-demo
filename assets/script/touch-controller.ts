const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchController extends cc.Component {

    canvas: any = null;
    graphics: any = null;
    camera: any = null;

    @property
    swiping: boolean = false;
    @property(cc.Vec2)
    swipeVec: cc.Vec2 = cc.v2(0, 0);
    swipeVecBase: cc.Vec2 = cc.v2(0, 0);
    @property
    swipeScale = 1.0;
    @property
    swipeDistanceLimit = 500.0;


    controllerLineStart: cc.Vec2 = cc.v2(0, 0);

    resetLatestLocation(touchLocation: cc.Vec2) {
        this.controllerLineStart = touchLocation;
    }

    drawControllerLine(touchLocation: cc.Vec2) {
        this.graphics.clear();

        let distance = this.swipeVec.mag();
        if (distance > this.swipeDistanceLimit) {
            distance = this.swipeDistanceLimit;
        }
        let lineTo = this.swipeVecBase;
        lineTo.normalizeSelf();
        lineTo.mulSelf(distance);

        this.graphics.lineWidth = distance / 5.0;
        this.graphics.strokeColor = cc.Color.WHITE;
        this.graphics.strokeColor.setA(128);
        this.graphics.moveTo(this.controllerLineStart.x, this.controllerLineStart.y);
        this.graphics.lineTo(lineTo.x, lineTo.y);
        this.graphics.stroke();
    }

    clearControllerLine() {
        this.graphics.clear();
    }

    screenToWorldPoint(touchLocation: cc.Vec2) {
        let location = touchLocation;
        let canvasSize = this.canvas.getContentSize();
        let x = location.x - canvasSize.width / 2.0;
        let y = location.y - canvasSize.height / 2.0;
        location.x = x;
        location.y = y;
        return location;
    }

    updateSwipeVector(touchLocation: cc.Vec2) {
        let vx = touchLocation.x - this.controllerLineStart.x;
        let vy = touchLocation.y - this.controllerLineStart.y;
        this.swipeVecBase = cc.v2(vx, vy);
        this.swipeVec = cc.v2(vx * this.swipeScale, vy * this.swipeScale);
    }

    resetSwipeVector() {
        this.swipeVec = cc.v2(0, 0);
    }

    onLoad() {
        this.canvas = this.node.parent;
        this.camera = cc.Camera.findCamera(this.node);
        this.graphics = this.node.getComponent(cc.Graphics);

        this.canvas.on(cc.Node.EventType.TOUCH_START, (e: cc.Event.EventTouch) => {
            let location = this.screenToWorldPoint(e.getLocation());
            this.resetLatestLocation(location);
            this.swiping = true;
            this.resetSwipeVector();
        });
        this.canvas.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            // let location = this.camera.getScreenToWorldPoint(e.getLocation());
            let location = this.screenToWorldPoint(e.getLocation());
            this.drawControllerLine(location);
            this.updateSwipeVector(location);
        });
        this.canvas.on(cc.Node.EventType.TOUCH_END, (e: cc.Event.EventTouch) => {
            let location = e.getLocation();
            this.clearControllerLine();
            this.swiping = false;
            this.resetSwipeVector();
        });
        this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, (e: cc.Event.EventTouch) => {
            let location = e.getLocation();
            this.clearControllerLine();
            this.swiping = false;
            this.resetSwipeVector();
        });

    }

    start() {


    }

    update(dt) {

    }
}
