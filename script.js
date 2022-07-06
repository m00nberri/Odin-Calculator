let memory = '';
let buttons = document.getElementsByTagName('button');

(Array.from(buttons)).forEach(button => {
    button.addEventListener('mousedown', buttonHandler);
})

function buttonHandler(e) {
    if (e.target.classList.contains('number')) {
        numberPress(e.target);
    }
    else if (e.target.classList.contains('specialOperator')) {
        specialOperatorPress(e.target);
    }
    else if (e.target.classList.contains('operator')) {
        operatorPress(e.target);
    }
    else if (e.target.classList.contains('equals')) {
        equalsPress();
    }
    else if (e.target.id === 'del') {
        delPress();
    }
    else if (e.target.id === 'clear') {
        clearPress();
    }
    else {
        alert('idk what you button you pressd')
    }
}

let workingData = {
    left: '',
    right: '',
    operator: '',
    operatorDisplay: '',
}

let workingDisplay = document.getElementById('workingLine');
function updateDisplay() {
    workingDisplay.textContent = `${workingData.left}${workingData.operatorDisplay}${workingData.right}`;
}

let resultDisplay = document.getElementById("resultLine");

function updateResult(value) {
    resultDisplay.textContent = value;
}

clearPress();
let inputSide = 'left'

function checkSide() {
    if (workingData.operator === '') {
        inputSide = 'left';
    }
    else if (workingData.operator !== '') {
        inputSide = 'right';
    }
}

function numberInput(value) {
    if (inputSide === 'left') {
        if (value === 'check') {
            return workingData.left;
        }
        else {
            return workingData.left += value;
        }
    }
    else if (inputSide === 'right') {
        if (value === 'check') {
            return workingData.right;
        }
        else {
            return workingData.right += value;
        }
    }
}

function numberPress(button) {
    checkSide();
    if (button.id === 'decimal') {
        if ((numberInput('check').split('.')).length >= 2) {
            alert('you only get one decmal')
        }
        else {
            numberInput(button.textContent);
            updateDisplay();
        }
    }
    else {
        numberInput(button.textContent);
        updateDisplay();
    }
}

function specialOperatorPress(button) {
    checkSide();
    if (inputSide === 'left' && workingData.left !== '') {
        workingData[inputSide] = specialOperation(button.id).toFixed(4);
        updateDisplay();   
    }
    else if (inputSide === 'left' && workingData.left === '') {
        if (memory !== '') {
            workingData.left = memory;
            workingData[inputSide] = specialOperation(button.id).toFixed(4);
            updateDisplay();   
        }
        else if (memory === '') {
            alert('Please enter a number')
        }
    }
    else if (inputSide === 'right' && workingData.right !== '') {
        updateResult(doCalculation().toFixed(4));
        workingData.left = memory;
        inputSide = 'left';
        workingData.left = specialOperation(button.id);
        updateDisplay();
    }
    else if (inputSide === 'right' && workingData.right === '') {
        if (memory !== '') {
            inputSide = 'left';
            workingData.left = memory;
            workingData[inputSide] = specialOperation(button.id).toFixed(4);
            updateDisplay();   
        }
        else if (memory === '') {
            alert('Please enter a number')
        }
    }
}

function specialOperation(operator) {
    switch (operator) {
        case 'positiveNegative':
            console.log(parseFloat(workingData[inputSide]*(-1)))
            return parseFloat(workingData[inputSide]*(-1));
        case 'squareRoot':
            if (workingData[inputSide] < 0) {
                alert('Error: Negative Squareroot')
            }
            else {
                return parseFloat(Math.sqrt(workingData[inputSide]));
            }
        case 'percent':
            return parseFloat(workingData[inputSide]/100);
    }
}

function equalsPress() {
    checkSide();
    if (inputSide === 'left') {
        alert('Please input an operator and a second number')
    }
    else if (inputSide === 'right') {
        if (workingData.right === '') {
            alert('Please enter a second number')
        }
        else {
            updateResult(doCalculation().toFixed(4));
        }
    }
}

function doCalculation() {
    let result = null;
    switch (workingData.operator) {
        case 'divide':
            result = parseFloat(workingData.left/workingData.right);
            break;
        case 'multiply':
            result = parseFloat(workingData.left*workingData.right);
            break;
        case 'minus':
            result = parseFloat(workingData.left-workingData.right);
            break;
        case 'plus':
            result = parseFloat(parseFloat(workingData.left)+parseFloat(workingData.right));
            break;
    }
    workingData.left = workingData.right = workingData.operator = workingData.operatorDisplay = '';
    memory = result;
    return result;
}

function operatorPress(button) {
    checkSide();
    if (inputSide === 'left' && workingData.left !== '') {
        workingData.operator = button.id;
        workingData.operatorDisplay = button.textContent;
        updateDisplay();
    }
    else if (inputSide === 'left' && workingData.left === '') {
        if (memory !== '') {
            workingData.left = memory;
            workingData.operator = button.id;
            workingData.operatorDisplay = button.textContent;
            updateDisplay();
        }
        else if (memory === '') {
            alert('Please enter a number')
        }
    }
    else if (inputSide === 'right' && workingData.right === '') {
        workingData.operator = button.id;
        workingData.operatorDisplay = button.textContent;
        updateDisplay();
    }
    else if (inputSide === 'right' && workingData.right !== '') {
        updateResult(doCalculation().toFixed(4));
        workingData.left = memory;
        inputSide = 'left';
        workingData.operator = button.id;
        workingData.operatorDisplay = button.textContent;
        updateDisplay();
    }
}

function delPress() {
    checkSide();
    if (inputSide === 'left' && workingData.left !== '') {
        workingData.left = String(workingData.left).slice(0,-1);
        updateDisplay();
    }
    else if (inputSide === 'left' && workingData.left === '') {
       null;
    }
    else if (inputSide === 'right' && workingData.right === '') {
        workingData.operator = '';
        workingData.operatorDisplay = '';
        updateDisplay();
    }
    else if (inputSide === 'right' && workingData.right !== '') {
        workingData.right = String(workingData.right).slice(0,-1);
        updateDisplay();
    }
}

function clearPress() {
    workingData.left = workingData.right = workingData.operator = workingData.operatorDisplay = '';
    updateDisplay();
    updateResult('');
}