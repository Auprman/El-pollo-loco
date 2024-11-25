class ThrowableObject extends MovableObject{

    speedX = 20;
    speedY = 30;

    BOTTLE_IMAGES = [

    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x -60;
        this.y = y - 10;
        this.width = 60;
        this.height = 70;
        this.throwBottle()
    }
    throwBottle() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += 7 ;
        },25)
    }

}