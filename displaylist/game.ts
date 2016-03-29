module game {


}

var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "head.jpg";
head.x = 50;
head.y = 100;

humanContainer.addChild(head)

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["wander-icon.jpg"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {

        // this.x = 
        // this.y = 
        // this.rotation =

    }
}

var ticker = new Ticker();

var bod = new render.Bitmap();
bod.source = "body.png";
bod.x = 50;
bod.y = 100;

var lleg = new render.Bitmap();
lleg.source = "lleg.png";
lleg.x = 50;
lleg.y = 100;

var rleg = new render.Bitmap();
rleg.source = "rleg.png";
rleg.x = 50;
rleg.y = 100;

var larm = new render.Bitmap();
larm.source = "larm.png";
larm.x = 50;
larm.y = 100;

var rarm = new render.Bitmap();
rarm.source = "rarm.png";
rarm.x = 50;
rarm.y =100;

humanContainer.addChild(bod);
humanContainer.addChild(lleg);
humanContainer.addChild(rleg);
humanContainer.addChild(larm);
humanContainer.addChild(rarm);


var body = new HumanBody(humanContainer);
ticker.start([body]);











