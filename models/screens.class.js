class Screen extends DrawableObject {
    startScreenLoaded = true;
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    startScreen = 'img/9_intro_outro_screens/start/startscreen_1.png' ;
    gameOverScreen = 'img/9_intro_outro_screens/game_over/game over!.png';
    youWinScreen = 'img/9_intro_outro_screens/win/win_2.png';


    constructor() {
        super().loadImage(this.startScreen);        
    }

}