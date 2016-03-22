var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var GRID_PIXEL_WIDTH = 50;
    var GRID_PIXEL_HEIGHT = 50;
    var NUM_ROWS = 12;
    var NUM_COLS = 12;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
        }
        WorldMap.prototype.render = function (context) {
            //var draw = new astar.Grid(NUM_COLS, NUM_ROWS);
            //this.grid = draw;
            //context.fillStyle = '#FFFFFF';//棋盘
            context.strokeStyle = '#FF0000'; //格
            context.beginPath();
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                    context.fill();
                    context.stroke();
                    //if()
                    context.fillStyle = '#FFFFFF'; //棋盘                   
                }
            }
            for (var j = 0; j < 6; j++) {
                //context.fillStyle = '#00FFFF';//棋盘
                context.fillStyle = '#000000';
                context.fillRect(5 * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                //context.fillStyle = '#000000';//棋盘
                context.stroke();
            }
            context.closePath();
        };
        return WorldMap;
    }(DisplayObject));
    game.WorldMap = WorldMap;
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.apply(this, arguments);
        }
        BoyShape.prototype.render = function (context) {
            context.beginPath();
            context.fillStyle = '#FF0000';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        };
        return BoyShape;
    }(DisplayObject));
    game.BoyShape = BoyShape;
    var BoyBody = (function (_super) {
        __extends(BoyBody, _super);
        function BoyBody() {
            _super.apply(this, arguments);
        }
        BoyBody.prototype.run = function (grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            console.log(path);
            console.log(grid.toString());
        };
        BoyBody.prototype.onTicker = function (duringTime) {
            if (this.x < 4 * GRID_PIXEL_WIDTH && this.y < 4 * GRID_PIXEL_HEIGHT) {
                this.x += duringTime * this.vx;
                this.y += duringTime * this.vy;
            }
            else if (this.x < 5 * GRID_PIXEL_WIDTH && this.y < 6 * GRID_PIXEL_HEIGHT) {
                this.y += duringTime * this.vy;
            }
            else if (this.x < 9 * GRID_PIXEL_WIDTH && this.y < 7 * GRID_PIXEL_HEIGHT) {
                this.x += duringTime * this.vx;
            }
            else if (this.x < 10 * GRID_PIXEL_WIDTH && this.y < 8 * GRID_PIXEL_HEIGHT) {
                this.x += duringTime * this.vx;
                this.y += duringTime * this.vy;
            }
        };
        return BoyBody;
    }(Body));
    game.BoyBody = BoyBody;
})(game || (game = {}));
var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);
var renderCore = new RenderCore();
renderCore.start([world, boyShape]);
var ticker = new Ticker();
ticker.start([body]);
