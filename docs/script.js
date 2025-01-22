document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".button");

  let currentInput = ""; // Stores the current input or expression
  let lastResult = "";  // Stores the last calculated result

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.value;
      const func = button.dataset.function;

      if (func) {
        // Handle trigonometric functions
        handleFunction(func);
      } else if (value) {
        handleInput(value);
      } else if (button.id === "clear") {
        clearDisplay();
      } else if (button.id === "equals") {
        calculateResult();
      }
    });
  });

  function handleInput(value) {
    // Prevent multiple operators in a row
    if (isOperator(value) && isOperator(currentInput.slice(-1))) {
      currentInput = currentInput.slice(0, -1); // Replace the last operator
    }

    // Append value to the current input
    currentInput += value;
    updateDisplay(currentInput);
  }

  function calculateResult() {
    try {
      // Evaluate the expression using JavaScript's `eval` (safe handling recommended)
      const sanitizedInput = sanitizeInput(currentInput);
      const result = eval(sanitizedInput);

      currentInput = result.toString();
      lastResult = result;
      updateDisplay(currentInput);
    } catch (error) {
      updateDisplay("Error");
      currentInput = "";
    }
  }

  function handleFunction(func) {
    try {
      const number = parseFloat(currentInput || lastResult || "0");
      const result = eval(`${func}(${number})`);
      currentInput = result.toString();
      updateDisplay(currentInput);
    } catch (error) {
      updateDisplay("Error");
      currentInput = "";
    }
  }

  function clearDisplay() {
    currentInput = "";
    updateDisplay("0");
  }

  function updateDisplay(value) {
    display.value = value;
  }

  function isOperator(value) {
    return ["+", "-", "*", "/"].includes(value);
  }

  function sanitizeInput(input) {
    // Ensure the input only contains valid characters (numbers, operators, decimal points)
    return input.replace(/[^0-9+\-*/.]/g, "");
  }
});
