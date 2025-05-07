const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let operator = '';
let previousInput = '';

function updateDisplay() {
    display.textContent = currentInput;
}

// Add event listener for keydown events
document.addEventListener('keydown', (event) => {
    const key = event.key; // Get the key that was pressed

    if (!isNaN(key)) {
        // If numeric key is pressed
        if (currentInput === '0') {
            currentInput = key;
        } else {
            currentInput += key;
        }
        updateDisplay();
    } else if (key === 'Enter' || key === '=') {
        // Handle equal key
        calculate();
        updateDisplay();
    } else if (key === 'Backspace') {
        // Handle backspace
        currentInput = currentInput.slice(0, -1) || '0';
        updateDisplay();
    } else if (['+', '-', '*', '/'].includes(key)) {
        // Handle operator keys
        if (currentInput === '0') {
            return;
        }
        operator = key;
        previousInput = currentInput;
        currentInput = '';
    } else if (key === '%') {
        // Handle percent key
        percent();
        updateDisplay();
    } else if (key === '.') {
        // Handle decimal point
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const btnValue = button.textContent;

        if (button.id === 'all-clear') {
            currentInput = '0';
            operator = '';
            previousInput = '';
            updateDisplay();
        }
        else if (button.id === 'equals') {
            calculate();
            updateDisplay();
        }
        else if (button.classList.contains('operator')) {
            if (currentInput === '0') {
                return;
            }
            operator = btnValue;
            previousInput = currentInput;
            currentInput = '';
        }
        else if (button.id === 'percent') {
            percent();
            updateDisplay();
        }
        else if (button.id === 'negate') {
            if (currentInput !== '0') {
                currentInput = (parseFloat(currentInput) * -1).toString();
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }
        else if (button.id === 'decimal') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay();
            }
        }
        else {
            if (currentInput === '0') {
                currentInput = btnValue;
            } else {
                currentInput += btnValue;
            }
            updateDisplay();
        }
    });
});

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (operator === '') {
        return;
    }

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
}

function percent() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) / 100).toString();
    } else {
        currentInput = '0';
    }
}

function negate() {
    if (currentInput !== '0') {
        currentInput = (-parseFloat(currentInput)).toString();
    } else {
        currentInput = '0';
    }
}