class Chicken extends MovableObject{
   height = 80;
   width = 80;
   y = 350;
   otherDirection  = false;
   

   IMAGES_WALKING = [
      'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
   ];

 constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
    this.speed = 0.15 + Math.random () * 0.5;
    this.x = 200 + Math.random() * 500
    this.loadImages(this.IMAGES_WALKING)    
    this.animate();
 }
 
 animate() {
   setInterval(() => {
      this.moveLeft();
   }, 1000 / 60);

   setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
   }, 100);
}

}