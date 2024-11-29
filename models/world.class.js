class World {

    character = new Character();
    statusBarHealth = new StatusBar(0, 10, 'health');
    statusBarCoins = new StatusBar(0, 50, 'coins');
    statusBarBottles = new StatusBar(0, 90, 'bottles');
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObject = []; 

    constructor(canvas, keyboard) {
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.setStatusBarImages()        
}

setStatusBarImages() {        
        this.statusBarHealth.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_HEALTH[0])
        this.statusBarCoins.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_COINS[0])
        this.statusBarBottles.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_BOTTLES[0])      
}

    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisions();
        }, 200);
    }

    setWorld() {
        this.character.world = this;
        this.statusBarBottles.world = this;
        this.statusBarCoins.world = this;
        this.statusBarBottles.world = this;
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100 );
            this.throwableObject.push(bottle);
        }
    }

    checkCollisions() {
            this.level.enemies.forEach((enemy)=> {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.character.isDead();
                    this.statusBarHealth.setPercentage(this.character.energy, this.statusBarHealth.IMAGES_STATUS_BAR_HEALTH)
                 }
            })
        }

    draw() {
        //This function clears the drawn image 
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0); 
        this.addObjectToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0); //Camera back
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.ctx.translate(this.camera_x, 0); //Camera forwards 
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.throwableObject);
        this.addToMap(this.character);
        
        
        this.ctx.translate( -this.camera_x, 0);
        
       
        //Draw() is called a lot of times per second. 
        let self = this;
        requestAnimationFrame(function (){
            self.draw();
        });
    }
    
    addObjectToMap(objects) {
        objects.forEach((ob) => {
            this.addToMap(ob);
        })
    }

    addToMap(mo){
        if(mo.otherDirection) {
            this.mirrorImage(mo);                         
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        
        if (mo.otherDirection) {
            this.restoreImage(mo);
        }
    }

    mirrorImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    
    restoreImage(mo) {
        mo.x = mo.x * - 1;
        this.ctx.restore();
    }

}