var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "head.png";
head.x -= 150;
head.y -= 20;
humanContainer.addChild(head);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "body.png", "lleg.png", "rleg.png", "larm.png", "rarm.png"]);
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
var bod = new render.Bitmap();
bod.source = "body.png";
bod.x -= 125;
bod.y += 125;
var lleg = new render.Bitmap();
lleg.source = "lleg.png";
lleg.x -= 95;
lleg.y += 220;
var rleg = new render.Bitmap();
rleg.source = "rleg.png";
rleg.x -= 65;
rleg.y += 220;
var larm = new render.Bitmap();
larm.source = "larm.png";
larm.x -= 40;
larm.y += 120;
var rarm = new render.Bitmap();
rarm.source = "rarm.png";
rarm.x -= 160;
rarm.y += 120;
humanContainer.addChild(bod);
humanContainer.addChild(lleg);
humanContainer.addChild(rleg);
humanContainer.addChild(larm);
humanContainer.addChild(rarm);
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map