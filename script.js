// Shortcut to assign grid-areas to each button
let btns = document.querySelectorAll(".btn");
btns.forEach(btn => btn.style.cssText = `grid-area: ${btn.id};`);

// Initilaize default display values
let userInput = 0;
let memory = 0;
let operator = '~';
let result = 0
// Used for tracking decimal places
let place = 0;

// Toggle for new userInput overwrite, used after an operator is clicked
let freezeInput = false;
// Toggle for whether there is a decimal in the userInput
let isFloat = false;

// Grab the 4 displays to play with later
const inputDisplay = document.querySelector("#input-display");
const operatorDisplay = document.querySelector(".operation");
const memoryDisplay = document.querySelector(".memory");
const resultDisplay = document.querySelector(".result");


// Grab all the different buttons to play with
const operators = [...document.getElementsByClassName("operator")];
const numbers = [...document.getElementsByClassName("number")];
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const equals = document.getElementById("equals");
const decimal = document.getElementById("decimal");

// Add event listeners to each category of button
operators.forEach(operator => {
  operator.addEventListener("click", (e) => updateOperator(e));
});
// KeyboardEvent.key Value === "*", "?", "-", "+"
numbers.forEach(number => {
  number.addEventListener("click", (e) => updateInput(e));
});
// KeyboardEvent.key Value === "0" - "9"
clear.addEventListener("click", () => clearAll());

backspace.addEventListener("click", () => backspaceChar());
// KeyboardEvent.key Value === "Backspace"
equals.addEventListener("click", () => updateResult());
// KeyboardEvent.key Value === "Enter"
decimal.addEventListener("click", () => makeFloat());
// KeyboardEvent.key Value "Decimal"


// Add event listeners to key-down events with specific keyIds
document.addEventListener("keydown", function(e) {
  if (isFinite(e.key)) {
    keyUpdateInput(e);
  } else if (e.key === "+" || e.keyValue === "-" || e.keyValue === "/" || e.keyValue === "*") {
    keyUpdateOperator(e);
  } else if (e.key === "Backspace") {
    backspaceChar();
  } else if (e.key === "Enter") {
    updateResult();
  } else if (e.key === ".") {
    makeFloat();
  }
})




// Shows the number the user has entered
function keyUpdateInput(e) {
  // Check if the last button clicked was an operator
  if (freezeInput === true) {
    userInput = 0;
    freezeInput = false;
  }
  // If it isn't a float, proceed normally
  if (!isFloat) {
    if (userInput === 0) {
      userInput += parseInt(e.key);
    } else {
      userInput = (userInput * 10) + parseInt(e.key);
    }
  }
  // If it is a float, user has clicked the decimal
  if (isFloat) {
    place ++;
    userInput += (parseInt(e.key) / 10 ** place);
    userInput = Math.round(userInput * (10 ** place)) / (10 ** place);
  } 
  updateInputDisplay();
};


// Shows the number the user has entered
function updateInput(e) {
  // Check if the last button clicked was an operator
  if (freezeInput === true) {
    userInput = 0;
    freezeInput = false;
  }
  // If it isn't a float, proceed normally
  if (!isFloat) {
    if (userInput === 0) {
      userInput += parseInt(e.target.innerText);
    } else {
      userInput = (userInput * 10) + parseInt(e.target.innerText);
    }
  }
  // If it is a float, user has clicked the decimal
  if (isFloat) {
    place ++;
    userInput += (parseInt(e.target.innerText) / 10 ** place);
    userInput = Math.round(userInput * (10 ** place)) / (10 ** place);
  } 
  updateInputDisplay();
};

function updateInputDisplay() {
  inputDisplay.innerText = `${userInput}`;
};


function updateResult() {
  // Calculates!
  result = operate(operator, memory, userInput);
  // Update the memory and displays only if the values are not undefined (from dividing by 0)
  if (memory && result) {
    memory = result;
    updateResultDisplay();
    updateMemoryDisplay();
  }
  if (!result) {
    result = 0;
  }
};

function updateResultDisplay() {
  resultDisplay.innerText = `${result}`;
};
// Updates the displayed operator and memory/result
function keyUpdateOperator(e) {
  place = 0;
  isFloat = false;
  // Gets a result if there is already an operator
  if (operator !== '~') {
    updateResult();
  } else {
    updateMemory();
  }
  operator = e.key;
  updateOperatorDisplay();
  // This allows the user to keep hitting operators without clearing their userInput
  freezeInput = true;
};

// Updates the displayed operator and memory/result
function updateOperator(e) {
  place = 0;
  isFloat = false;
  // Gets a result if there is already an operator
  if (operator !== '~') {
    updateResult();
  } else {
    updateMemory();
  }
  operator = e.target.innerText;
  updateOperatorDisplay();
  // This allows the user to keep hitting operators without clearing their userInput
  freezeInput = true;
};

function updateOperatorDisplay() {
  operatorDisplay.innerText = `${operator}`;
};

// Move userInput to Memory
function updateMemory() {
  memory = userInput;
  updateMemoryDisplay();
};

function updateMemoryDisplay() {
  memoryDisplay.innerText = `${memory}`;
};

function makeFloat() {
  if (!isFloat) {
    isFloat = true;
  };
}


// Update all displays
function updateDisplays() {
  updateMemoryDisplay();
  updateInputDisplay();
  updateOperatorDisplay();
  updateResultDisplay();
};

// Restore all values to default and updates displays
function clearAll() {
  userInput = 0;
  memory = 0;
  operator = '~';
  result = 0;
  place = 0;
  isFloat = false;
  updateDisplays();
};

function backspaceChar() {
  if (!isFloat) {
    userInput = Math.floor(userInput / (10));
  } else {
    let inputString = userInput.toString();
    let len = inputString.length;
    userInput = parseFloat(inputString.slice(0, len - 1));
  }
  if (place > 0) {
    place--;
  }
  if (place === 0) {
    isFloat = false;
  }
  updateInputDisplay();
};

function add (numA, numB) {return numA + numB};
function subtract (numA, numB) {return numA - numB};
function multiply (numA, numB) {return numA * numB};
function divide (numA, numB) {
  if (numB === 0) {
    alert("YOU SHALLL NOT PASSSSSSSSS!");
    return;
  } else {
    return numA / numB
  }
};

function operate(operator, numA, numB) {
  if(operator == "+") {
    return add(numA, numB);
  } else if (operator == "-") {
    return subtract(numA, numB);
  } else if (operator == "*") {
    return multiply(numA, numB);
  } else if (operator == "/") {
    return divide(numA, numB);
  } else{
    return '~';
  }
};