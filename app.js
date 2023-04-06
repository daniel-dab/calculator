const keyboards = document.querySelectorAll('.calculatorBox__keyboard div');
let mainDisplay = document.querySelector('.calculatorBox__display--down');
let topDisplay = document.querySelector('.calculatorBox__display--top');
let settingNewNumber = false;

function addListeners() {
    for (let object of keyboards) {
        object.addEventListener('click', (event) => {
            if (event.target.textContent.trim() != "") {
                mainDisplayHandler(event.target.textContent.trim());
            } else {
                if (event.target.id === "multiply") {
                    iconClickHandler('multiply');
                } else iconClickHandler('backspace');
            }
        }, true)
    }
    window.addEventListener('keydown', (event) => {
        keyboardHandler(event);
    })
}

function iconClickHandler(iconValue) {
    if (iconValue === 'backspace') {
        mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    } else {
        topDisplayHandler(' * ');
    }
}

function keyboardHandler(event) {
    const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    mainDisplayHandler(key.textContent.trim());
}

function topDisplayHandler(operator) {
    topDisplay.textContent = mainDisplay.textContent + operator;
    settingNewNumber = true;
}

function mainDisplayHandler(symbol) {
    if (settingNewNumber) {
        mainDisplay.textContent = '';
        mainDisplay.textContent += symbol;
        settingNewNumber = false;
    } else if (!isNaN(symbol)) {
        if (parseInt(mainDisplay.textContent) === 0) mainDisplay.textContent = symbol;
        else if (parseInt(mainDisplay.textContent) > 0) mainDisplay.textContent += symbol;
    } else {
        const firstNumber = parseFloat(topDisplay.textContent.trim().slice(0, -1).trim());
        if (symbol === '=') {
            const operator = topDisplay.textContent.trim().charAt(topDisplay.textContent.length - 2);
            function operatorSupportHandler(result) {
                topDisplay.textContent += mainDisplay.textContent;
                mainDisplay.textContent = result;
            }
            let result;
            switch (operator) {
                case '*':
                    result = parseFloat(mainDisplay.textContent) * firstNumber;
                    operatorSupportHandler(result);
                    break;
                case '/':
                    result = firstNumber / parseInt(mainDisplay.textContent);
                    operatorSupportHandler(result);
                    break;
                case '-':
                    result = firstNumber - parseInt(mainDisplay.textContent);
                    operatorSupportHandler(result);
                    break;
                case '+':
                    result = firstNumber + parseInt(mainDisplay.textContent);
                    operatorSupportHandler(result);
                    break;
                case '%':
                    result = firstNumber % parseInt(mainDisplay.textContent);
                    operatorSupportHandler(result);
                    break;
            }
        } else if (symbol === 'C') {
            topDisplay.textContent = '';
            mainDisplay.textContent = 0;
        } else if (symbol === ',') {
            mainDisplay.textContent += '.';
        } else if (symbol === '+/-') {
            mainDisplay.textContent = parseInt(mainDisplay.textContent) * -1;
        } else if (symbol === '+') {
            topDisplayHandler(' + ')
        } else if (symbol === '-') {
            topDisplayHandler(' - ')
        } else if (symbol === '/') {
            topDisplayHandler(' / ')
        } else if (symbol === '%') {
            topDisplayHandler(' % ');
        }
    }
}
addListeners();