class Endboss extends MovableObject {

    height = 300;
    width = 150;
    y = 140;
    hits = 0;
    isDead = false;
    characterWasInSight = false;
    endbossAnimationPlayed = false;
    endbossInRangeOfCharacter = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
     ];

     IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
     ];


     IMAGES_HURT = [
      'img/4_enemie_boss_chicken/4_hurt/G21.png',
      'img/4_enemie_boss_chicken/4_hurt/G22.png',
      'img/4_enemie_boss_chicken/4_hurt/G23.png'
     ];

     IMAGES_DIE = [
         'img/4_enemie_boss_chicken/5_dead/G24.png',
         'img/4_enemie_boss_chicken/5_dead/G25.png',
         'img/4_enemie_boss_chicken/5_dead/G26.png'
     ];

     IMAGES_ATTACK = [
      'img/4_enemie_boss_chicken/3_attack/G13.png',
      'img/4_enemie_boss_chicken/3_attack/G14.png',
      'img/4_enemie_boss_chicken/3_attack/G15.png',
      'img/4_enemie_boss_chicken/3_attack/G16.png',
      'img/4_enemie_boss_chicken/3_attack/G17.png',
      'img/4_enemie_boss_chicken/3_attack/G18.png',
      'img/4_enemie_boss_chicken/3_attack/G19.png',
      'img/4_enemie_boss_chicken/3_attack/G20.png'
     ];

     constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.speed = 0.15 + Math.random () * 0.5;
        this.x = 3 * 719;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DIE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
     }
     

     animate() {      
         setInterval(() => {
            this.characterInSight();
            if(this.characterWasInSight && !this.endbossAnimationPlayed){
               this.endbossAnimation();
               this.endbossAnimationPlayed = true;
            }
            if (this.isHurt()) {               
               this.playAnimation(this.IMAGES_HURT);
            }else if(!this.isHurt() && this.isDead){
               this.playAnimation(this.IMAGES_DIE); 
               this.y += 30;
               //Hier könnte man bei y= 800 das Ende einleiten...          
            }             
       }, 150)
    }
    
    
    dead() {
         if(this.hits >= 3){
         this.isDead = true;
      }else {
         this.hits++;
      }
   }


   characterInSight() {      
      if(world && world.character.x > 1570){
         this.characterWasInSight = true;        
      }
   }


   async endbossAnimation() {
      for (let cycles = 0; cycles < 100; cycles++) {
         await this.endbossWalk(2000);
         await this.endbossAlert(2000);
         await this.endbossAttack(1000);
      }
   }
   

   endbossWalk(duration) {
      return new Promise((resolve) => {
         this.speed = Math.random() * 20
          let intervalEndbossWalk = setInterval(() => {
              if (!this.isHurt() && !this.isDead) {
                  this.moveLeft();
                  this.playAnimation(this.IMAGES_WALKING);
              } else {
                  clearInterval(intervalEndbossWalk);
                  resolve(); 
              }
          }, 100);
          setTimeout(() => {
              clearInterval(intervalEndbossWalk);
              resolve();
          }, duration);
      });
  }


  endbossAlert(duration) {
   return new Promise((resolve) => {
       let intervalEndbossAlert = setInterval(() => {
           if (!this.isHurt() && !this.isDead) {
               this.playAnimation(this.IMAGES_ALERT);
           } else {
               clearInterval(intervalEndbossAlert);
               resolve(); 
           }
       }, 150);
       setTimeout(() => {
           clearInterval(intervalEndbossAlert);
           resolve();
       }, duration);
   });
}


endbossAttack(duration) {
   return new Promise((resolve) => {
       let intervalEndbossAttack = setInterval(() => {
           if (!this.isHurt() && !this.isDead) {
               this.playAnimation(this.IMAGES_ATTACK);
           } else {
               clearInterval(intervalEndbossAttack);
               resolve(); 
           }
       }, 150);
       setTimeout(() => {
           clearInterval(intervalEndbossAttack);
           resolve();
       }, duration);
   });
}
}
