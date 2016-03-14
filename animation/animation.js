/**
 * 重力加速度
 */
var GRAVITY = 9.8;
var BOUNDS_BOTTOM = 400;
var BOUNDS_LEFT = 0;
var BOUNDS_RIGHT = 400;
var BOUNCE = 0.95;
var FRICTION = 0.15;
/**
 * 计时器系统
 */
var Ticker = (function () {
    function Ticker() {
        this.bodyQueue = [];
    }
    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    Ticker.prototype.start = function (bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    };
    Ticker.prototype.onTicker = function () {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function (body) {
            body.onTicker(duringTime / 100);
        });
    };
    return Ticker;
}());
var Body = (function () {
    function Body(displayObject) {
        this.vx = 10;
        this.vy = 0;
        this.x = 0;
        this.y = 0;
        this.width = 150;
        this.height = 100;
        this.ymark = true;
        this.bmark = true;
        this.fmark = true;
        this.displayObject = displayObject;
    }
    Body.prototype.onTicker = function (duringTime) {
        this.vy += duringTime * GRAVITY;
        this.x += duringTime * this.vx;
        if (this.ymark) {
            this.y += duringTime * this.vy;
        }
        if (!this.ymark) {
            this.y = this.y;
            if (this.fmark) {
                this.vx -= duringTime * FRICTION;
                if (Math.abs(this.vx) < 1) {
                    this.vx = 0;
                }
            }
            if (!this.fmark)
                this.vx += duringTime * FRICTION;
            if (Math.abs(this.vx) < 1) {
                this.vx = 0;
            }
        }
        //反弹
        if (this.y + this.height > BOUNDS_BOTTOM && this.vy > 0) {
            this.vy = -BOUNCE * this.vy;
            if (Math.abs(this.vy) < 0.6 && this.bmark == false) {
                this.ymark = false;
            }
        }
        //TODO： 左右越界反弹
        if (this.x + this.width > BOUNDS_RIGHT && this.vx > 0) {
            this.vx = -this.vx;
            this.fmark = false;
        }
        if (this.x + this.width < BOUNDS_LEFT + this.width && this.vx < 0) {
            this.vx = -BOUNCE * this.vx;
            this.bmark = false;
            this.fmark = true;
        }
        //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;
    };
    return Body;
}());
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
body.vx = 5; //需要保证 vx 在 0-50的范围内行为正常
body.vy = 0; //需要保证 vy 在 0-50的范围内行为正常
var renderCore = new RenderCore();
var ticker = new Ticker();
renderCore.start([rect]);
ticker.start([body]);
