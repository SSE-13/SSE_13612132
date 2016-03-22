module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;

    export class WorldMap extends DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
            

        }

        render(context: CanvasRenderingContext2D) {

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
                    context.fillStyle = '#FFFFFF';//棋盘                   
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
        }
    }


    export class BoyShape extends DisplayObject { //小球
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#FF0000';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {


        public run(grid) {
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            console.log(path);
            console.log(grid.toString());
        }

        public onTicker(duringTime) {
            if(this.x < 4* GRID_PIXEL_WIDTH && this.y < 4* GRID_PIXEL_HEIGHT){
                this.x += duringTime * this.vx;
                this.y += duringTime * this.vy;
            }
            else if(this.x < 5* GRID_PIXEL_WIDTH && this.y < 6* GRID_PIXEL_HEIGHT){
                this.y += duringTime * this.vy;
            }
            else if(this.x < 9* GRID_PIXEL_WIDTH && this.y < 7* GRID_PIXEL_HEIGHT){
                this.x += duringTime * this.vx;
            }
            else if(this.x < 10* GRID_PIXEL_WIDTH && this.y < 8* GRID_PIXEL_HEIGHT){
                this.x += duringTime * this.vx;
                this.y += duringTime * this.vy;
            }
            
        }
    }
}




var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);


var renderCore = new RenderCore();
renderCore.start([world, boyShape]);

var ticker = new Ticker();
ticker.start([body]);