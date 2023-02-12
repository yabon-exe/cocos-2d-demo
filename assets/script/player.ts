// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    rigidBody: any = null;
    latestLocation: cc.Vec2 = cc.v2(0, 0);
    

    resetLatestLocation(touchLocation: cc.Vec2){
        this.latestLocation = touchLocation;
    }

    getVelocity(touchLocation: cc.Vec2): cc.Vec2 {
        let vx = touchLocation.x - this.latestLocation.x;
        let vy = touchLocation.y - this.latestLocation.y;
        return cc.v2(vx, vy);
    }

    onLoad() {
        let physicsManager = cc.director.getPhysicsManager(); // 物理マネージャーを取得する
        physicsManager.enabled = true; // 物理マネージャーを有効にする

        this.rigidBody = this.node.getComponent(cc.RigidBody);
        const canvas = this.node.parent;

        canvas.on(cc.Node.EventType.TOUCH_START, (e: cc.Event.EventTouch) => {
            let location = e.getLocation();
            this.resetLatestLocation(location);
        });
        canvas.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            let location = e.getLocation();
            let v = this.getVelocity(location);
            this.rigidBody.linearVelocity = v;
            
        });
        canvas.on(cc.Node.EventType.TOUCH_END, (e: cc.Event.EventTouch) => {
            let location = e.getLocation();
            this.rigidBody.linearVelocity = cc.v2(0, 0);
        });
        canvas.on(cc.Node.EventType.TOUCH_CANCEL, (e: cc.Event.EventTouch) => {
            let location = e.getLocation();
            this.rigidBody.linearVelocity = cc.v2(0, 0);
        });

    }

    start() {

    }

    update() {

    }
}
