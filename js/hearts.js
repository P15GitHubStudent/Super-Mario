     function draw_hearts(){
            
            pHearts=new Array(pMaxHearts);
            
            for(var c=0;c<playerhearts;c++){
                heart=game.add.sprite(10+c*15,0,'lives');
                pHearts[c]=heart;
                pHearts[c].fixedToCamera=true;
                pHearts[c].anchor.setTo(-0.5);
                
            }
            
        }


        function update_hearts(){
            
            if(playerhearts>5)
                playerhearts=5;
            
            for(var c=0;c<playerhearts;c++){
                pHearts[c].frame=2;
            }
            for(var c=playerhearts;c<pMaxHearts;c++){
                pHearts[c].frame=1;
            }
        }

