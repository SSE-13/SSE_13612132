var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
var clickon = false;
head.source = "head.png";
head.x -= 80;
head.y -= 200;
head.width = 153;
head.high = 156;
humanContainer.addChild(head);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "trunk.png", "left_leg.png", "right_leg.png", "left_arm.png", "right_arm.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 5;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        if (clickon == false) {
            this.x += 1;
            this.y = 100;
            this.rotation += 1;
        }
        if (clickon) {
            this.x -= 1;
            this.y = 100;
            this.rotation -= 1;
        }
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var trunk = new render.Bitmap();
trunk.source = "trunk.png";
trunk.x -= 55;
trunk.y -= 50;
trunk.width = 108;
trunk.high = 96;
var left_leg = new render.Bitmap();
left_leg.source = "left_leg.png";
left_leg.x -= 30;
left_leg.y += 50;
left_leg.width = 25;
left_leg.high = 71;
var right_leg = new render.Bitmap();
right_leg.source = "right_leg.png";
right_leg.x -= 0;
right_leg.y += 50;
right_leg.width = 25;
right_leg.high = 71;
var left_arm = new render.Bitmap();
left_arm.source = "left_arm.png";
left_arm.x += 20;
left_arm.y -= 50;
left_arm.width = 72;
left_arm.high = 23;
var right_arm = new render.Bitmap();
right_arm.source = "right_arm.png";
right_arm.x -= 85;
right_arm.y -= 50;
right_arm.width = 66;
right_arm.high = 23;
humanContainer.addChild(trunk);
humanContainer.addChild(left_leg);
humanContainer.addChild(right_leg);
humanContainer.addChild(left_arm);
humanContainer.addChild(right_arm);
var body = new HumanBody(humanContainer);
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var headHitTest = function (localPoint, displayObject) {
    alert("\u70B9\u51FB\u4F4D\u7F6E\u4E3A" + localPoint.x + "," + localPoint.y);
    console.log(head.x);
    if (localPoint.x > 0 && localPoint.x < 153) {
        //if(localPoint.y > head.y - head.high/2 && localPoint.y < head.y + head.high/2){
        console.log(clickon);
        if (clickon == false)
            clickon = true;
        else if (clickon)
            clickon = false;
    }
    return true;
};
var headOnClick = function () {
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
};
eventCore.register(head, headHitTest, headOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3pELElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQy9CLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztBQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztBQUN6QixJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNiLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO0FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7QUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7QUFFaEIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUc5QixJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN6QyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsY0FBYyxFQUFDLGVBQWUsRUFBQyxjQUFjLEVBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUV6SDtJQUF3Qiw2QkFBSTtJQUE1QjtRQUF3Qiw4QkFBSTtRQUV4QixPQUFFLEdBQVUsQ0FBQyxDQUFDO0lBY2xCLENBQUM7SUFaRyw0QkFBUSxHQUFSLFVBQVMsVUFBa0I7UUFDdkIsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFBLENBQUM7WUFDakIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNiLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxFQUFFLENBQUEsQ0FBQyxP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