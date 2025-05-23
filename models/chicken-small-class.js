class ChickenSmall extends MovableObject{
    height = 50;
    width = 50;
    y = 380;
    otherDirection  = false;
    test  = 0;
    allIntervals = [];
    isDead = false; 
    lastJump = new Date().getTime();

    IMAGES_WALKING = [
       'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
       'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
       'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
 
    IMAGES_DEAD = [
       'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
 
    
 
  constructor() {
     super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
     this.speed = 0.15 + Math.random () * 0.5;
     this.x = 200 + Math.random() * 1500
     this.loadImages(this.IMAGES_WALKING);
     this.loadImages(this.IMAGES_DEAD); 
  }
/**
 * This function animates the chicken
 */  
  animate() {
    this.applyGravity();
    this.chickenMoveLeftAnimation();
    this.chickenWalkingAnimation();
 }
 
/**
 * This function kills the chicken
 */ 
 dead() {
    this.isDead = true;
    this.loadImage(this.IMAGES_DEAD[0])
 }
 
 /**
  * This function moves the chicken to the left
  */
 chickenMoveLeftAnimation() {
    let chickenMoveLeft = setInterval(() => {
       if (!this.isDead) {
          this.moveLeft();
       }
    }, 1000 / 60);
    this.allIntervals.push(this.saveInterval('chickenMoveLeft', chickenMoveLeft))
 }
 
 /**
  * This function animates the chicken walking
  */
 chickenWalkingAnimation() {
    let chickenWalkingAnimation = setInterval(() => {
       if (!this.isDead) {
          this.playAnimation(this.IMAGES_WALKING);
          this.smallChickenJump();   
       }
    }, 100);
    this.allIntervals.push(this.saveInterval('chickenWalkingAnimation', chickenWalkingAnimation))
 }
 
 /**
  *   This function stops the intervals
  */
 stopAllIntervals() {
    this.allIntervals.forEach((interval) => {
       clearInterval(interval.intervalNumber);
    })
 }

 /**
  *  This function checks if the chicken is above the ground
  * 
  * @returns boolean - true if the chicken is above the ground
  */

 isAboveGround() {      
    return this.y < 380;
}

/**
 * This function makes the chicken jump
 */
 smallChickenJump() {
    let jump = new Date().getTime();
    if(this.chickenCanJump(jump)){        
        this.speedY = 7;
        this.lastJump = new Date().getTime();
    }
 }
 
 /**
  * 
  * @param {*} jump  - the time of the jump
  * @returns 
  */
 chickenCanJump(jump){
    return jump - this.lastJump > Math.random() * 40000 && !this.isAboveGround()
 }

 }