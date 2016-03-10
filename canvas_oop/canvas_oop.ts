/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[bitmap.source];
        var title = imagePool[bitmap2.source];
//        if (image && title) {
            context.drawImage(image, 15, 15, 370, 220);
            context.drawImage(title, 120, 35, 150, 70);
 //       }

//        else {
//           context.font = "20px Arial";
//            context.fillStyle = '#000000';
//            context.fillText('错误的URL', 0, 20);
//        }
    }
}

class Rect extends DisplayObject {

    width = 100

    height = 80;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class cir extends DisplayObject {
    
    x = 0;
    y = 0;

    radius = 100

    startAngle = 0;
    
    endAngle = 360;
    
    
    strokeStyle = '#FFFFFF';

    color = '#FFFFFF';

    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        //context.fillStyle = this.color;
        context.lineWidth = 7;
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
        context.fillStyle = this.color;
        //context.fill();
        context.stroke();
        //context.lineWidth = 20;
        context.closePath();
    }
}

class Cirl extends DisplayObject {
    
    x = 0;
    y = 0;

    radius = 100

    startAngle = 0;
    
    endAngle = 360;
    
    
    strokeStyle = '#FFFFFF';

    color = '#FFFFFF';

    render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillStyle = this.color;
        context.lineWidth = 7;
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
        context.fill();
        //context.lineWidth = 20;
        context.closePath();
    }
}

class Cxt extends DisplayObject {


    color = '#31283b';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(190,130);
        context.lineTo(220,147);
        context.lineTo(190,164);
        context.closePath()
        context.fill();
    }
}

class TextField extends DisplayObject {

    render(context: CanvasRenderingContext2D) {
        context.font = "13px Arial";
        context.fillStyle = '#FFFFFF';
        context.fillText('(╯°□°）╯   Σ（ﾟдﾟﾉ)ﾉ)', 125, 215);
        context.font = "30px Arial";
        context.fillText('♬', 314, 200);
        context.fillText('❁', 38, 200);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


var rect = new Rect();
rect.width = 700;
rect.height = 250;
rect.color = '#000000'


var Cir1 = new cir();
Cir1.x = 100;
Cir1.y = 73;
Cir1.radius = 30;
//Cir1.color = '#ffc938'

var Cir2 = new cir();
Cir2.x = 30;
Cir2.y = 95;
Cir2.radius = 26;

var Cir3 = new cir();
Cir3.x = 170;
Cir3.y = 95;
Cir3.radius = 26;

var cirl = new Cirl();
cirl.x = 100;
cirl.y = 73;
cirl.radius = 30;
cirl.color = '#ffc938'

var cxt = new Cxt();


var text = new TextField();
text.x = 10;

var bitmap = new Bitmap();
bitmap.source = 'background-icon.jpg';

var bitmap2 = new Bitmap();
bitmap2.source = 'title-icon.png';

//渲染队列
var renderQueue = [rect, bitmap, text, cirl, Cir1, Cir2, Cir3, cxt];
//资源加载列表
var imageList = ['background-icon.jpg','title-icon.png'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


