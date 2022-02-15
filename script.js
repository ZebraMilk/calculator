

// Shortcut to assign grid-areas to each button
let btns = document.querySelectorAll(".btn");
btns.forEach(btn =>
  {
    btn.style.cssText = `grid-area: ${btn.id};`;
    btn.addEventListener("click", (e) => console.log(e.target.innerText));
  });
  
const operators = [...document.getElementsByClassName("operator")];
const numbers = [...document.getElementsByClassName("number")];
const clear = [...document.getElementById("clear")];
const backspace = [...document.getElementById("backspace")];
const equals = [...document.getElementById("equals")];
const decimal = [...document.getElementById("decimal")];

let userInput = 0;
let memory = null;
let operator = '~';
let result = 0

let resultDisplay = document.querySelector(".result");
let inputDisplay = document.querySelector("#input-display");
let operatorDisplay = document.querySelector(".operation");
let memoryDisplay = document.querySelector(".memory");



















function updateInput() {};

function updateResult() {};
function updateOperator() {};
function updateMemory() {};


// Restore all values to default
function clearAll() {
  userInput = 0;
  memory = null;
  operator = '~';
};
  
function add (numA, numB) {return numA + numB};

function subtract (numA, numB) {return numA - numB};

function multiply (numA, numB) {return numA * numB};

function divide (numA, numB) {return numA / numB};

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