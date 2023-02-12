// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class UILayer extends cc.Component {

    canvas: any = null;
    graphics: any = null;
    camera: any = null;

    controllerLineStart: cc.Vec2 = cc.v2(0, 0);

    resetLatestLocation(touchLocation: cc.Vec2){
        this.controllerLineStart = touchLocation;
    }

    drawControllerLine (touchLocation: cc.Vec2) {
        this.graphics.clear();

        let distance = this.controllerLineStart.sub(touchLocation).mag();

        if (distance > 500.0) {
            distance = 500.0;
        }
        this.graphics.lineWidth = distance / 5.0;
        this.graphics.strokeColor = cc.Color.WHITE;
        this.graphics.strokeColor.setA(128);
        this.graphics.moveTo(this.controllerLineStart.x,this.controllerLineStart.y);
        this.graphics.lineTo(touchLocation.x, touchLocation.y);
        this.graphics.stroke();
    }

    clearControllerLine () {
        this.graphics.clear();
    }

    screenToWorldPoint (touchLocation: cc.Vec2) {
        let location = touchLocation;
        let canvasSize = this.canvas.getContentSize();
        let x = location.x - canvasSize.width / 2.0;
        let y = location.y - canvasSize.height / 2.0;
        location.x = x;
        location.y = y;
        return location;
    }

    onLoad () {
        this.canvas = this.node.parent;
        this.camera = cc.Camera.findCamera(this.node);
        this.graphics = this.node.getComponent(cc.Graphics);

        this.canvas.on(cc.Node.EventType.TOUCH_START, (e: cc.Event.EventTouch) => {
            let location = this.screenToWorldPoint(e.getLocation());
            this.resetLatestLocation(location);
        });
        this.canvas.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            // let location = this.camera.getScreenToWorldPoint(e.getLocation());
            let location = this.screenToWorldPoint(e.getLocation());
            this.drawControllerLine(location);
        });
        this.canvas.on(cc.Node.EventType.TOUCH_END, (e: cc.Event.EventTouch) => {
            let location = e.getLocation();
            this.clearControllerLine();
        });
        this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, (e: cc.Event.EventTouch) => {
            let location = e.getLocation();
            this.clearControllerLine();
        });
        
    }

    start() {


    }

    update (dt) {

    }
}
