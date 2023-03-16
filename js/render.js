'use strict';

(function() {

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content.querySelector('.setup-similar-item');
var setupDialogElement = document.querySelector('.setup');
var similarList = setupDialogElement.querySelector('.setup-similar-list');
var wizardsArr = [];
var wizzardStyleOptions = {

};

var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
        var wizardElement = similarWizardTemplate.cloneNode(true);

        wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
        wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].colorCoat;
        wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].colorEyes;

        fragment.appendChild(wizardElement);
    }

    similarList.appendChild(fragment);
    
    setupDialogElement.querySelector('.setup-similar').classList.remove('hidden');
};

var successHandler = function (data) {
    wizardsArr = data;
    renderWizards(wizardsArr);
};
  
var errorHandler = function (errorMessage) {
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
  
window.backend.load(successHandler, errorHandler);

})();

