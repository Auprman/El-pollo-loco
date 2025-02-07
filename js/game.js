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
const navBarTop = document.getElementById('navBarTop');
const reloadButton = document.getElementById('reloadGame');
const reloadButtonBig = document.getElementById('reloadGameBig');
const checkbox = document.getElementById('musicCheckbox');
const checkboxLabel = document.getElementById('guitarPicture'); 
const checkboxTouch = document.getElementById('musicCheckboxTouch');
const checkboxLabelTouch = document.getElementById('guitarPictureTouch'); 
let localStorageMusicMuted = localStorage.getItem('musicMuted');
let localStorageMuted = localStorage.getItem('Muted');
const allAudioElements = []
let muted 
let musicMuted
let keyboard = new Keyboard();


/**
 * This function Initializes the game
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  changeInfoToastBorder();
  setVolume();
  checkIfMobileIsHorizontal();
  positioningButtonsOnMobile();
  saveMutedToLocalStorage();
  setSavedMutedSoundFiles();
  checkForMuted();
  changeImagesOnMutedMusic();
}

/**
 * This function starts the game
 */
function startGame() {
  if(!gameStarted){
      world.startScreen = false;
      world.character.animate();
      world.level.enemies.forEach(enemie => { enemie.animate()});
      gameStarted = true;
      removeInfoToast();
      showTouchControlsOnMobile();
      allAudioElements.push(background_sound);    
      background_sound.volume = 0.1;
      setSavedMutedSoundFiles();
      checkForMuted();
      changeImagesOnMutedMusic();      
      playMusic();
      world.level.screen[0].x = 4000;
  }
}

/**
 *  This function restarts the game 
 */
function restartGame(){
  setSavedMutedSoundFiles();  
  stopChickenIntervals();
  world.character.stopAllIntervals();
  world = null;  
  init();    
  gameStarted = false;
  level1 = createNewLevel();
  prepareWorld();
  startGame();
}

/**
 * This function saves the actual state of muted and musicMuted to the local storage
 */
function saveMutedToLocalStorage() {  
  if(muted == undefined || musicMuted == undefined){
    muted = false;
    musicMuted = true;
  }else{
    localStorage.setItem('Muted' , muted);
    localStorage.setItem('musicMuted' , musicMuted);
}
}
/**
 * This function changes the border of the info toast
 */
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

/**
 * This function sets the volume of the background sound
 */ 
function setVolume(){
    slider.addEventListener('input', () => {
        background_sound.volume = slider.value / 100;
    }
)}

/**
 * This function toggles the music
 */
function toggleMusic() {
  musicMuted = !musicMuted;  
  if (!musicMuted) {     
    checkbox.checked = false;
    checkboxTouch.checked = false;
  }else{    
    checkbox.checked = true;
    checkboxTouch.checked = true;
  }
  musicMutedToLocalSotrage();
  playMusic();
}

/**
 * Sets the correct Image on init for the music toggle button
 */
function changeImagesOnMutedMusic() {
  if (!musicMuted) {
    checkboxLabel.src = 'img/icons/guitar.png';
    checkboxLabelTouch.src = 'img/icons/guitar.png';        
  } else {
    checkboxLabel.src = 'img/icons/guitar-muted.png';
    checkboxLabelTouch.src = 'img/icons/guitar-muted.png';     
  }
}

/**
 *  This function saves if the music is muted to the local Storage
 */
function musicMutedToLocalSotrage(){
  localStorage.setItem('musicMuted', musicMuted);
}

/**
 *  This function plays the backgroundmusic and updates the images if the checkbox is checked
 */
function playMusic() {
  if (!musicMuted ) {
    !muted ? background_sound.play() : null;
    checkboxLabel.src = 'img/icons/guitar.png';
    checkboxLabelTouch.src = 'img/icons/guitar.png';        
  } else {
    background_sound.pause();
    background_sound.currentTime = 0; 
    checkboxLabel.src = 'img/icons/guitar-muted.png';
    checkboxLabelTouch.src = 'img/icons/guitar-muted.png';     
  }
}

