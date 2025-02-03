class MovableObject extends DrawableObject {

    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.5;
    energy = 100;
    lastHit = 0;

/**
 * This function moves the object to the right
 */    
    moveRight() {
        this.x += this.speed;
    }

/**
 * This function moves the object to the left
 */
    moveLeft() {
           this.x -= this.speed;  
    }

/**
 * This function mirrors the image
 * 
 * @param {Element} ctx - the context
 */
    mirrorImage(ctx) {
            ctx.save();
            ctx.translate(this.width, 0)
            ctx.scale(-1, 1);
            this.x = this.x * -1;
    }

/**
 *  This function restores the image
 * 
 * @param {*} ctx - the context
 */
    restoreImage(ctx) {
        ctx.restore();
        this.x = this.x * - 1;
    }

/**
 *  This function plays the animation
 * 
 * @param {*} images - the images
 */
    playAnimation(images) {
        let i = this.currenImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currenImage ++;
    }

/**
 * This function applies gravity to the object
 */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            }
           
        }, 1000 / 60);
    }

/**
 * 
 * @returns {boolean} - returns true if the object is above the ground
 */
    isAboveGround() {      
            return this.y < 230;
    }
    
/**
 * This function makes the object jump
 */    
jump(){
    this.speedY = 10;
}

/**
 * This function checks if the object is dead
 * 
 * @param {*} mo - the object 
 * @param {*} offsetXmo - the offset X axis
 * @param {*} offsetYmo - the offset y axis
 * @returns 
 */
isColliding (mo, offsetXmo, offsetYmo) {
    let offsetX = 0;
    let offsetY = 0;
    if (offsetXmo && offsetYmo) {
        offsetX = offsetXmo;
        offsetY = offsetYmo;
    }
    return  this.x + this.width > mo.x + offsetX &&
            this.y + this. height > mo.y + offsetY &&
            this.x < mo.x + mo.width - offsetX &&
            this.y < mo.y + mo.height - offsetY
}

/**
 *  *  This function checks if the object is dead
 * 
 *  @returns {boolean} - returns true if the object is dead
 */
isDead() {
    return this.energy == 0;
}

/**
 *  *  This function checks if the object is hurt
 * 
 * @returns {boolean} - returns true if the object is hurt
 */
isHurt() {
    let timePassed = new Date().getTime() - this.lastHit ;
    timePassed = timePassed / 1000 ;
    return timePassed < 0.4 ;
}

/**
 * This function checks if the object is hurt
 */
hit() {
    this.energy -= 5;   
    if (this.energy < 0) {
        this.energy = 0;
    } else {
        this.lastHit = new Date().getTime();
    }    
    }

}


