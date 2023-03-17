'use strict';

(function() {

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content.querySelector('.setup-similar-item');
var setupDialogElement = document.querySelector('.setup');
var setupSimilar = setupDialogElement.querySelector('.setup-similar');
var similarList = setupDialogElement.querySelector('.setup-similar-list');


var renderWizards = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
};

window.render = function (data) {
    var takeNumber = data.length > 4 ? 4 : data.length;
    similarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderWizards(data[i]));
    }

    setupSimilar.classList.remove('hidden');
};

})();