const add = (numA, numB) => numA + numB;

const subtract = (numA, numB) => numA - numB;

const multiply = (numA, numB) => numA * numB;

const divide = (numA, numB) => numA / numB;

const operate = function(operator, numA, numB) {
  if(operator == "+") {
    return add(numA, numB);
  } else if (operator == "-") {
    return subtract(numA, numB);
  } else if (operator == "*") {
    return multiply(numA, numB);
  } else if (operator == "/") {
    return divide(numA, numB);
  }
};



const btns = document.querySelectorAll(".btn");
btns.forEach(btn =>
  {
    btn.style.cssText = `grid-area: ${btn.id};`
  })