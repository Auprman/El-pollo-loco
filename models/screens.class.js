class Screen extends DrawableObject {
    startScreenLoaded = true;
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    startScreen = 'img/9_intro_outro_screens/start/startscreen_1.png' //TODO: Continue here... Startscreen should load here and should be removed at click


    constructor() {
        super().loadImage(this.startScreen);
        
    }

}