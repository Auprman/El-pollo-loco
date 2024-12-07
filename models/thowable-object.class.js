class ThrowableObject extends MovableObject{

    speedX = 20;
    speedY = 30;
    bottle_break = new Audio('audio/bottle_hit.mp3')
    bottleUnbroken = true;
    throwableBottle = false;
    bottleSplashed = false;

    BOTTLE_IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    BOTTLE_IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y, throwableBottle) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png'); // TODO: continue here with displaying the different bottles 
        this.loadImages(this.BOTTLE_IMAGES_SPLASH);
        this.loadImages(this.BOTTLE_IMAGES_ROTATE);        
        this.throwableBottle = throwableBottle;
        this.x = x -60;
        this.y = y - 10;
        this.width = 60;
        this.height = 70;
        this.throwBottle();        
    }

    randomizeBottlePosition() {
        this.y = 120;
        this.x = Math.random() * 2000;
    }

    throwBottle() {
        if(this.throwableBottle){
            this.speedY = 10;
            this.applyGravity();        
            this.rotateBottle();
            let throwToOtherDirection = false;
            world.character.otherDirection ? throwToOtherDirection = true : null;            
            setInterval(() => {
                if(this.bottleUnbroken && !throwToOtherDirection){
                    this.x += 12 ;                                        
                }
                else if(this.bottleUnbroken && throwToOtherDirection){                    
                    this.x -= 12 ;
                }else{
                    this.x += 1;
                }
        },25)
        }
    }

    
    rotateBottle() {
            setInterval(() => {
                if (this.bottleUnbroken) {
                this.playAnimation(this.BOTTLE_IMAGES_ROTATE);
            }
            
        }, 60);
        
    }


    splashBottle() {
        setInterval(() => {
            if (true) {
                this.playAnimation(this.BOTTLE_IMAGES_SPLASH);        
            }     
    },50);
    // this.bottleSplashed = true;
}



}