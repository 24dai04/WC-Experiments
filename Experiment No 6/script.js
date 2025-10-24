// simpleCalculator.js

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(questionText) {
  return new Promise((resolve) => {
    readline.question(questionText, (answer) => resolve(answer));
  });
}

async function runCalc() {
  try {
    const rawNum1 = await prompt("Please type the first number: ");
    const rawNum2 = await prompt("Please type the second number: ");
    const op = await prompt("Choose an operator (+, -, *, /): ");

    const number1 = parseFloat(rawNum1);
    const number2 = parseFloat(rawNum2);

    if (isNaN(number1) || isNaN(number2)) {
      console.log("🚫 One or both inputs are not valid numbers.");
      readline.close();
      return;
    }

    let result;

    switch (op.trim()) {
      case "+":
        result = number1 + number2;
        break;
      case "-":
        result = number1 - number2;
        break;
      case "*":
        result = number1 * number2;
        break;
      case "/":
        if (number2 === 0) {
          console.log("🚫 Error: Division by zero is undefined.");
          readline.close();
          return;
        }
        result = number1 / number2;
        break;
      default:
        console.log("🚫 Operator not recognized! Please use +, -, *, or /.");
        readline.close();
        return;
    }

    console.log(`\n🎯 Result: ${number1} ${op} ${number2} = ${result}`);

  } catch (error) {
    console.error("Unexpected error:", error);
  } finally {
    readline.close();
  }
}

runCalc();
