/**
 * 重力加速度
 */

const GRAVITY = 9.8;

const BOUNDS_BOTTOM = 400;

const BOUNDS_LEFT = 0;

const BOUNDS_RIGHT = 400;

const BOUNCE = 0.95;

const FRICTION = 0.15;

/**
 * 计时器系统
 */
class Ticker {

    bodyQueue = [];

    lastTime;

    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    start(bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    }

    onTicker() {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function(body) {
            body.onTicker(duringTime / 100)
        });
    }
}


class Body {

    vx = 10;
    vy = 0;
    x = 0;
    y = 0;
    width = 150;
    height = 100;
    ymark = true;
    bmark = true;
    fmark = true;
    

    displayObject;

    constructor(displayObject: DisplayObject) {
        this.displayObject = displayObject;
    }

    public onTicker(duringTime) {
        
        this.vy += duringTime * GRAVITY;
        this.x += duringTime * this.vx;
        
        if( this.ymark ){
            this.y += duringTime * this.vy;
        }
        if( !this.ymark ){
            this.y = this.y;
            if(this.fmark){
                this.vx -= duringTime * FRICTION;
                if(Math.abs(this.vx) < 1){
                    this.vx = 0;
                }
            }
            if(!this.fmark)
                this.vx += duringTime * FRICTION;
                 if(Math.abs(this.vx) < 1){
                    this.vx = 0;
                }
        }
        //反弹
        if (this.y + this.height > BOUNDS_BOTTOM && this.vy > 0) {
            this.vy = -BOUNCE * this.vy;
            if(Math.abs(this.vy) < 0.6 && this.bmark == false){
                this.ymark = false;
             }
        }    

        //TODO： 左右越界反弹
         if (this.x + this.width > BOUNDS_RIGHT && this.vx >0) {
            this.vx = -this.vx;           
            this.fmark = false;
        }
        
        if (this.x + this.width < BOUNDS_LEFT + this.width && this.vx <0) {
            this.vx = -BOUNCE * this.vx;
            this.bmark = false;
            this.fmark = true;
        }


        //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;

    }
}


var rect = new Rect();
rect.width = 150;
rect.height = 100;
rect.color = '#FF0000';

/**
 * 创建一个物体，其显示内容为一个长方形，受重力做平抛运动
 */
var body = new Body(rect);
body.width = rect.width;
body.height = rect.height;
body.vx = 5;//需要保证 vx 在 0-50的范围内行为正常
body.vy = 0;//需要保证 vy 在 0-50的范围内行为正常


var renderCore = new RenderCore();
var ticker = new Ticker();

renderCore.start([rect]);
ticker.start([body]);


