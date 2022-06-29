let buttons = document.getElementsByTagName('button');

(Array.from(buttons)).forEach(button => {
    button.addEventListener('mousedown', buttonHandler);
})

function buttonHandler(e) {
    if (memory === null) {
        newCalc(e);
    }
    else if (memory !== null) {
        continueCalc(e);
    }
}

let workingData = {
    left: '',
    right: '',
    operator: '',
}
let workingDisplay = document.getElementById('workingLine');
function updateDisplay() {
    workingDisplay.textContent = `${workingData.left} ${workingData.operator} ${workingData.right}`;
}

let memory = null;

function newCalc(e) {
    if (e.target.classList.contains('number') && workingData.operator === '') {
        workingData.left += e.target.innerText;
        updateDisplay();
        console.log(((workingData.left).split('.')).length)
    }

    else if (e.target.classList.contains('operator') && workingData.left === '') {
        null;
    }
    else if (e.target.classList.contains('operator') && workingData.right === '') {
        workingData.operator = e.target.innerText;
        updateDisplay();
    }
    else if (e.target.classList.contains('operator') && workingData.right !== '') {
        calculate(workingData.left,workingData.operator,workingData.right);
        workingData.operator = e.target.innerText;
        updateDisplay();
    }

    else if (e.target.classList.contains('equals') && workingData.left !== '' && workingData.operator === '') {
        calculate(workingData.left,workingData.operator,workingData.right);
    }
    else if (e.target.classList.contains('equals') && workingData.left !== '' && workingData.right !== '') {
        calculate(workingData.left,workingData.operator,workingData.right);
    }
}

function calculate(left,operator,right) {
    errorCheck();
    if (workingData.right === '')
}

function errorCheck() {
    if (((workingData.left).split('.')).length > 2 || ((workingData.right).split('.')).length > 2) {
        alert('you broke it :(');
    }
    else if (((workingData.left).split('.'))[1] === '' || ((workingData.right).split('.'))[1] === '') {
        alert('you broke it :(');
    }
}
