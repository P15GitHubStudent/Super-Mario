

var PreloadState={

    preload:function(){
    
              preload_Player();
              
              preload_Fire();
            
              preload_coins();
        
            game.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
        
            
            game.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
            
            game.load.spritesheet('heart','assets/lives.png'); 
            
            //φόρτωση ηχων/μουσικής
            
            game.load.audio('GMusic',['audio/bgm.mp3','audio/bgm.ogg']);
            
            game.load.audio('SCoin','audio/coin.wav');
            
            game.load.audio('Sjump','audio/jump.wav');
            
            game.load.audio('Sstomp','audio/stomp.wav');
            
            game.load.spritesheet('lives','assets/lives.png',9,8); 

            game.load.image('marioBG', 'assets/cloudBG.jpeg');

            game.load.image('redButton','assets/redButton.png');

           // game.load.spritesheet('lockedLevel','assets/lockedLevel.png',280,64);

           game.load.spritesheet('levels','assets/levels.png',64,64);

            game.load.image('Background','assets/background.png');

            game.load.image('plantSighn','assets/plantwarning.png');

            game.load.image('inviWall','assets/invisible_wall2.png');

            questionBlock_preload();

            shroom_preload();

            pirana_preload();

            preload_ghost();

            preload_princess();
    }
    ,
    create:function(){

        Phaser.Canvas.setImageRenderingCrisp(game.canvas);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        cursors = game.input.keyboard.createCursorKeys();
        game.state.start(MENU_STATE);
    }
    ,
    update:function(){
        
    }

};