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
    speedY = 0;
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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    mirrorImage(ctx) {
            ctx.save();
            ctx.translate(this.width, 0)
            ctx.scale(-1, 1);
            this.x = this.x * -1;
    }

    restoreImage(ctx) {
        ctx.restore();
        this.x = this.x * - 1;
    }

    playAnimation(images) {
        let i = this.currenImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currenImage ++;
    }

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0)
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 60);
    }

    isAboveGround() {
        return this.y < 230;
    }
    
    
    jump(){
        this.speedY = 10;
    }
}