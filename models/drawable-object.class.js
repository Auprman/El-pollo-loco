class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currenImage = 0;
    errorShown = false;

    

    constructor() {
    }
    /**
     * This function draws a frame around the object
     * 
     * @param {element} ctx - canvas context
     */
    drawFrame(ctx) {
        if (movableInstance()) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

/**
 * This function checks if the object is an instance of Character, Chicken, Endboss, ThrowableObject or ChickenSmall
 * 
 * @returns {boolean} - returns true if the object is an instance of Character, Chicken, Endboss, ThrowableObject or ChickenSmall
 */
    movableInstance() {
        return     this instanceof Character 
                || this instanceof Chicken 
                || this instanceof Endboss 
                ||  this instanceof ThrowableObject 
                || this instanceof ChickenSmall
    }

/**
 *  This function loads the images
 * 
 * @param {Array} arr 
 */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

/**
 *  This function draws the image
 * 
 * @param {element} ctx 
 */
    draw(ctx) {
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
        } catch (error){            
            if(!this.errorShown){
                console.log('Error loading image', error);
                console.log('Could not load image', this.img, this);
            }
            errorShown = true;
        }        
    }

/**
 *  This function loads the image
 * 
 * @param {*} path - the path of the image
 */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
/**
 *  This function saves the interval
 * 
 * @param {*} animationName - the name of the animation
 * @param {*} interval - the interval
 * @returns 
 */
    saveInterval(animationName, interval) {
        return  {
                animationName : animationName,
                intervalNumber : interval 
                }
    }
/**
 * This function stops the intervals
 */
    stopAllIntervals() {
        this.allIntervals.forEach((interval) => {
           clearInterval(interval.intervalNumber);
        })
     }
     

    

}

