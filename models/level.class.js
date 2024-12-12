class Level{
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    startScreen;
    level_start_x = -619;
    level_end_x = 3 * 719;

    constructor(enemies, clouds, backgroundObjects, coins, bottles, startScreen) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.startScreen = startScreen;
    }
}