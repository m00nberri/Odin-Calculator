let memory = '';
let buttons = document.getElementsByTagName('button');

(Array.from(buttons)).forEach(button => {
    button.addEventListener('mousedown', buttonHandler);
})

function buttonHandler(e) {
    if (e.target.classList.contains('number')) {
        numberPress(e);
    }
    else if (e.target.classList.contains('specialOperator')) {
        specialOperatorPress(e);
    }
    else if (e.target.classList.contains('operator')) {
        operatorPress(e);
    }
    else if (e.target.classList.contains('equals')) {
        equalsPress(e);
    }
    else if (e.target.id === 'del') {
        delPress(e);
    }
    else if (e.target.id === 'clear') {
        clearPress(e);
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
function updateDisplay(value) {
    workingDisplay.textContent = value;
}

let resultDisplay = document.getElementById("resultLine");

function updateResult(value) {
    resultDisplay.textContent = value;
}

function errorCheck() {
    if (((workingData.left).split('.')).length > 2 || ((workingData.right).split('.')).length > 2) {
        alert('you broke it :(');
    }
    else if (((workingData.left).split('.'))[1] === '' || ((workingData.right).split('.'))[1] === '') {
        alert('you broke it :(');
    }
}
