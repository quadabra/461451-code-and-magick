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
var generateWizardNames = function (arrFirst, arrSecond, amount) {
  var randomNames = [];
  for (var i = 0; i < amount; i++) {
    var firstIndex = Math.floor(Math.random() * arrFirst.length);
    var secondIndex = Math.floor(Math.random() * arrSecond.length);
    randomNames[i] = arrFirst[firstIndex] + ' ' + arrSecond[secondIndex];
    arrFirst.splice(firstIndex, 1);
    arrSecond.splice(secondIndex, 1);
  }
  return randomNames;
};

var wizardNames = generateWizardNames(wizardFirsNames, wizardSecondNames, wizardNumbers);

var generateWizards = function () {
  var wizardsList = [];
  for (var i = 0; i < wizardNumbers; i++) {
    wizardsList [i] = {
      'name': wizardNames[i],
      'coatColor': wizardCoatColors[Math.floor(Math.random() * wizardCoatColors.length)],
      'eyesColor': wizardEyeColors[Math.floor(Math.random() * wizardEyeColors.length)]
    };
  }
  return wizardsList;
};

var wizards = generateWizards();

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
var userNameInput = setup.querySelector('.setup-user-name');

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

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
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

var randomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = randomArrayElement(wizardCoatColors);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = randomArrayElement(wizardEyeColors);
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.backgroundColor = randomArrayElement(wizardFireballColors);
});
