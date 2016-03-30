module game {


}

var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "head.png";
head.x -= 50;
head.y -= 100;

humanContainer.addChild(head)

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png","body.png","lleg.png","rleg.png","larm.png","rarm.png"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {

         this.x += 1; 
         this.y = 100;
         this.rotation += 1;

    }
}

var ticker = new Ticker();

var bod = new render.Bitmap();
bod.source = "body.png";
bod.x -= 75;
bod.y -= 250;

var lleg = new render.Bitmap();
lleg.source = "lleg.png";
lleg.x -= 130;
lleg.y -= 340;

var rleg = new render.Bitmap();
rleg.source = "rleg.png";
rleg.x -= 100;
rleg.y -= 340;

var larm = new render.Bitmap();
larm.source = "larm.png";
larm.x -= 40;
larm.y -= 260;

var rarm = new render.Bitmap();
rarm.source = "rarm.png";
rarm.x -= 150;
rarm.y -=260;

humanContainer.addChild(bod);
humanContainer.addChild(lleg);
humanContainer.addChild(rleg);
humanContainer.addChild(larm);
humanContainer.addChild(rarm);


var body = new HumanBody(humanContainer);
ticker.start([body]);











