var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
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
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 80;
        this.color = '#FF0000';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var cir = (function (_super) {
    __extends(cir, _super);
    function cir() {
        _super.apply(this, arguments);
        this.x = 0;
        this.y = 0;
        this.radius = 100;
        this.startAngle = 0;
        this.endAngle = 360;
        this.strokeStyle = '#FFFFFF';
        this.color = '#FFFFFF';
    }
    cir.prototype.render = function (context) {
        context.beginPath();
        //context.fillStyle = this.color;
        context.lineWidth = 7;
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
        context.fillStyle = this.color;
        //context.fill();
        context.stroke();
        //context.lineWidth = 20;
        context.closePath();
    };
    return cir;
}(DisplayObject));
var Cirl = (function (_super) {
    __extends(Cirl, _super);
    function Cirl() {
        _super.apply(this, arguments);
        this.x = 0;
        this.y = 0;
        this.radius = 100;
        this.startAngle = 0;
        this.endAngle = 360;
        this.strokeStyle = '#FFFFFF';
        this.color = '#FFFFFF';
    }
    Cirl.prototype.render = function (context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.lineWidth = 7;
        context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
        context.fill();
        //context.lineWidth = 20;
        context.closePath();
    };
    return Cirl;
}(DisplayObject));
var Cxt = (function (_super) {
    __extends(Cxt, _super);
    function Cxt() {
        _super.apply(this, arguments);
        this.color = '#31283b';
    }
    Cxt.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(190, 130);
        context.lineTo(220, 147);
        context.lineTo(190, 164);
        context.closePath();
        context.fill();
    };
    return Cxt;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
    }
    TextField.prototype.render = function (context) {
        context.font = "13px Arial";
        context.fillStyle = '#FFFFFF';
        context.fillText('(╯°□°）╯   Σ（ﾟдﾟﾉ)ﾉ)', 125, 215);
        context.font = "30px Arial";
        context.fillText('♬', 314, 200);
        context.fillText('❁', 38, 200);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
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
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var rect = new Rect();
rect.width = 700;
rect.height = 250;
rect.color = '#000000';
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
cirl.color = '#ffc938';
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
var imageList = ['background-icon.jpg', 'title-icon.png'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
