
const PIRANAS_TILED_ID=4;
const PIRANA_PLANT='piranaPlant';

function pirana_preload(){
    this.game.load.atlasJSONHash('piranaPlant','assets/PiranaPlant.png','assets/PiranaPlant.json');
}

function init_piranas(){
		 piranaGroup=game.add.group();
		 piranaGroup.enableBody=true;
		
		 map.createFromTiles(PIRANAS_TILED_ID, null, 'piranaPlant', 'stuff', piranaGroup);

		piranaGroup.callAll('animations.add', 'animations', 'eat',['eat0','eat1'],2,true);	
		piranaGroup.callAll('animations.play','animations','eat');
		piranaGroup.setAll('anchor.x',-0.5);
		piranaGroup.setAll('body.velocity.y',5);
		piranaGroup.setAll('anchor.y',0);
	
		 var sprite=piranaGroup.children;

		 sprite.forEach(function(plant){
				game.physics.arcade.enable(plant);
				plant.body.enable=true;
				plant.goesDown=true;
				plant.initialYPos=plant.y;
				
			},this);

	}


function update_piranas(){
	
	//game.physics.arcade.overlap(player,piranaGroup,plantOverlap);

	var sprite=piranaGroup.children;

	sprite.forEach(function(plant){
		if(plant.y>plant.initialYPos+15){
			plant.body.velocity.y=-5;
		}else if(plant.y<=plant.initialYPos-6){
			game.physics.arcade.overlap(player,plant,plantOverlap);
			plant.alpha=1;
			plant.invisible=false;
			plant.body.velocity.y=0;
			game.time.events.add(Phaser.Timer.SECOND * (3+randInt(2))  , function(){            
					plant.body.velocity.y=5;
				});
		}
		if(plant.y>plant.initialYPos){
			plant.alpha=0;
		}
	}
	, this);
}





