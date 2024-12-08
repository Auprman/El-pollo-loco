class Chicken extends MovableObject{
   height = 80;
   width = 80;
   y = 350;
   otherDirection  = false;
   test  = 0;
   allIntervals = [];

   IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
   ];

   IMAGES_DEAD = [
      'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
   ]

   isDead = false;

 constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
    this.speed = 0.15 + Math.random () * 0.5;
    this.x = 200 + Math.random() * 1500
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);   
    this.animate();
 }
 
 animate() {
   setInterval(() => {
      if (!this.isDead) {
         this.moveLeft();
      }
      
   }, 1000 / 60);

   setInterval(() => {
      if (!this.isDead) {
         this.playAnimation(this.IMAGES_WALKING);   
      }
   }, 100);
}


dead() {
   this.isDead = true;
   this.loadImage(this.IMAGES_DEAD[0])
}
}