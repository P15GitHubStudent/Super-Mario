

	function coinOverlap(player, coin) {
            score+=1;
            gameText.text=score;
            SCoin.play();
			coin.kill();   
        }

    function plantOverlap(player,plant){
        hurtplayer();
    }

    function ghostOverlap(player,ghost){

        hurtplayer();   
        //ghost.animations.play('dead');
        makeEntityFall(ghost);
        ghost.body.enable=false;
        ghost.animations.play('dead').onComplete.addOnce(function () {
            ghost.kill();
        }, this);
    }

   function  ShroomOverlap(player,shroom){
       score+=30;
       gameText.text=score;
       playerhearts++;
       if(playerhearts>MAX_PLAYER_HEARTS){
           playerhearts=MAX_PLAYER_HEARTS;
       }
       
       shroom.kill();
   }        

 function makeEntityFall(entity){
    entity.body.checkCollision.up = false;
    entity.body.checkCollision.down = false;
    entity.body.checkCollision.right=false;
    entity.body.checkCollision.left=false;
 }
 

function hurtplayer(){

    if(levelEnded){
        return;
    }

    if(hurtable){
        
        player.frame = 6;
        player.animations.stop();
        playerhearts-=1;
        if(playerhearts<0)playerhearts=0;
       
        
        player.alpha=0.5;
    
        
        var pushBack=800;
        
        game.time.events.add(Phaser.Timer.SECOND/3,function(){
            
             player.body.velocity.x+=player.goesRight ? -pushBack:pushBack;
        
        });
        
        game.time.events.add(Phaser.Timer.SECOND , function(){
            
             player.alpha=1;
        
            if (playerhearts<=0){
                    player.body.enable = false;
                    game.paused=true;
                    
                 }
    
          hurtable=true;
       
    });
     
        
        hurtable=false;
    
    }
}

function goombaOverlap(player, goomba) {
            
			if (player.body.touching.down && hurtable) {
                
                    goomba.animations.stop();
                    
                    goomba.frame = 2;
                    
                    player.body.velocity.y = -80;
                    
                     Sstomp.play();
                
                    makeEntityFall(goomba);
                
                    addBonus();

                    game.time.events.add(Phaser.Timer.SECOND * 3 , function() {
                        
                        goomba.kill();             
                        
                        });
                
			} else {
                           
			hurtplayer();
		}
    }