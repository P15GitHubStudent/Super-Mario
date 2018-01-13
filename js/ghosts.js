const GHOST_ID = 18;

function preload_ghost() {
    this.game.load.atlasJSONHash('ghost', 'assets/ghosts/ghosts.png', 'assets/ghosts/ghosts.json');
}


function init_ghosts() {

    ghosts = game.add.group();
    ghosts.enableBody = true;
    map.createFromTiles(GHOST_ID, null, 'ghost', 'stuff', ghosts);
    ghosts.callAll('animations.add', 'animations', 'walk', ['walk1', 'walk2']);
    ghosts.callAll('animations.add','animations','dead',['dead1','dead2'],3,false);
    ghosts.callAll('animations.play', 'animations', 'walk', 1, true);
    
    var ghostsSprites=ghosts.children;

    ghostsSprites.forEach(function (ghost) {
        game.physics.arcade.enable(ghost);
        ghost.body.enable=true;
        ghost.body.velocity.x=(randInt(2)==1) ? -40:40;
        ghost.state='moving'; 
    },
    this);

}

function update_ghosts(){

    var ghostsSprites = ghosts.children; 

    ghostsSprites.forEach(function (ghost) {

        if (game.physics.arcade.distanceBetween(ghost, player) <= 40) {
            ghost.state='Chasing';
            game.physics.arcade.moveToObject(ghost, player,10);
        }
        else{
            if(ghost.state=='Chasing'){

            }   
        }
        ////////////////////////////////////////////////////////////////////////////////
        if(ghost.x<0){
            ghost.body.velocity.x=-ghost.body.velocity.x;
            ghost.x+=10;
        }
         if(ghost.y<=0){
            ghost.body.velocity.y=-ghost.body.velocity.y;
            ghost.y+=10;
         }
         else if(ghost.y>=800){
            ghost.body.velocity.y=-ghost.body.velocity.y;
            ghost.y-=10;
         }

        ///////////////////////////////////////////////////////////////////////////////
        
        game.physics.arcade.overlap(player,ghost,ghostOverlap);

    }
        , this);
}
