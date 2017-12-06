const endOfLvlID=51;
const inviWallsID=5;

function init_invisibleWalls(){

    inviWalls=game.add.group();
    inviWalls.enableBody=true;
    map.createFromTiles(inviWallsID,null,'inviWall','stuff',inviWalls);
    inviWalls.alpha=0.01;
    
    endOfLvl=game.add.group();
    endOfLvl.enableBody=true;
    map.createFromTiles(endOfLvlID,null,'inviWall','stuff',endOfLvl);
    endOfLvl.alpha=0.01;
}

