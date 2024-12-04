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
    coinAmount = 0;
    bottleAmount = 0;
    throwableObject = [];
    maxCoins = this.level.coins.length;
    

    constructor(canvas, keyboard) {
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.setStatusBarImages();           
}

setStatusBarImages() {        
        this.statusBarHealth.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_HEALTH[5])
        this.statusBarCoins.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_COINS[0])
        this.statusBarBottles.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_BOTTLES[0])      
}

    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkCollisions();
            this.checkCoinCollision();
            this.checkBottleCollision()
        }, 150);
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
                if (this.character.isColliding(enemy) && !enemy.isDead) {
                    this.character.hit();
                    this.jumpOnTop(enemy)
                    this.character.isDead();
                    this.statusBarHealth.setPercentage(this.character.energy, this.statusBarHealth.IMAGES_STATUS_BAR_HEALTH);
                 }
            })
        }


    checkBottleCollision() {
        this.throwableObject.forEach((bottle) => {
           this.level.enemies.forEach((enemy) => {
           if(bottle.isColliding(enemy) && !enemy.isDead && bottle.bottleUnbroken == true){
            bottle.bottleUnbroken = false;         
            bottle.splashBottle();
            bottle.speedY = 3;           
            enemy.dead();
            bottle.bottle_break.play();
            enemy.hit();
            enemy.isHurt();
           }
           })
        })
    }

    jumpOnTop(enemy) {
        if(this.character.y <= 180 && this.character.isHurt()) {
            enemy.dead();
        }
        
    }


    checkCoinCollision() {
        let coinOffsetX = 50;
        let coinOffsetY = 50;
        this.level.coins.forEach((coin, index)=> {
            if (this.character.isColliding(coin, coinOffsetX, coinOffsetY)) { 
                this.level.coins.splice(index, 1)
                this.coinAmount++;
                coin.collect_coin_sound.play();
                this.statusBarCoins.setPercentage(this.getPercentageOfCoins(), this.statusBarCoins.IMAGES_STATUS_BAR_COINS);
            }
        })
     }


    getPercentageOfCoins() {        
        return this.coinAmount / this.maxCoins * 100;
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