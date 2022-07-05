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
    workingDisplay.textContent = `${workingData.left}${workingData.operator}${workingData.right}`;
}

let resultDisplay = document.getElementById("resultLine");

function updateResult(value) {
    resultDisplay.textContent = value;
    memory = value;
}

function errorCheck() {
    if (((workingData.left).split('.')).length > 2 || ((workingData.right).split('.')).length > 2) {
        alert('you broke it :(');
    }
    else if (((workingData.left).split('.'))[1] === '' || ((workingData.right).split('.'))[1] === '') {
        alert('you broke it :(');
    }
}

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
    if (inputSide === 'left') {
        workingData[inputSide] = specialOperation(button.id).toFixed(4);
        updateDisplay();   
    }
    else if (inputSide === 'right' && workingData.right !== '') {
        updateResult(doCalculation());
        workingData.left = memory;
        inputSide = 'left';
        specialOperation(button.id);
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
            workingData.left, workingData.right, workingData.operator = '';
            updateDisplay();
        }
    }
}

function doCalculation() {
    switch (workingData.operator) {
        case 'divide':
            return parseFloat(workingData.left/workingData.right);
        case 'multiply':
            return parseFloat(workingData.left*workingData.right);
        case 'minus':
            return parseFloat(workingData.left-workingData.right);
        case 'plus':
            return parseFloat(workingData.left+workingData.right);
    }
}