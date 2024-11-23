class Level{
    enemies;
    clouds;
    backgroundObjects;
    level_start_x = -619;
    level_end_x = 3 * 719;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}