let display = document.getElementById("display");
let equationBar = document.getElementById("equation");
let expression = "";
let any = /\d+/; 

function appendCharacter(char) {
    if (expression.length > 22) {
        return;
    }
    if (char === "*") {
        char = "x";
    }
    if (expression === "Error") {
        // Clear the error message if a number is pressed after an error
        expression = "";
    }
    if (display.value !== "") {
        // Clear the display and start a new expression when the answer is being displayed
        clearDisplay();
    }
    if (/\d/.test(char)) {
        // If the character is a digit, handle it differently
        if (expression !== "" && /\d$/.test(expression)) {
            // If the last character is a digit, append the new character directly
            expression += char;
        } else {
            // Otherwise, append a space before appending the new character
            expression += " " + char;
        }
    } else {
        // If the character is an operator, append a space before and after
        expression += " " + char + " ";
    }
    updateDisplay();
}

function updateDisplay() {
    let formattedExpression = expression.replace(/\*/g, "x");
    equationBar.textContent = formattedExpression;
    equationBar.style.padding = "10px"; // Add constant padding
}

function clearDisplay() {
    display.value = ""; // Clear the display
    expression = ""; // Clear the expression
    updateDisplay(); // Update the equation bar
}

function calculate() {
    
    try {
        // Check for division by zero or invalid division expressions
        if (/(\d+\/0(?!\d))|(0+\/\d+)/.test(expression)) {
            throw new Error("Division by zero error");
        }

        if (expression.includes("/", any) || expression.includes(any, "/")) {
            throw new Error("Division by zero error");
        }
        
        
        let result = eval(expression.replace(/x/g, "*"));
        // Display the result in the display area
        display.value = result;
        // Clear the expression
        expression = "";
        updateDisplay(); // Update the equation bar
    } catch (error) {
        let errorMessage = error.message; // Get the error message
        console.log(errorMessage); // Log the error message to the console
        display.value = "Error"; // Display the error message
        expression = "Error"; // Set expression to "Error" for displaying in the equation bar
        updateDisplay(); // Update the equation bar
    }
}

// Add event listener for the Backspace key
document.addEventListener("keydown", function(event) {
    if (event.key === "Backspace") {
        clearDisplay();
    }
});

// Add event listener for the button to clear the answer
let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function() {
    clearDisplay();
});

updateDisplay(); // Initialize display with empty string
