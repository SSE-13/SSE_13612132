
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
var clickon = false;
var stand = false;
head.source = "head.png";
head.x -= 80;
head.y -= 200;
head.width = 153;
head.high = 156;

humanContainer.addChild(head);


var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png","trunk.png","left_leg.png","right_leg.png","left_arm.png","right_arm.png"]);

class HumanBody extends Body {
    
    vx:number = 5;
    
    onTicker(duringTime: number) {
        if(stand == false){
            if(clickon == false){
                this.x += 1; 
                this.y = 100;
                this.rotation += 1;
            }
            if(clickon){
                this.x -= 1; 
                this.y = 100;
                this.rotation -= 1;
            }
        }
        if(stand)
        {
            
            this.y = 100;
            this.rotation = 1;
        }
    }
}

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

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if(localPoint.x > 0 && localPoint.x < head.width ){//head.x - head.width/2 && localPoint.x < head.x + head.width/2){
        if(localPoint.y > 0 && localPoint.y < head.high ){//head.y - head.high/2 && localPoint.y < head.y + head.high/2){
            console.log(clickon);
            if(clickon == false){
                clickon = true;  
                stand = false; 
            }
            else if(clickon){
                clickon = false;     
                stand = false;  
            }      
        }
    }
     if(localPoint.x > left_leg.x - head.x && localPoint.x < right_leg.x - head.x ){//head.x - head.width/2 && localPoint.x < head.x + head.width/2){
        if(localPoint.y > left_leg.y - head.y && localPoint.y < left_leg.y - head.y + left_leg.high ){
             //console.log('1');
             stand = true;           
        }
     }
    
    return true;
}

var headOnClick = () => {
    alert("clicked!!");
    
    //修改 HumanBody 的速度，使其反向移动
}

eventCore.register(head,headHitTest,headOnClick);










