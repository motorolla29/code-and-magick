'use strict';
(function() {
    var setupFireBall = document.querySelector('.setup-fireball-wrap');
    var setupWizardCoat = document.querySelector('.wizard-coat');
    var setupWizardEyes = document.querySelector('.wizard-eyes');
    var form = document.querySelector('.setup-wizard-form');
    var wizzardStyleOptions = {
        WIZARD_COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
        'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    
        WIZARD_EYES_COLORS: ['black', 'red', 'blue', 'yellow',
        'green'],
    
        FIRE_BALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', 
        '#e848d5', '#e6e848']
    };

    var wizardsArr = [];

    var eyesColor = setupWizardEyes.style.fill,
        coatColor = setupWizardCoat.style.fill,
        fireballColor = setupFireBall.style.background;
    
    var getRank = function(wizard) {
        var rank = 0;
    
        if (wizard.colorCoat === coatColor) {
            rank += 2;
        }
        if (wizard.colorEyes === eyesColor) {
            rank += 1;
        }
    
        return rank;
    };
    
    var namesComparator = function(left, right) {
        if (left > right) {
            return 1;
        } else if (left < right) {
            return -1;
        } else {
            return 0;
        }
    };
    
    var updateWizards = function() {
        window.render(wizardsArr.sort(function(left, right) {
            var rankDiff = getRank(right) - getRank(left);
            if (rankDiff === 0) {
                rankDiff = namesComparator(left.name, right.name);
            }
            return rankDiff;
        }));
    };
    
    var successHandler = function (data) {
        wizardsArr = data;
        updateWizards();
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

//  Обработчики кликов на глаза и куртку

    
    window.onWizardClickHandler = {
        onWizardEyesClick: function() {
            eyesColor = wizzardStyleOptions.WIZARD_EYES_COLORS[getRandomNumber(5)];
            setupWizardEyes.style.fill = eyesColor;
            form.querySelector('.setup-player input[name="eyes-color"]').setAttribute('value', eyesColor);
            window.debounce(updateWizards);
        },
        
    
        onWizardCoatClick: function() {
            coatColor = wizzardStyleOptions.WIZARD_COAT_COLORS[getRandomNumber(6)];
            setupWizardCoat.style.fill = coatColor;
            form.querySelector('.setup-player input[name="coat-color"]').setAttribute('value', coatColor);
            window.debounce(updateWizards);
        },
    
    
        onFireballClick: function() {
            fireballColor = wizzardStyleOptions.FIRE_BALL_COLORS[getRandomNumber(5)];
            setupFireBall.style.background = fireballColor;
            form.querySelector('.setup-fireball-wrap input[name="fireball-color"]').setAttribute('value', fireballColor);
        }
    };
    

    
    function getRandomNumber(maxNumber) {
        return Math.floor(Math.random() * maxNumber++);
    }

})();

