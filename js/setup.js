'use strict';
(function() {
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
    
    
    function getRandomNumber(maxNumber) {
        return Math.floor(Math.random() * maxNumber++);
    }
    
    function openPopup() {
        setupDialogElement.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
    }
    
    function closePopup() {
        setupDialogElement.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);
        setupDialogElement.style.top = '80px';
        setupDialogElement.style.left = '951.5px';
    }
    
    function onPopupEscPress(evt) {
        if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
            closePopup();
        }
    }
    
    // Form send
    
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
})();
