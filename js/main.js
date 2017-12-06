/*
MAIN.js
DHMIOURGIA TON STATE MAS KAI KSEKINIMA  TOU PRELOADER STATE 
O PRELOADER STATE ANALAMBANEI NA FORTOSEI TOUS POROUS GIA EMAS KATI SAN SOUND,TEXTURE MANAGER!
*/
  
        //KATHOLIKES METABLITES EDO !
        var playerBonus=false;
        const PLAY_STATE='PlayState';
        const PRELOAD_STATE='PreloadState';
        const MENU_STATE='MenuState';
        const SELECT_MAP_STATE='selectMapState';



	    var game = new Phaser.Game(800,600, Phaser.CANVAS, '');
        game.state.add('PlayState',PlayState);
        game.state.add('PreloadState',PreloadState);
        game.state.add('MenuState',MenuState);
        game.state.add('selectMapState',selectMapState);
        game.state.start('PreloadState'); 
