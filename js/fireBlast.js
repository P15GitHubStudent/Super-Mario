
                

     function create_fire_group(){
            
            canShoot=false;
            firebonus=null;
            firebonus=game.add.group();
            firebonus.enableBody=true;
            map.createFromTiles(3,null,'fire','stuff',firebonus)
            firebonus.physicsBodyType=Phaser.Physics.ARCADE;
            firebonus.callAll('animations.add', 'animations', 'spinfire',
					[ 0, 1, 2, 3], 3, true);
            
            
			firebonus.callAll('animations.play', 'animations', 'spinfire');   
         
         
            fireshoots=game.add.group();
            fireshoots.enableBody=true;
            fireshoots.physicsBodyType=Phaser.Physics.ARCADE;
            fireshoots.setAll('anchor.x', 0.5);
            fireshoots.setAll('anchor.y',1);   
         
            bulletTime=0;
            updateBulletTime=0;
         
     }


    function pick_fireball(player,fireball){
        fireball.kill();
        canShoot=true;
        game.time.events.add(Phaser.Timer.SECOND * 5,function(){
           canShoot=false;
        });
        
    }

    
    //we need the code for the enemy destruction ! 
    function fire_shoots_enemy_overlap(fireball,enemie){
        enemie.kill();
        fireball.kill();
    }

    function fire_shoot_layer_overlap(fire,layer){
        fire.kill();
    }

     function handle_fire_collisions(enemiesGroup){
         
         game.physics.arcade.overlap(player, firebonus, pick_fireball);
         game.physics.arcade.overlap(fireshoots,enemiesGroup,fire_shoots_enemy_overlap);
     
     }


    function init_bullets(){
        
     for (var i = 0; i <100; i++)
    {
        var b = fireshoots.create(-1, -1, 'fire');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }    
        
    }
 


  function fireShootTerrain_Overlap(fireshoot){
      
      
      if(map.getTileWorldXY(fireshoot.x, fireshoot.y,16,16, "solid" )) 
      {
          resetBullet(fireshoot);
      }
  }


    function resetBullet(fireshoot){
        
        fireshoot.kill();        
    }


   
    function update_fireShoots(){
        
        //if(!canShoot)return;
        
       // if(updateBulletTime<game.time.now){

            var fireArray=fireshoots.children;
            var fireArrayLength=fireshoots.children.length;
            var cameraRect=game.camera.view; 
        
            for(var c=0;c<fireArrayLength;c++){
                
                 if(cameraRect.x+cameraRect.width<fireArray[c].x){
                     
                     resetBullet(fireArray[c]);
                   
               }
                else{
                    
                    fireShootTerrain_Overlap(fireArray[c]);
                }

                
              
                
            }
            
           // updateBulletTime=game.time.now+150;
        
        //}
        
    }

      
    function fire_shoot(){
        
        if(!canShoot)return;
        
             if(game.time.now > bulletTime){
            
            bullet=fireshoots.getFirstExists(false);
            
            if(bullet){
                
                bullet.reset(player.x+6,player.y-6);
                
                if(player.goesRight){
                     bullet.body.velocity.x=300;
                }
                else{
                    bullet.body.velocity.x=-300;
                }
                 
                bulletTime=bulletTime+250; //150
            }
            else{
                
            }
        
        
    }
        
    }




 //  firebonus=null;
    






   