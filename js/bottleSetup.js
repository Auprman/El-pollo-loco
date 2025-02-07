/**
 * Klasse zur Verwaltung der Flaschen im Spiel. TODO: Code soll in der World.class.js gekürzt werden... Chat GPT Chatverlauf nachschauen!
 */
class BottleSetup {
    /**
     * Erstellt eine Instanz von BottleSetup.
     * @param {Object} world - Die Spielwelt.
     */
    constructor(world) {
      this.world = world;
    }
  
    /**
     * Fügt alle Flaschen der Liste der werfbaren Objekte hinzu.
     */
    addBottlesToThrowableObjects() {
      this.world.level.bottles.forEach((bottle) => {
        this.world.throwableObject.push(bottle);
      });
    }
  
    /**
     * Überprüft, ob eine Flasche mit einem Gegner kollidiert.
     */
    checkBottleCollision() {
      this.world.throwableObject.forEach((bottle) => {
        this.world.level.enemies.forEach((enemy) => {
          if (this.bottleCanHit(bottle, enemy)) {
            bottle.bottleUnbroken = false;
            bottle.splashBottle();
            bottle.speedY = 3;
            enemy.dead();
            bottle.bottle_break.play();
            enemy.hit();
            enemy.isHurt();
            this.world.hitsOnEndboss++;
          }
        });
      });
    }
  
    /**
     * Prüft, ob eine Flasche einen Gegner treffen kann.
     * @param {Object} bottle - Die Flasche.
     * @param {Object} enemy - Der Gegner.
     * @returns {boolean} True, wenn die Flasche den Gegner treffen kann.
     */
    bottleCanHit(bottle, enemy) {
      return bottle.isColliding(enemy) && !enemy.isDead && bottle.bottleUnbroken;
    }
  
    /**
     * Überprüft, ob eine Flasche eingesammelt werden kann.
     */
    checkBottleCollection() {
      this.world.throwableObject.forEach((bottle) => {
        if (this.canCollectBottle(bottle)) {
          this.world.bottleAmount++;
          bottle.y = 3500;
          this.world.setBottleStatusBar();
          bottle.bottle_collect.play();
        }
      });
    }
  
    /**
     * Prüft, ob eine Flasche eingesammelt werden kann.
     * @param {Object} bottle - Die Flasche.
     * @returns {boolean} True, wenn die Flasche eingesammelt werden kann.
     */
    canCollectBottle(bottle) {
      return (
        !bottle.bottleUnbroken &&
        bottle.isColliding(this.world.character) &&
        !bottle.bottleLandedAfterThrow
      );
    }
  
    /**
     * Überprüft, ob der Spieler eine Flasche werfen kann.
     */
    checkThrowObjects() {
      let bottleThrowTime = new Date().getTime();
      if (this.canThrowBottle(bottleThrowTime)) {
        let bottle = new ThrowableObject(
          this.world.character.x + 100,
          this.world.character.y + 100,
          true
        );
        this.muteThrownBottleSound(bottle);
        this.world.throwableObject.push(bottle);
        this.world.bottleAmount--;
        this.world.setBottleStatusBar();
        bottle.bottleLandedAfterThrow = true;
        this.world.lastBottleThrown = new Date().getTime();
      }
    }
  
    /**
     * Prüft, ob eine Flasche geworfen werden kann.
     * @param {number} bottleThrowTime - Der aktuelle Zeitstempel.
     * @returns {boolean} True, wenn eine Flasche geworfen werden kann.
     */
    canThrowBottle(bottleThrowTime) {
      return (
        this.world.keyboard.D &&
        this.world.bottleAmount > 0 &&
        bottleThrowTime - this.world.lastBottleThrown > 500
      );
    }
  
    /**
     * Stellt sicher, dass die Soundeffekte der geworfenen Flasche stummgeschaltet sind, wenn das Spiel stummgeschaltet ist.
     * @param {Object} bottle - Die geworfene Flasche.
     */
    muteThrownBottleSound(bottle) {
      if (muted) {
        bottle.bottle_break.muted = true;
      }
    }
  }