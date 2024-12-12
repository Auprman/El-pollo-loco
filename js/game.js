let canvas;
let world;

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

})

window.addEventListener('keyup', (event) => {
    event.keyCode == 40 ? keyboard.DOWN = false : null;
    event.keyCode == 38 ? keyboard.UP = false : null;
    event.keyCode == 32 ? keyboard.SPACE = false : null;
    event.keyCode == 39 ? keyboard.RIGHT = false : null;
    event.keyCode == 37 ? keyboard.LEFT = false : null; 
    event.keyCode == 68 ? keyboard.D = false : null; 
})


function startGame() {
    world.startScreen = false;
}