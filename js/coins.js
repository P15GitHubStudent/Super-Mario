

    function preload_coins(){    
        	game.load.spritesheet('coin', 'assets/Full Coins.png', 16, 16);
    }

    function init_coins(){
        
            coins = game.add.group();
        
			coins.enableBody = true;
        
            map.createFromTiles(2,null,'coin','stuff',coins);
            
        	coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 1, 2, 3 ,4,5,6,7,8,9], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');
        
            coin=game.add.sprite(130,0,'coin');
            
            coinSpin=coin.animations.add('spin');
            
            coin.animations.play('spin',3,true);
            
            coin.fixedToCamera=true;
    }

    function update_coins(){
    }
