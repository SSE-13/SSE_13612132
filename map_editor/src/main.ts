
import * as fs from 'fs';

    
function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}

function writeFile(){
    var map_path = __dirname + "/map.json"
    var json="{\"map\":"+JSON.stringify(mapData)+"}";
    fs.writeFileSync(map_path,json,"utf-8");
}

function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;

}



function onTileClick(tile: editor.Tile) {

    mapData[tile.ownedRow][tile.ownedCol]=mapData[tile.ownedRow][tile.ownedCol]?0:1;
    tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
  
}

var savebutton = new render.Bitmap();
savebutton.source = "save.png";
savebutton.x = 50;
savebutton.y = -200;

var SaveHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    if(localPoint.x>=0&&localPoint.x<=100&&localPoint.y>=0&&localPoint.y<=50)
    return true;
}

function Save() {
    writeFile();
}



var mapData = readFile();


var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();


var editor = createMapEditor();
renderCore.start(editor);
