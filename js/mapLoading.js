
var mapNames=['super_mario_map','super_mario_map3','super_maio_map4'];
const TILE_WIDTH=16;
const TILE_HEIGHT=16;

//apla fortonoei ena map apo to paixnidi mas ! 
function LoadLevel(lvl){
    this.game.load.tilemap('level', 'assets/'+mapNames[lvl]+'.json', null,
    Phaser.Tilemap.TILED_JSON);
}

//kanei restart to game mas :D mporei na mou parsousiasi problima alla tha doume !
function RestartGame(){ 
    this.game.state.start(PLAY_STATE,true,false,PlayState.prototype.getLevel());//start->restart
}

//fortonei to epomeno level tou paixnidiou mas !
function loadNextMap(){
    this.game.state.start(PLAY_STATE,true,false,PlayState.prototype.getNextLevel());
}

/*
dimiourgei to tilemap mas
orizei me poia tiles tou solid mporoume na kanoume collide!
dimiourgei ta layers mas einai 3 (solid,background,stuff,teleport)
*/
//3-12  7 24
function createMap(lvl){
    this.map =this.game.add.tilemap('level');
    this.map.addTilesetImage('tiles', 'tiles');
    this.map.setCollisionBetween(7, 24, true, 'solid');
    this.layer = map.createLayer('solid');
    this.layer.resizeWorld();
    this.map.createLayer('background');

}