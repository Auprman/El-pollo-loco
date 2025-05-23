class World{
  character = new Character();
  statusBarHealth = new StatusBar(0, 10, "health");
  statusBarCoins = new StatusBar(0, 50, "coins");
  statusBarBottles = new StatusBar(0, 90, "bottles");
  statusBarEndboss = new StatusBar(510, -100);
  level = level1;
  startScreen = this.level.screen[0].startScreenLoaded;
  gameOver = false;
  allAudioFiles = [];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  coinAmount = 0;
  bottleAmount = 0;
  hitsOnEndboss = 0;
  throwableObject = [];
  lastBottleThrown = new Date().getTime();
  maxCoins = this.level.coins.length;
  maxBottles = this.level.bottles.length;
  reloadButtonVisible = false;
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.setStatusBarImages();
    this.addBottlesToThrowableObjects();
  }
/**
 * This function adds the bottles to the throwable objects
 */
  addBottlesToThrowableObjects() {
    this.level.bottles.forEach((bottle) => {
      this.throwableObject.push(bottle);
    });
  }

/**
 * This function sets the status bar images
 */
  setStatusBarImages() {
    this.statusBarHealth.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_HEALTH[5]);
    this.statusBarCoins.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_COINS[0]);
    this.statusBarBottles.loadImage(this.statusBarBottles.IMAGES_STATUS_BAR_BOTTLES[0]);
    this.statusBarEndboss.loadImage(this.statusBarEndboss.IMAGES_STATUS_BAR_ENDBOSS[0]);
  }

  /**
   * This function sets the status bar for the endboss
   */
  setStatusBarEndboss() {
    if (this.character.x >= 1500) {
      this.statusBarEndboss.y = 15;
    }
    this.statusBarEndboss.setPercentage(
      this.getPercentageOfEndboss(),
      this.statusBarEndboss.IMAGES_STATUS_BAR_ENDBOSS);
  }

  /**
   * This function checks the collisions
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCoinCollision();
      this.checkBottleCollision();
      this.checkBottleCollection();
      this.setStatusBarEndboss();
      this.checkThrowObjects();
      this.displayReloadButton();
    }, 25);
  }

  /**
   * This function displays the reload button
   */
  displayReloadButton() {
    if(this.gameOver || world.level.enemies[6].isDead && !this.reloadButtonVisible){
      this.reloadButtonVisible = true;
      if(world.level.enemies[6].isDead){
        setTimeout(() => {
          reloadButton.style.display = 'flex';
          reloadButtonBig.style.display = 'flex';
        }, 2500);
      }else{
          reloadButton.style.display = 'flex';
          reloadButtonBig.style.display = 'flex';
      }     
    }
  }

  /**
   * This function sets the world
   */
  setWorld() {
    this.character.world = this;
    this.statusBarBottles.world = this;
    this.statusBarCoins.world = this;
    this.statusBarBottles.world = this;
    this.statusBarEndboss.world = this;
  }

/**
 * This function checks if the character can throw objects
 */
  checkThrowObjects() {
    let bottleThrowTime = new Date().getTime();
    if (this.canThrowBottle(bottleThrowTime)) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, true);
      this.muteThrownBottleSound(bottle);
      this.throwableObject.push(bottle);
      this.bottleAmount--;
      this.setBottleStatusBar();
      bottle.bottleLandedAfterThrow = true;
      this.lastBottleThrown = this.lastBottleThrown;
      this.lastBottleThrown = new Date().getTime();
    }
  }

  /**
   *  This function checks if the character can throw a bottle
   * 
   * @param {number} bottleThrowTime - the time of the bottle throw 
   */
  canThrowBottle(bottleThrowTime) {
    return (
      this.keyboard.D &&
      this.bottleAmount > 0 &&
      bottleThrowTime - this.lastBottleThrown > 1000);
  }

  /**
   * This function mutes the thrown bottle sound
   * 
   * @param {*} bottle - the bottle
   */
  muteThrownBottleSound(bottle) {
    if (muted) { bottle.bottle_break.muted = true }
  }

  /**
   * This function checks the collisions
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy,-5,-5) && !enemy.isDead ) {
        this.jumpOnTop(enemy);
        this.character.hit(enemy);
        this.character.isDead();   
        this.statusBarHealth.setPercentage(this.character.energy,this.statusBarHealth.IMAGES_STATUS_BAR_HEALTH);
      }});
  }

  /**
   * This function checks the bottle collision
   */
  checkBottleCollision() {
    this.throwableObject.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (this.bottleCanHit(bottle, enemy)) {
          bottle.bottleUnbroken = false;
          bottle.splashBottle();
          bottle.speedY = 3;
          enemy.dead();
          bottle.bottle_break.play();
          enemy.hit();
          enemy.isHurt();
          this.hitsOnEndboss++;
        }
      });
    });
  }

  /**
   *  This function checks if the bottle can hit the enemy 
   * @param {*} bottle - the bottle
   * @param {*} enemy - the enemy
   * @returns 
   */
  bottleCanHit(bottle, enemy) {
    return bottle.isColliding(enemy) && !enemy.isDead && bottle.bottleUnbroken
  }

  /**
   * This function executes if the character jumps on top of the enemy 
   * @param {*} enemy - the enemy
   */
  jumpOnTop(enemy) {
    if (this.canJumpOn(enemy) && this.character.speedY < 0) { 
        this.character.speedY = 5;
        enemy.dead();
    }
  }

