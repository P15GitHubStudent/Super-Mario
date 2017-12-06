
function preload_princess(){
    this.levelEnded=false;
    this.game.load.atlasJSONHash('princess','assets/princessPeach/princess.png','assets/princessPeach/princess.json');
    this.princessSpawned=false;
}

function init_princess(posx,posy){
    if(this.princessSpawned)return;
    this.princessSpawned=true;
    princess=game.add.sprite(posx,posy,'princess');
    game.physics.arcade.enable(princess);
    princess.body.velocity.x=-20;
    princess.animations.add('wink',['winking1','winking2','winking1','winking2','walking2'],1,false);
    princess.animations.add('kiss',Phaser.Animation.generateFrameNames('kiss',1,4),1,false);
    princess.animations.play('wink');
    princess.frame=6;
    princess.kissed=false;
    princess.anchor.setTo(0.5);
    princess.y=princess.y-5;
}

function update_princess(){
    if(!levelEnded)return;
    if(!princess.kissed){
        game.physics.arcade.overlap(player, princess, function(mplayer,mprincess){
            mprincess.body.velocity.x=0;
            princess.animations.play('kiss');
            princess.kissed=true;
            game.camera.fade('#000000');
            game.camera.onFadeComplete.addOnce(function () {
                levelEnded=false;
                game.state.start(PLAY_STATE,true, false,1);
            }, this);
        });
    }
}

