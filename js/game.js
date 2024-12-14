let canvas;
let world;
let gameStarted = false;
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const dKey = document.getElementById('dKey');
const spaceKey = document.getElementById('spaceKey');

let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard)
}

window.addEventListener('keydown', (event) => {
    event.keyCode == 40 ? keyboard.DOWN = true : null;
    event.keyCode == 38 ? keyboard.UP = true : null;
    event.keyCode == 32 ? keyboard.SPACE = true : null;
    event.keyCode == 39 ? keyboard.RIGHT = true : null;
    event.keyCode == 37 ? keyboard.LEFT = true : null;
    event.keyCode == 68 ? keyboard.D = true : null;
    changeColorOnKeyDown(event);

})

window.addEventListener('keyup', (event) => {
    event.keyCode == 40 ? keyboard.DOWN = false : null;
    event.keyCode == 38 ? keyboard.UP = false : null;
    event.keyCode == 32 ? keyboard.SPACE = false : null;
    event.keyCode == 39 ? keyboard.RIGHT = false : null;
    event.keyCode == 37 ? keyboard.LEFT = false : null; 
    event.keyCode == 68 ? keyboard.D = false : null;
    changeColorOnKeyUp(event);
})


function startGame() {
    if(!gameStarted){
        world.startScreen = false;
        world.character.animate();
        world.level.enemies.forEach(enemie => {
            enemie.animate();
        });;
    gameStarted = true;
    }
}  


function changeColorOnKeyDown(event) {
    event.keyCode == 37 ? arrowLeft.classList.add('key-pressed'): null;
    event.keyCode == 39 ? arrowRight.classList.add('key-pressed'): null;
    event.keyCode == 68 ? dKey.classList.add('key-pressed'): null;
    event.keyCode == 32 ? spaceKey.classList.add('key-pressed'): null;
}


function changeColorOnKeyUp(event) {
    event.keyCode == 37 ? arrowLeft.classList.remove('key-pressed'): null;
    event.keyCode == 39 ? arrowRight.classList.remove('key-pressed'): null;
    event.keyCode == 68 ? dKey.classList.remove('key-pressed'): null;
    event.keyCode == 32 ? spaceKey.classList.remove('key-pressed'): null;
}