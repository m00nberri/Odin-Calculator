let buttons = document.getElementsByTagName('button');

(Array.from(buttons)).forEach(button => {
    button.addEventListener('mousedown', buttonHandler);
})

function buttonHandler(e) {
    newCalc(e);
}

let workingData = {
    left: '',
    right: '',
    operator: '',
    operatorDisplay: '',
}
let workingDisplay = document.getElementById('workingLine');
function updateDisplay() {
    workingDisplay.textContent = `${workingData.left} ${workingData.operatorDisplay} ${workingData.right}`;
}

let resultDisplay = document.getElementById("resultLine");

function updateResult(value) {
    resultDisplay.textContent = value;
}

let memory = '';

function newCalc(e) {
    if (e.target.classList.contains('number') && workingData.operator === '') {
        workingData.left += e.target.innerText;
        updateDisplay();
    }
    else if (e.target.classList.contains('number') && workingData.operator !== '') {
        workingData.right += e.target.innerText;
        updateDisplay();
    }

    else if (e.target.classList.contains('operator') && workingData.left === '') {
        null;
    }
    else if (e.target.classList.contains('operator') && workingData.right === '') {
        workingData.operatorDisplay = e.target.innerText;
        workingData.operator = e.target.id;
        updateDisplay();
    }
    else if (e.target.classList.contains('operator') && workingData.right !== '') {
        memory = calculate(workingData.left,workingData.operator,workingData.right);
        updateResult(memory);
        workingData.operatorDisplay = e.target.innerText;
        workingData.operator = e.target.id;
        updateDisplay();
    }

    else if (e.target.classList.contains('specialOperator') && workingData.right === '') {
        workingData.operatorDisplay = e.target.innerText;
        workingData.operator = e.target.id;
        memory = calculate(workingData.left,workingData.operator,workingData.right);
        updateResult(memory);
    }
    else if (e.target.classList.contains('specialOperator') && workingData.right !== '') {
        memory = calculate(workingData.left,workingData.operator,workingData.right);
        workingData.operator = e.target.id;
        memory = calculate(memory,workingData.operator,workingData.right);
        updateResult(memory);
        
    }

    else if (e.target.classList.contains('equals') && workingData.left !== '' && workingData.right === '') {
        memory = workingData.left;
        updateWorkingData(memory);
        updateResult(memory);
    }
    else if (e.target.classList.contains('equals') && workingData.left !== '' && workingData.right !== '') {
        memory = calculate(workingData.left,workingData.operator,workingData.right);
        updateResult(memory);
    }
}

function calculate(left,operator,right) {
    errorCheck();
    if (operator === ('positiveNegative' || 'squareRoot' || 'percent')) {
        return specialOperation(left, operator);
    }
    else if ((left && right && operator) !== '') {
        return operation(left, operator, right);
    }
    else {
        alert('no calc');
    }
    workingDisplay.textContent = '';
}

function operation(left, operator, right) {
    switch(operator) {
        case 'divide':
        workingData.operator = '';
        return parseFloat(left/right);
        case 'multiply':
        workingData.operator = '';
        return parseFloat(left*right);
        case 'minus':
        workingData.operator = '';
        return parseFloat(left-right);
        case 'plus':
        workingData.operator = '';
        return parseFloat(left+right);
    }
}

function specialOperation(value, operator) {
    alert('why');
    switch(operator) {
        case 'positiveNegative':
            workingData.operator = '';
            return parseFloat((value*(-1)));
        case 'squareRoot':
            workingData.operator = '';
            return parseFloat(Math.sqrt(value));
        case 'percent':
            workingData.operator = '';
            return parseFloat(value/100);
    }
}

function errorCheck() {
    if (((workingData.left).split('.')).length > 2 || ((workingData.right).split('.')).length > 2) {
        alert('you broke it :(');
    }
    else if (((workingData.left).split('.'))[1] === '' || ((workingData.right).split('.'))[1] === '') {
        alert('you broke it :(');
    }
}

function updateWorkingData(value) {
    workingData.operatorDisplay = '';
    workingData.operator = '';
    workingData.right = '';
    workingDisplay.textContent = `${workingData.left} ${workingData.operatorDisplay} ${workingData.right}`;
}
