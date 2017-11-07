/*
Destroying sprite
sprite.destroy()
game.camera.view
player.inCamera
*/



    var res={Width:256,Height:240};
    
	var game = new Phaser.Game(res.Width, res.Height, Phaser.CANVAS, '', {
			preload : preload,
			create : create,
			update : update
		}, false, false);


 
    var mapNames=['super_mario_map','Mario_Snow_Map','super_mario_map2'];
    var currentMapIndex=2;
    var hurtable=true;
    const pMaxHearts=5;
    var playerBonus=false;



    function preload() {
        
            //φόρτωση Sprites/JSON Hashes 
            
			this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
			this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
            
            //φορτώνουμε τον παίκτη μας με JSON Hash γιατι δεν εχει stand μέγεθος τα  frames !!
            game.load.atlasJSONHash('Allien','assets/Allien.png','assets/Allien.json');
        
                
            //////////////////////Αλλαγή στα κέρματα εδώ ///////////////////////////////////////
			this.load.spritesheet('coin', 'assets/Full Coins.png', 16, 16);
           
            
            this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
        
			this.load.tilemap('level', 'assets/'+mapNames[currentMapIndex]+'.json', null,
					Phaser.Tilemap.TILED_JSON);
            
           this.load.spritesheet('heart','assets/lives.png'); 
            
            //φόρτωση ηχων/μουσικής
            
            game.load.audio('GMusic',['audio/bgm.mp3','audio/bgm.ogg']);
            
            game.load.audio('SCoin','audio/coin.wav');
            
            game.load.audio('Sjump','audio/jump.wav');
            
            game.load.audio('Sstomp','audio/stomp.wav');
            
            this.load.spritesheet('lives','assets/lives.png',9,8); 
            
        
            this.load.spritesheet('fire','assets/fire.png',8,8);
        
           questionBlock_preload();
            
		}   


    var Direction={right:1,left:-1};


    function getDir(){
        return player.goesRight ? Direction.right : Direction.left;
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////


    
    	function create() {
            
            score=0;
            gameText=null;
            gameMusic=null;
            playerhearts=5;
            playershots=0;
            allowSpaceBar=true;
            
			Phaser.Canvas.setImageRenderingCrisp(game.canvas);
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			game.stage.backgroundColor = '#5c94fc';
            
            
			map = game.add.tilemap('level');
            
            //collision με το layer "solid" θα ξεκινίσει απο το tile με id 3 - 12 το κάθε tile στην πίστα μας είναι 16χ16 αρα το το tile με id0 θα είναι το 0x0 το tile με id 1 θα είναι το 16χ16 κ.ο.κ 
			map.setCollisionBetween(3, 12, true, 'solid');
            
            
            map.addTilesetImage('tiles','tiles');
           

			map.createLayer('background');

			layer= map.createLayer('solid');
            
			layer.resizeWorld(); //κάνει resize τον κόσμο μας οταν ο παίκτις βγεί απο τα ορια της πίστας ! 
            

            //προσθήκη των κερμάτων,εχθρών σε groups οπου μαζικά δημιουργουμε,καλούμε animations και κουνούμε τους αντιπάλους
            // η μέθοδος createFromTiles είναι σημαντική γιατί δημιουργεί τα entities στην θέση που είχαμε κάνει specify στο tiled
            
			coins = game.add.group();
			coins.enableBody = true;
    
            
            
            
            
            map.createFromTiles(1,null,'coin','stuff',coins);

            
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 1, 2, 3 ,4,5,6,7,8,9], 3, true);
            
            
			coins.callAll('animations.play', 'animations', 'spin');
        
			goombas = game.add.group();
			goombas.enableBody = true;
            
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
            
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);

            
            create_fire_group();
            
            
            questionBlock_init();
            
            
            
             // Παλλίος Mario εδώ
                // player = game.add.sprite(16, game.world.height - 48, 'mario');
            
            
            //καινούργιος παίκτης μας εδώ 
            player=game.add.sprite(16,game.world.height-48,'Allien','p3_stand.png');
            player.scale.setTo(0.2); //τον μικραίνουμε
            player.anchor.setTo(0.5);  //και θέτουμε το origin στο κέντρο πάικτη 

            
            
            
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
            
            
            
            
            //Commented code here 
			//player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			//player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
            

            
            player.animations.add('walkRight',Phaser.Animation.generateFrameNames(1,11),10,true);
            
			player.goesRight = true;
            
			game.camera.follow(player);
        

			cursors = game.input.keyboard.createCursorKeys();
            
            
            gameMusic=game.add.audio('GMusic');
            
            gameMusic.loop=true;
            
            gameMusic.play();
          
            SCoin=game.add.audio('SCoin',0.3,false);   
            
            Sjump=game.add.audio('Sjump',0.2,false);
            
            Sstomp=game.add.audio('Sstomp',0.3,false);
            
            draw_hearts();
            
            
            
              gameText=game.add.text(147,0,'0',{ fontSize: '11px', fill: '#ff1' });
            
              gameText.fixedToCamera=true; 
            
            
             coin=game.add.sprite(130,0,'coin');
            
             coinSpin=coin.animations.add('spin');
            
             coin.animations.play('spin',3,true);
            
             coin.fixedToCamera=true;
            
            //init our player fire bullets here 
            init_bullets();
                
            init_questionBlock();
            
                
		}   




        function player_events(){
            
            if (player.body.enable) {
				player.body.velocity.x = 0;
                
				if (cursors.left.isDown) {
					//player.animations.play('walkLeft');
                    player.animations.play('walkRight');
					player.goesRight = false;
                    player.scale.setTo(-0.2,0.2);
                    player.body.velocity.x = -90;
                    
				} else if (cursors.right.isDown) {

					player.animations.play('walkRight');
					player.goesRight = true;
                    player.scale.setTo(0.2,0.2);
                    player.body.velocity.x = 90;
                    
				}
                
                else {
					player.animations.stop();
					if (player.goesRight){
                        player.frame = 0;
                        player.scale.setTo(0.2,0.2);
                    }
				  
				     else 
                         {
                            player.frame = 7;
                            player.scale.setTo(-0.2,0.2);
                         }
						
                }

				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
					player.animations.stop();
                    Sjump.play();
                    
				}

    
				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
            
        }

        function pickFireball(player,fire){
            fire.kill();
        }   


		function update(){   
            
            game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
            game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
            
             if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                  fire_shoot();
            }

            update_fireShoots();
            
            handle_fire_collisions(goombas);
              
            update_hearts();
    
            player_events();
            
            update_questionBlock();
            
		}


		function coinOverlap(player, coin) {
            score+=1;
            gameText.text=score;
            SCoin.play();
			coin.kill();
            
        }


            
            function goombaOverlap(player, goomba) {
            
			if (player.body.touching.down && hurtable) {
                              
				goomba.animations.stop();
				goomba.frame = 2;
				player.body.velocity.y = -80;
                Sstomp.play();
                goomba.body.checkCollision.up = false;
	            goomba.body.checkCollision.down = false;
                goomba.body.checkCollision.right=false;
                goomba.body.checkCollision.left=false;
                
                
                    addBonus();
                
                
				    game.time.events.add(Phaser.Timer.SECOND * 3 , function() {
                    
				    goomba.kill(); 
                    
				});
                
			} else {
                
                if(hurtable){
                    
                    player.frame = 6;
                    player.animations.stop();
                    playerhearts-=1;
                    if(playerhearts<0)playerhearts=0;
                   
                    
                    player.alpha=0.5;
                  
                    
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
            
                
			
		}

const QUESTION_BLOCK='questionBlock';

function questionBlock_preload(){
     this.game.load.atlasJSONHash('questionBlock','assets/QuestionBlock.png','assets/QuestionBlock.json');
}


function questionBlock_init(){

    questionGroup=game.add.group();
    questionGroup.enableBody=true;

    map.createFromTiles(9, null, 'questionBlock', 'stuff', questionGroup);
    
    questionGroup.callAll('animations.add', 'animations', 'flash',Phaser.Animation.generateFrameNames('questionBlock',1,3),
             2, true);

             questionGroup.callAll('animations.play','animations','flash');
}

function update_questionBlock(){

}


