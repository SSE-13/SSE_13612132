var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "head.png";
head.x -= 80;
head.y -= 200;
humanContainer.addChild(head);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "trunk.png", "left_leg.png", "right_leg.png", "left_arm.png", "right_arm.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += 1;
        this.y = 100;
        this.rotation += 1;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var trunk = new render.Bitmap();
trunk.source = "trunk.png";
trunk.x -= 55;
trunk.y -= 50;
var left_leg = new render.Bitmap();
left_leg.source = "left_leg.png";
left_leg.x -= 30;
left_leg.y += 50;
var right_leg = new render.Bitmap();
right_leg.source = "right_leg.png";
right_leg.x -= 0;
right_leg.y += 50;
var left_arm = new render.Bitmap();
left_arm.source = "left_arm.png";
left_arm.x += 20;
left_arm.y -= 50;
var right_arm = new render.Bitmap();
right_arm.source = "right_arm.png";
right_arm.x -= 85;
right_arm.y -= 50;
humanContainer.addChild(trunk);
humanContainer.addChild(left_leg);
humanContainer.addChild(right_leg);
humanContainer.addChild(left_arm);
humanContainer.addChild(right_arm);
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map