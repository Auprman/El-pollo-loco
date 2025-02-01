class Coin extends MovableObject{

    x = 200;
    y = 380;
    width = 150;
    height = 150;
    direction = -1;
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]
    allIntervals = [];

 constructor (x, y) {
    super();
    this.loadImages(this.IMAGES_COINS)
    this.loadImage(this.IMAGES_COINS[0]);
    this.randomCoinPositionX();
    this.randomCoinPositionY()
    this.animateCoin();
    this.pushAudioFilesToArray();
 }   

 collect_coin_sound = new Audio('audio/collect-coin.mp3');
/**
 * This function animates the coin by increasing and decreasing the width and height from 160 - 140 px
 * 
 */
 animateCoin() {
    let animateCoin = setInterval(() => {
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

    this.allIntervals.push(this.saveInterval('animateCoin', animateCoin))  
}

/**
 * This function randomizes the x position of the coin
 */
randomCoinPositionX() {
    this.x = 150 + Math.random() * 1500
}

/**
 * This function randomizes the y position of the coin
 */
randomCoinPositionY() {
    this.y = 150 + 150 * Math.random() 
}

/**
 * This function saves the interval
 */
stopAllIntervals() {
    this.allIntervals.forEach((interval) => {
       clearInterval(interval.intervalNumber);
    })
 }
 
 /**
  * This function pushes the audio files to the array
  */
 pushAudioFilesToArray() {
    allAudioElements.push(this.collect_coin_sound);
}
}
