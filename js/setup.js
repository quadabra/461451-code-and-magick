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
      'name': wizardNames[i],
      'coatColor': wizardCoatColors[Math.floor(Math.random() * wizardCoatColors.length)],
      'eyesColor': wizardEyeColors[Math.floor(Math.random() * wizardEyeColors.length)]
    };
  }
  return wizardsList;
})();

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var wizardTemplate = document.querySelector('#similar-wizard-template');
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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

var wizardFireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'];

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = wizardCoatColors[Math.floor(Math.random() * wizardCoatColors.length)];
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = wizardEyeColors[Math.floor(Math.random() * wizardEyeColors.length)];
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.backgroundColor = wizardFireballColors[Math.floor(Math.random() * wizardFireballColors.length)];
});
