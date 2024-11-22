class Character extends MovableObject {
    height = 200;
    x = 100;
    y = 230;
    speed = 9;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ]

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING)
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < 3 * 719){
                this.x += this.speed;
                this.otherDirection = false;
            }

            this.world.camera_x = -this.x +100 
        
            if(this.world.keyboard.LEFT && this.x > -619){
                this.x -= this.speed;
                this.otherDirection = true;
            }    
        }, 1000 / 60);
       
        setInterval(() => {
            //Walk animation
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                let i = this.currenImage % this.IMAGES_WALKING.length;
                let path =  this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currenImage ++;
            }
        },1000 / 30);
    }
    

    
    jump(){
       
    }
}