/**
 *  This function checks if the character can jump on the enemy
 * 
 * @param {*} enemy - the enemy  
 */
  canJumpOn(enemy) {
    return this.character.y <= 200 && this.character.isHurt() && !(enemy instanceof Endboss)
  }

  /**
   * This function checks if the bottle can be collected
   */
  checkBottleCollection() {
    this.throwableObject.forEach((bottle) => {
      if (this.canCollectBottle(bottle)) {
        this.bottleAmount++;
        bottle.y = 3500;
        this.setBottleStatusBar();
        bottle.bottle_collect.play();
      }
    });
  }

/**
 *  This function checks if the bottle can be collected
 * 
 * @param {*} bottle - the bottle
 */
  canCollectBottle(bottle){
    return !bottle.bottleUnbroken && bottle.isColliding(this.character) && !bottle.bottleLandedAfterThrow
  }

/**
 * This function checks the coin collision
 */
  checkCoinCollision() {
    let coinOffsetX = 50;
    let coinOffsetY = 120;
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin, coinOffsetX, coinOffsetY)) {
        this.level.coins.splice(index, 1);
        this.coinAmount++;
        coin.collect_coin_sound.play();
        this.setCoinStatusBar();
      }
    });
  }

/**
 * This function sets the coin status bar
 */
  setCoinStatusBar() {
    this.statusBarCoins.setPercentage(
      this.getPercentageOfCoins(),
      this.statusBarCoins.IMAGES_STATUS_BAR_COINS
    );
  }

/**
 * This function sets the bottle status bar
 */
  setBottleStatusBar() {
    this.statusBarBottles.setPercentage(
      this.getPercentageOfBottles(),
      this.statusBarBottles.IMAGES_STATUS_BAR_BOTTLES
    );
  }

/**
 * This function returns the percentage of the coins
 * @returns the percentage of the coins
 */
  getPercentageOfCoins() {return (this.coinAmount / this.maxCoins) * 100}

/**
 *  This function returns the percentage of the bottles
 * @returns the percentage of the bottles
 */
  getPercentageOfBottles() { return (this.bottleAmount / 5) * 100}

/**
 *  This function returns the percentage of the endboss  
 * @returns the percentage of the endboss
 */
  getPercentageOfEndboss() {
    let hits = world.level.enemies[world.level.enemies.length - 1].hits;
    return 100 - (this.hitsOnEndboss / 4) * 100;
  }

  /**
   * This function draws the world
   */
  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    if (this.startScreen) {
      this.addToMap(this.level.screen[0]);      
    } else {
      this.setupLevelObjects();
      this.drawGameOverScreen();
    }
    let self = this;
    requestAnimationFrame(function () { self.draw() });
  }

/**
 * This function sets up the level objects
 */
  setupLevelObjects() {
    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    this.ctx.translate(this.camera_x, 0); 
    this.drawMovableObjects();
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * This function draws the movable objects
   */
  drawMovableObjects() {
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.throwableObject);
    this.addToMap(this.character);
    world.level.enemies[6].isDead ? this.addToMap(this.level.screen[0]): null;
  }

/**
 * This function draws the status bars
 */
  drawStatusBars() {
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarEndboss);
  }

  /**
   * This function draws the game over screen
   */
  drawGameOverScreen() {
    if(world.character.isDead() && world.character.y > 800){
      this.addToMap(this.level.screen[1]);
      this.gameOverSound()
    }
  }
/**
 * This function plays the game over sound
 */
  gameOverSound(){
    if (!this.gameOver) {
      this.gameOver = true;
      myRange.value = 10;
      background_sound.volume = 0.04;
      world.character.gameOver_sound.play();     
    }
  }

/**
 *  This function adds objects to the map  
 * @param {*} objects - the objects that should be added to the map
 */
  addObjectToMap(objects) {
    objects.forEach((ob) => {this.addToMap(ob)});
  }

/**
 * This function adds an object to the map
 * @param {*} mo - the object that should be added to the map
 */
  addToMap(mo) {
    if (mo.otherDirection) {this.mirrorImage(mo)}
    mo.draw(this.ctx);
    if (mo.otherDirection) {this.restoreImage(mo)}
  }

/**
 * This function mirrors the image
 * @param {*} mo - the object
 */
  mirrorImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

/**
 * This function restores the image
 * @param {*} mo - the object
 */
  restoreImage(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

