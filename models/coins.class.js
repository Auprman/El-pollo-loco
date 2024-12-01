class Coin extends MovableObject{

    x = 200;
    y = 330;
    width = 150;
    height = 150;
    direction = -1;
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]
 constructor (x, y) {
    super();
    this.loadImages(this.IMAGES_COINS)
    this.loadImage(this.IMAGES_COINS[0]);
    this.randomCoinPositionX();
    this.animateCoin();
 }   

 collect_coin_sound = new Audio('audio/collect-coin.mp3');
/**
 * This function animates the coin by increasing and decreasing the width and height from 160 - 140 px
 * 
 */
 animateCoin() {
    setInterval(() => {
        if (this.width <= 140 || this.width >= 160) {
            this.direction *= -1;
        }
        const oldWidth = this.width;
        const oldHeight = this.height;

        this.width += this.direction * 1;
        this.height += this.direction * 1;

        const widthDiff = (oldWidth - this.width) / 2;
        const heightDiff = (oldHeight - this.height) / 2;

        this.x += widthDiff;
        this.y += heightDiff;
    }, 50);
}

randomCoinPositionX() {
    this.x = Math.random() * 1900
}


}