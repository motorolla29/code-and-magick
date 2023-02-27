'use strict';

var setupBlock = document.querySelector('.setup');
var similarList = setupBlock.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content.querySelector('.setup-similar-item');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupFireBall = document.querySelector('.setup-fireball-wrap');
var setupWizardCoat = document.querySelector('.wizard-coat');
var setupWizardEyes = document.querySelector('.wizard-eyes');
var form = document.querySelector('.setup-wizard-form');

///////////////////////////////////////////////// Data

var WIZARD_NAMES = ['Иван','Хуан Себастьян','Мария', 'Кристоф',
'Виктор','Юлия','Люпита','Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц',
'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow',
'green'];

var FIRE_BALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', 
'#e848d5', '#e6e848'];

///////////////////////////////////////////////

setupBlock.querySelector('.setup-similar').classList.remove('hidden');

renderRandomWizardsFragment(4);

// Events

setupOpen.addEventListener('click', (evt) => {
    openPopup();
});

setupClose.addEventListener('click', (evt) => {
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
 
 
function renderRandomWizard() {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = WIZARD_NAMES[getRandomNumber(8)] + ' ' + WIZARD_SURNAMES[getRandomNumber(8)];
    wizardElement.querySelector('.wizard-coat').style.fill = WIZARD_COAT_COLORS[getRandomNumber(6)];
    wizardElement.querySelector('.wizard-eyes').style.fill = WIZARD_EYES_COLORS[getRandomNumber(5)];
 
    return wizardElement;
}

 function renderRandomWizardsFragment(WizardsQuantity) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WizardsQuantity; i++) {
        fragment.appendChild(renderRandomWizard());
    }

    similarList.appendChild(fragment);
}

function openPopup() {
    setupBlock.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupFireBall.addEventListener('click', onFireballClick);
    setupWizardCoat.addEventListener('click', onWizardCoatClick);
    setupWizardEyes.addEventListener('click', onWizardEyesClick);
}

function closePopup() {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupFireBall.removeEventListener('click', onFireballClick);
    setupWizardCoat.removeEventListener('click', onWizardCoatClick);
    setupWizardEyes.removeEventListener('click', onWizardEyesClick);
}

function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
        closePopup();
    }
}



function onWizardEyesClick() {
    var eyesColor = WIZARD_EYES_COLORS[getRandomNumber(5)];
    setupWizardEyes.style.fill = eyesColor;
    form.querySelector('.setup-player input[name="eyes-color"]').setAttribute('value', eyesColor);
}

 
function onWizardCoatClick() {
    var coatColor = WIZARD_COAT_COLORS[getRandomNumber(6)];
    setupWizardCoat.style.fill = coatColor;
    form.querySelector('.setup-player input[name="coat-color"]').setAttribute('value', coatColor);

}


function onFireballClick() {
    var fireballColor = FIRE_BALL_COLORS[getRandomNumber(5)];
    setupFireBall.style.background = fireballColor;
    form.querySelector('.setup-fireball-wrap input[name="fireball-color"]').setAttribute('value', fireballColor);
}