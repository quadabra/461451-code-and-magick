'use strict';

var wizardFirsNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSecondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyeColors = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = (function (firstNames, secondNames, coatColors, eyeColors, wizardsAmount) {
  var wizardsList = [];
  for (var i = 0; i < wizardsAmount; i++) {
    wizardsList [i] = {
      name: firstNames[Math.round(Math.random() * firstNames.length)] + ' ' + secondNames[Math.round(Math.random() * secondNames.length)],
      coatColor: coatColors[Math.round(Math.random() * coatColors.length)],
      eyeColor: eyeColors[Math.round(Math.random() * eyeColors.length)]
    };
  }
  return wizardsList;
})(wizardFirsNames, wizardSecondNames, wizardCoatColors, wizardEyeColors, 4);

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
