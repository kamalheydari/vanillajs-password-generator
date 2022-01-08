//? Get Elements
const rangeCharacters = getElement("range-char");
const numberCharacters = getElement("number-char");
const formContainer = getElement("password-form");
const numberElm = getElement("numbers");
const symbolsElm = getElement("symbols");
const uppercaseElm = getElement("uppercase");
const passwordDisplay = getElement("password-display");
const passwordIcon = getElement("password-icon");

//? Synchronizing Range And Number Inputs
rangeCharacters.addEventListener("input", syncCharAmount);
numberCharacters.addEventListener("input", syncCharAmount);

function syncCharAmount(e) {
  const valueAmount = e.target.value;
  rangeCharacters.value = valueAmount;
  numberCharacters.value = valueAmount;
}

const lowercaseCharCodes = charArrayRange(97, 122);
const numberCharCodes = charArrayRange(48, 57);
const symbolCharCodes = charArrayRange(33, 47);
const uppercaseCharCodes = charArrayRange(65, 90);

//? Generating Password On Submit
formContainer.addEventListener("submit", function (e) {
  e.preventDefault();

  const characterAmount = numberCharacters.value;
  const includeUppercase = uppercaseElm.checked;
  const includeNumbers = numberElm.checked;
  const includeSymbols = symbolsElm.checked;

  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  passwordDisplay.innerText = password;
});

//? Copy Password
passwordIcon.addEventListener("click", function () {
  const value = passwordDisplay.textContent;
  navigator.clipboard.writeText(value);
  alert("password copied to clipboard");
});

//! HANDLER FUNCTIONS
function getElement(selector) {
  const element = document.getElementById(selector);

  if (element) return element;

  throw new Error(`please check '${selector}' selector, no such element exist`);
}

function charArrayRange(start, finish) {
  let array = [];
  for (let i = start; i <= finish; i++) {
    array.push(i);
  }
  return array;
}

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = lowercaseCharCodes;
  if (includeNumbers) charCodes = charCodes.concat(numberCharCodes);
  if (includeSymbols) charCodes = charCodes.concat(symbolCharCodes);
  if (includeUppercase) charCodes = charCodes.concat(uppercaseCharCodes);

  const passwordCharacters = [];
  for (let j = 0; j < characterAmount; j++) {
    let characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}
