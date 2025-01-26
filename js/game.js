let canvas;
let world;
let gameStarted = false;
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const dKey = document.getElementById('dKey');
const spaceKey = document.getElementById('spaceKey');
const speaker = document.getElementById('speaker');
const speakerTouchscreen = document.getElementById('touchMute');
const infoToast = document.getElementById('info');
const background_sound = new Audio ('audio/musica2.mp3');
const slider = document.getElementById('myRange');
const touchMute = document.getElementById("touchMute");
const navBarTop = document.getElementById('navBarTop');
const reloadButton = document.getElementById('reloadGame');
const reloadButtonBig = document.getElementById('reloadGameBig');
const touchLeft = document.getElementById('touchLeft');
const touchRight = document.getElementById('touchRight');
const touchJump = document.getElementById('touchJump');
const touchThrow = document.getElementById('touchThrow');


const allAudioElements = []

let muted = false;

let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    changeInfoToastBorder();
    setVolume();
    checkIfMobileIsHorizontal();
}

function checkIfMobileIsHorizontal() {
  let rotateScreenToast = document.getElementById('rotateScreen');
  checkWindowOrientation(rotateScreenToast);
  window.addEventListener('resize', () => {
    checkWindowOrientation(rotateScreenToast) 
});
}

function checkWindowOrientation(rotateScreenToast) {
  if(window.innerHeight > window.innerWidth){
    rotateScreenToast.classList.add('display-flex');
    infoToast.classList.add('display-none');    

  }else{
    rotateScreenToast.classList.remove('display-flex');
    navBarTop.classList.add('display-none');
    infoToast.classList.remove('display-none');
    
  }
}

function changeInfoToastBorder(){
    canvas.addEventListener('mouseover', ()=> {
          infoToast.classList.add('hovered-canvas');
    })
    canvas.addEventListener('mouseout', ()=> {
        infoToast.classList.remove('hovered-canvas');  })
}

window.addEventListener('keydown', (event) => {
    event.keyCode == 40 ? keyboard.DOWN = true : null;
    event.keyCode == 38 ? keyboard.UP = true : null;
    event.keyCode == 32 ? keyboard.SPACE = true : null;
    event.keyCode == 39 ? keyboard.RIGHT = true : null;
    event.keyCode == 37 ? keyboard.LEFT = true : null;
    event.keyCode == 68 ? keyboard.D = true : null;
    changeColorOnKeyDown(event);
});

window.addEventListener('keyup', (event) => {
    event.keyCode == 40 ? keyboard.DOWN = false : null;
    event.keyCode == 38 ? keyboard.UP = false : null;
    event.keyCode == 32 ? keyboard.SPACE = false : null;
    event.keyCode == 39 ? keyboard.RIGHT = false : null;
    event.keyCode == 37 ? keyboard.LEFT = false : null; 
    event.keyCode == 68 ? keyboard.D = false : null;
    changeColorOnKeyUp(event);
});


touchLeft.addEventListener('touchstart', (event) => {
   keyboard.LEFT = true;
});
touchLeft.addEventListener('touchend', (event) => {
    keyboard.LEFT = false;
 });

touchRight.addEventListener('touchstart', (event) => {
    keyboard.RIGHT = true;
});
touchRight.addEventListener('touchend', (event) => {
    keyboard.RIGHT = false;
});
touchJump.addEventListener('touchstart', (event) => {
    keyboard.SPACE = true;
});
touchJump.addEventListener('touchend', (event) => {
    keyboard.SPACE = false;
});
touchThrow.addEventListener('touchstart', (event) => {
    keyboard.D = true;
});
touchThrow.addEventListener('touchend', (event) => {
    keyboard.D = false;
});

touchMute.addEventListener("touchstart", muteSound);
touchMute.addEventListener("touchend", muteSound);


function startGame() {
    if(!gameStarted){
        world.startScreen = false;
        world.character.animate();
        world.level.enemies.forEach(enemie => {
            enemie.animate();
        });;
    gameStarted = true;
    removeInfoToast();
    showTouchControlsOnMobile();
    allAudioElements.push(background_sound);   
    background_sound.play();
    background_sound.volume = 0.1;
    }
}

function showTouchControlsOnMobile() {
  let navBarTop = document.getElementById('navBarTop');
  if(document.body.clientHeight < 614){
    navBarTop.classList.add('display-flex');
  }else{
    navBarTop.classList.remove('display-flex');
}
  }
  

function setVolume(){
    slider.addEventListener('input', () => {
        background_sound.volume = slider.value / 100;
    }
)}

function toggleMusic() {
    const checkbox = document.getElementById('musicCheckbox');
    const checkboxLabel = document.getElementById('guitarPicture'); 
    if (checkbox.checked) {
      background_sound.play();
      checkboxLabel.src = 'img/icons/guitar.png'; 
      
    } else {
      background_sound.pause();
      background_sound.currentTime = 0; 
      checkboxLabel.src = 'img/icons/guitar-muted.png';    
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

function muteSound() {
    muted = !muted;
    if(muted){
        allAudioElements.forEach((audioFile) => {
            audioFile.muted = true;
        })
    }else{
        allAudioElements.forEach((audioFile) => {
            audioFile.muted = false;
        })
        }
    changeVolumeImageSource(muted);
}
    
    
function changeVolumeImageSource(muted) {
    muted == true ? speaker.src = 'img/icons/mute.png' : speaker.src = 'img/icons/volume-64.png';
    muted == true ? speakerTouchscreen.style.backgroundImage = 'url(\'img/icons/mute.png\')' : speakerTouchscreen.style.backgroundImage = 'url(\'img/icons/volume-64.png\')';
}


function removeInfoToast() {
    infoToast.style.visibility = 'hidden';
}


function isSmartphone() {
    const maxSmartphoneWidth = 768; 
    return window.innerWidth <= maxSmartphoneWidth;
  }
  
function isPortraitMode() {
    return window.innerHeight > window.innerWidth;
}


function reloadGame(){
    location.reload();
}


  function fullscreen() {
    let frame = document.getElementById('canvas');
    if (document.fullscreenElement) {
      document.exitFullscreen();
  }else{
    openFullscreen(frame);
  }
  }

  function fullscreenMobile() {
    let frame = document.getElementById('frame');
    if (document.fullscreenElement) {
      document.exitFullscreen();
  }else{
    openFullscreen(frame);
  }
    
  }

  
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

window.addEventListener('load', function() {
  setTimeout(function() {
      window.scrollTo(0, 1);
  }, 100);
});