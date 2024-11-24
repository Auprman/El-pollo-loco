class World {

    character = new Character();
    statusBar = new StatusBar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0; 

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
}
    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy)=> {
                if (this.character.isColliding(enemy)) {
                    // console.log('Collision with character ', this.character);
                    this.character.hit();
                    this.character.isDead();
                 }
            })
        },200);
    }

    draw() {
        //This function clears the drawn image 
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addToMap(this.statusBar);
        
        
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