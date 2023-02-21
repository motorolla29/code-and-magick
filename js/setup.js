'use strict';

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

setupBlock.querySelector('.setup-similar').classList.remove('hidden');

var similarList = setupBlock.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content.querySelector('.setup-similar-item');



// Data
var WIZARD_NAMES = ['Иван','Хуан Себастьян','Мария', 'Кристоф',
'Виктор','Юлия','Люпита','Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц',
'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow',
'green'];

var getRandomNumber = function(maxNumber) {
   return Math.floor(Math.random() * maxNumber++);
};


var renderRandomWizard = function() {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = WIZARD_NAMES[getRandomNumber(8)] + ' ' + WIZARD_SURNAMES[getRandomNumber(8)];
    wizardElement.querySelector('.wizard-coat').style.fill = WIZARD_COATS_COLOR[getRandomNumber(6)];
    wizardElement.querySelector('.wizard-eyes').style.fill = WIZARD_EYES_COLOR[getRandomNumber(5)];

    return wizardElement;
};

var renderRandomWizardsFragment = function(WizardsQuantity) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WizardsQuantity; i++) {
        fragment.appendChild(renderRandomWizard());
    }

    similarList.appendChild(fragment);
};

renderRandomWizardsFragment(4);


