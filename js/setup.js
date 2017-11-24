'use strict';

var wizardFirsNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];
var wizardSecondNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'];
var wizardCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];
var wizardEyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardNumbers = 4;
var wizardNames = (function () {
  var randomNames = [];
  for (var i = 0; i < wizardNumbers; i++) {
    var firstIndex = Math.floor(Math.random() * wizardFirsNames.length);
    var secondIndex = Math.floor(Math.random() * wizardSecondNames.length);
    randomNames[i] = wizardFirsNames[firstIndex] + ' ' + wizardSecondNames[secondIndex];
    wizardFirsNames.splice(firstIndex, 1);
    wizardSecondNames.splice(secondIndex, 1);
  }
  return randomNames;
})();

var wizards = (function () {
  var wizardsList = [];
  for (var i = 0; i < wizardNumbers; i++) {
    wizardsList [i] = {
      name: wizardNames[i],
      coatColor: wizardCoatColors[Math.floor(Math.random() * wizardCoatColors.length)],
      eyesColor: wizardEyeColors[Math.floor(Math.random() * wizardEyeColors.length)]
    };
  }
  return wizardsList;
})();

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var wizardTemplate =  document.querySelector('#similar-wizard-template');
var similarWizardTemplate =
  wizardTemplate.content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