/**
 * This function checks if the sound is muted and mutes all audio elements
 */
function checkForMuted() {  
  if(muted){
        allAudioElements.forEach((audioFile) => { audioFile.muted = true});
    }else{
        allAudioElements.forEach((audioFile) => { audioFile.muted = false });
        }
    changeVolumeImageSource(muted);
      
}

/**
 * This function changes the volume image source
 * 
 * @param {boolean} muted - the boolean that tells if the sound is muted or not
 */    
function changeVolumeImageSource(muted) {
  muted == true ? speaker.src = 'img/icons/mute.png' : speaker.src = 'img/icons/volume-64.png';
  muted == true ? speakerTouchscreen.style.backgroundImage = 'url(\'img/icons/mute.png\')' : speakerTouchscreen.style.backgroundImage = 'url(\'img/icons/volume-64.png\')';
}


/**
 * This function mutes the sound
 */
function muteSound() { 
  muted = !muted;
  localStorage.setItem('Muted' , muted);
  checkForMuted();
  playMusic();    
}

/**
 * This function checks the saved mute information from the local storage and saves it to the muted boolean
 */
function setSavedMutedSoundFiles() {
  muted = localStorage.getItem('Muted') === 'true';
  musicMuted = localStorage.getItem('musicMuted') === 'true';
  checkbox.checked = musicMuted;
  checkboxTouch.checked = musicMuted;
}

/**
 *  This function changes the color of the keys when they are pressed
 * @param {element} event - the event that is triggered when a key is pressed
 */
function changeColorOnKeyDown(event) {
    event.keyCode == 37 ? arrowLeft.classList.add('key-pressed'): null;
    event.keyCode == 39 ? arrowRight.classList.add('key-pressed'): null;
    event.keyCode == 68 ? dKey.classList.add('key-pressed'): null;
    event.keyCode == 32 ? spaceKey.classList.add('key-pressed'): null;
}

/**
 * This function changes the color of the keys when they are released
 * 
 * @param {element} event - the event that is triggered when a key is released
 */
function changeColorOnKeyUp(event) {
    event.keyCode == 37 ? arrowLeft.classList.remove('key-pressed'): null;
    event.keyCode == 39 ? arrowRight.classList.remove('key-pressed'): null;
    event.keyCode == 68 ? dKey.classList.remove('key-pressed'): null;
    event.keyCode == 32 ? spaceKey.classList.remove('key-pressed'): null;
}

/**
 * This function shows the info toast
 */
function removeInfoToast() {
    infoToast.style.visibility = 'hidden';
    if(isTouchDevice()){
      infoToast.style.display = 'none';
    }
}

/**
 * This function toggles the fullscreen mode
 */
function fullscreen() {
  let frame = document.getElementById('canvas');
  if (document.fullscreenElement) {
    document.exitFullscreen();
}else{
  openFullscreen(frame);
}
}

/**
 * This function opens the fullscreen mode
 * 
 * @param {element} elem - the element that is in fullscreen mode
 */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/**
 * This function closes the fullscreen mode
 */
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

/**
 * This function creates a new level
 */
function prepareWorld(){
  world.level = level1;
  world.character = undefined;
  world.character = new Character(); 
  world.character.deadAnimationPlayed = false;
  world.character.x = 100;
  world.character.y = 230;
  world.camera_x = 0;
  world.character.world = world;
  world.startScreen = false;
  world.reloadButtonVisible = false; 
}

/**
 * This function stops the chicken intervals
 */
function stopChickenIntervals() {
  world.level.enemies.forEach((e) =>{
    if(e.allIntervals){
        e.allIntervals.forEach(interval =>{
        clearInterval(interval.intervalNumber)
        })
      }
    });
}
