const display = document.getElementById("display");
const previousDisplay = document.getElementById("previous-display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Clear
    if (value === "C") {
      currentInput = "";
      display.value = "";
      previousDisplay.textContent = "";
    }

    // Backspace
    else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    }

    // Equal
    else if (value === "=") {
      try {
        let expression = currentInput
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/%/g, "/100");

        // Division by zero check
        if (/\/0(?!\d)/.test(expression)) {
          display.value = "Cannot divide by 0";
          currentInput = "";
          return;
        }

        const result = eval(expression);

        previousDisplay.textContent = `${currentInput} =`;

        currentInput = result.toString();
        display.value = currentInput;

      } catch {
        display.value = "Error";
        currentInput = "";
      }
    }

    // Decimal point handling
    else if (value === ".") {
      const parts = currentInput.split(/[\+\-\×\÷]/);
      const lastPart = parts[parts.length - 1];

      if (!lastPart.includes(".")) {
        currentInput += ".";
        display.value = currentInput;
      }
    }

    // Normal input
    else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});
