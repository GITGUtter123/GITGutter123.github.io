const display = document.getElementById('display');

// Append value to the display
function appendValue(value) {
  const lastChar = display.value.slice(-1);

  // Prevent multiple operators in a row
  if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(value)) {
    return;
  }

  display.value += value;
}

// Clear the display
function clearDisplay() {
  display.value = '';
}

// Evaluate the result
function calculateResult() {
  try {
    const result = Function(`return ${display.value}`)();
    display.value = result;
  } catch (e) {
    display.value = 'Error';
  }
}

// Handle button clicks
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    const func = button.getAttribute('data-function');

    if (value) {
      appendValue(value);
    } else if (func) {
      display.value += `${func}(`;
    }
  });
});

// Clear button
document.getElementById('clear').addEventListener('click', clearDisplay);

// Equals button
document.getElementById('equals').addEventListener('click', calculateResult);
