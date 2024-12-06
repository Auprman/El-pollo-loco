class Character extends MovableObject {
    height = 200;
    width = 100;
    x = 100;
    y = 230;
    //y default = 230;
    speed = 9;
    world;
    deadAnimationPlayed = false;

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

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    footstep_sound = new Audio('audio/footstep-dirt.mp3');
    jump_sound = new Audio('audio/jump1.mp3')


    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.animate();
        this.applyGravity();
        this.checkIfIdle()
    }
    
    animate() {
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight() ;              
                !this.isAboveGround() ? this.footstep_sound.play() : null;
                this.otherDirection = false;
            }
            if(this.world.keyboard.LEFT && this.x > this.world.level.level_start_x){
                this.moveLeft();
                !this.isAboveGround() ? this.footstep_sound.play() : null;
                this.otherDirection = true;
            }
            if(this.world.keyboard.SPACE && !this.isAboveGround()){
                this.jump();
                this.jump_sound.play();
            }
            this.world.camera_x = -this.x + 100 
        }, 1000 / 60);
       
        setInterval(() => {
            if(this.isDead() && !this.deadAnimationPlayed){
             this.playAnimation(this.IMAGES_DEAD);
             this.deadAnimationPlayed = true;  // Hier weiter mit der Sterbeanimation... Animation wird nicht komplett gezeigt....
            }else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            }else if(this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING);
            }else{
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                this.playAnimation(this.IMAGES_WALKING);
                }
            }            
        },1000 / 15);
    }
    
   checkIfIdle() {
    let lastX = this.x;
    let lastY = this.y;
    let idleTime = 0;
    setInterval(() => {  
        if (this.x === lastX && this.y === lastY) {
            idleTime += 200; 
            if (idleTime >= 6000 && idleTime <= 10000) {
                this.playAnimation(this.IMAGES_IDLE);
            }
            if(idleTime >= 10000){
                this.playAnimation(this.IMAGES_LONGIDLE);
            }
        } else {
            idleTime = 0; 
        }
        lastX = this.x;
        lastY = this.y;
    }, 200); 
}

}