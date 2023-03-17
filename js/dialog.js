'use strict';

(function () {

var setupDialogElement = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupFireBall = document.querySelector('.setup-fireball-wrap');
var setupWizardCoat = document.querySelector('.wizard-coat');
var setupWizardEyes = document.querySelector('.wizard-eyes');
var form = document.querySelector('.setup-wizard-form');
var setupButton = document.querySelector('.setup-submit');
var dialogHandler = setupDialogElement.querySelector('.upload');

  
// Открытие/закрытие диалогового окна 

setupOpen.addEventListener('click', () => {
  openPopup();
  setupButton.addEventListener('click', function(evt) {
      evt.preventDefault();
      var formToSend = new FormData(form);
      window.backend.save(formToSend, successFormSendHandler, errorFormSendHandler);
      closePopup();
  });
});
  
setupClose.addEventListener('click', () => {
  closePopup();
});

setupOpen.addEventListener('keydown', (evt) => {
  if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
  }
});
  
setupClose.addEventListener('keydown', (evt) => {
    if (evt.keyCode === ENTER_KEYCODE) {
        closePopup();
    }
});
  
function openPopup() {
    setupDialogElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupWizardEyes.addEventListener('click', window.onWizardClickHandler.onWizardEyesClick);
    setupWizardCoat.addEventListener('click', window.onWizardClickHandler.onWizardCoatClick);
    setupFireBall.addEventListener('click', window.onWizardClickHandler.onFireballClick);
}
  
function closePopup() {
  setupDialogElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupDialogElement.style.top = '80px';
  setupDialogElement.style.left = '951.5px';

  setupWizardEyes.removeEventListener('click', window.onWizardClickHandler.onWizardEyesClick);
  setupWizardCoat.removeEventListener('click', window.onWizardClickHandler.onWizardCoatClick);
  setupFireBall.removeEventListener('click', window.onWizardClickHandler.onFireballClick);
}
  
function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
    closePopup();
  }
}

  
// Отправка форм
  
var successFormSendHandler = function() {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: black; background-color: white;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';
  
  node.textContent = 'Форма отправлена!'; 
      
  document.body.insertAdjacentElement('afterbegin', node);
  
  setTimeout(() => {
    node.remove();
  }, 3000);

};
  
var errorFormSendHandler = function(errorMessage) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';
  
  node.textContent = errorMessage; 
      
  document.body.insertAdjacentElement('afterbegin', node);
  
  setTimeout(() => {
    node.remove();
  }, 3000);

};

// Перетаскивание диалогового окна

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

  var shift = {
    x: startCoords.x - moveEvt.clientX,
    y: startCoords.y - moveEvt.clientY
  };

  startCoords = {
    x: moveEvt.clientX,
    y: moveEvt.clientY
  };

  setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
  setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

 };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

  if (dragged) {
    var onClickPreventDefault = function (evt) {
      evt.preventDefault();
      dialogHandler.removeEventListener('click', onClickPreventDefault);
    };
    dialogHandler.addEventListener('click', onClickPreventDefault);
  }

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

})();
