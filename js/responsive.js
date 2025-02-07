const touchLeft = document.getElementById('touchLeft');
const touchRight = document.getElementById('touchRight');
const touchJump = document.getElementById('touchJump');
const touchThrow = document.getElementById('touchThrow');
const touchMute = document.getElementById("touchMute");
const controlButtonContainer = document.getElementById('controlButton');
const fullScreenBig = document.getElementById('fullscreenBig');


/**
 *  This function checks if the device is a device with a touch screen
 * 
 * @returns {boolean} - true if the device is a touch device, false otherwise
 */
function isTouchDevice() {  
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

/**
 *  This function checks if the device is in portrait mode
 *  
 * @returns {boolean} - true if the device is in portrait mode, false otherwise
 */
function isPortraitMode() {
    return window.innerHeight > window.innerWidth;
}

/**
 * This function checks if the device is a smartphone
 * 
 * @returns {boolean} - true if the device is a smartphone, false otherwise
 */
function isSmartphone() {
    const maxSmartphoneWidth = 768; 
    return window.innerWidth <= maxSmartphoneWidth;
  }

/**
 *  This function positions the buttons on mobile
 */
   function positioningButtonsOnMobile() {
    if(isTouchDevice()){
      fullScreenBig.classList.add('display-none');
      controlButtonContainer.classList.add('display-none');
      reloadButtonBig.classList.add('display-none');
    }
  }

/**
 * This function shows the touch controls on mobile
 */
function showTouchControlsOnMobile() {
    let navBarTop = document.getElementById('navBarTop');
    if(isTouchDevice()){
      navBarTop.classList.remove('display-none');
      navBarTop.classList.add('display-flex');
    }else{
      navBarTop.classList.remove('display-flex');
    }
  }

 /**
 * This function checks if the mobile is in horizontal mode
 */
function checkIfMobileIsHorizontal() {
    let rotateScreenToast = document.getElementById('rotateScreen');
    checkWindowOrientation(rotateScreenToast);
    window.addEventListener('resize', () => {
      checkWindowOrientation(rotateScreenToast) 
  });
  }
  
/**
* this function checks the window orientation
* 
* @param {object} rotateScreenToast - the toast that tells the user to rotate the screen
*/
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

/**
 * This function toggles the fullscreen mode on mobile
 */
function fullscreenMobile() {
    let frame = document.getElementById('frame');
    if (document.fullscreenElement) {
      document.exitFullscreen();
  }else{
    openFullscreen(frame);
  }
    
  }

touchLeft.addEventListener('touchstart', (event) => {
  keyboard.LEFT = true;
  event.preventDefault();
}, { passive: false });

touchLeft.addEventListener('touchend', (event) => {
  keyboard.LEFT = false;});

touchRight.addEventListener('touchstart', (event) => {
   keyboard.RIGHT = true;
    event.preventDefault();
  }, { passive: false });

touchRight.addEventListener('touchend', (event) => {
  keyboard.RIGHT = false;

});

touchJump.addEventListener('touchstart', (event) => {
  keyboard.SPACE = true;
  event.preventDefault();
}, { passive: false });

touchJump.addEventListener('touchend', (event) => {keyboard.SPACE = false});

touchThrow.addEventListener('touchstart', (event) => {
  keyboard.D = true;
  event.preventDefault();
}, { passive: false });

touchThrow.addEventListener('touchend', (event) => {keyboard.D = false });

touchMute.addEventListener("touchstart", (event) => {
  event.preventDefault();
  muteSound();
}, { passive: false });