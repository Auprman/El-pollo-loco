class Screen extends DrawableObject {
    startScreenLoaded = true;
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    startScreen = 'img/9_intro_outro_screens/start/startscreen_1.png' ;
    gameOverScreen = 'img/9_intro_outro_screens/game_over/game over!.png';
    youWinScreen = 'img/9_intro_outro_screens/win/win_2.png';
    fadeInStarted = false;

    constructor(x, y, screen) {
        super().loadImage('img/9_intro_outro_screens/start/startscreen_1.png');
        this.loadScreen(screen)  
        this.x = x;
        this.y = y;
    }
    /**
     * This function loads the screen that should be displayed
     * 
     * @param {*} screen - the screen that should be loaded
     */
    loadScreen(screen) {
        screen == 'start' ? this.loadImage(this.startScreen) : null;
        screen == 'game over' ? this.loadImage(this.gameOverScreen): null;
        screen == 'win' ? this.loadImage(this.youWinScreen): null ;
    }

    /**
     *  This function fades in the screen that should be displayed
     * 
     * @param {*} screenNumber - the screen that should be displayed
     */
    fadeIn(screenNumber) {       
        let screen = world.level.screen[screenNumber]
        if (!this.fadeInStarted) {           
            this.fadeInStarted = true;
            screen.width = 0;
            screen.height = 0;
            const screenWidth = 480; 
            const screenHeight = 400; 
            const startX = world.character.x + 240 ; 
            const startY = 240    
            let fadeInInterval = this.expandImage(screen, screenWidth, screenHeight, startX, startY) ;
            if (screen.width >= screenWidth && screen.height >= screenHeight) {
                clearInterval(fadeInInterval);
            }
        }
    }

    /**
     * This function expands the screen that should be displayed
     * 
     * @param {*} screen - the screen that should be displayed
     * @param {*} screenWidth - the width of the screen
     * @param {*} screenHeight - the height of the screen
     * @param {*} startX - the x-coordinate of the screen
     * @param {*} startY - the y-coordinate of the screen
     */
    expandImage(screen, screenWidth, screenHeight, startX, startY) {
        setInterval(() => {
            if (screen.width < screenWidth) {
                screen.width+= screenWidth / 100 * 7;
                screen.x = startX - screen.width / 2;
            }
            if (screen.height < screenHeight) {
                screen.height+= screenHeight / 100 * 7;
                screen.y = startY - screen.height / 2; 
            }
        }, 10);
    }
}