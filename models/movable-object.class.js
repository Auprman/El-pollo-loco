class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currenImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedy = 0;
    acceleration = 0.5;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {

        arr.forEach(path => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
     });
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        let i = this.currenImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currenImage ++;
    }

    isAboveGround() {
        return this.y < 230;
    }

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround())
            this.y -= this.speedy;
            this.speedy -= this.acceleration;
        }, 1000 / 60);
    }

}