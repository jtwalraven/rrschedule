var processTable = document.getElementById('process-table');

var processTableElements = processTable.getElementsByTagName('tr');

function init() {
    initProcessTableClickListeners();
    initProcessEventListeners();

    function initProcessTableClickListeners() {
        for (var i = 0; i < processTableElements.length; i++) {
            processTableElements[i].addEventListener('click', selectProcessTableElement);
        }
    }

    function initProcessEventListeners() {
        var addProcessButton = document.getElementById('add-process-button');
        addProcessButton.addEventListener('click', addProcessButtonClicked);

        var deleteProcessButton = document.getElementById('delete-process-button');
        deleteProcessButton.addEventListener('click', deleteProcessButtonClicked);
    }
}

function selectProcessTableElement(event) {
    if (this == processTableElements[0]) return;
    if ((event.ctrlKey || event.metaKey) || event.shiftKey) {
        this.classList.add('highlight');
    } else {
        for (var i = 0; i < processTableElements.length; i++) {
            processTableElements[i].classList.remove('highlight');
        }
        this.classList.add('highlight');
    }
}

function addProcessButtonClicked() {
    var tableRow = document.createElement('tr');
    tableRow.setAttribute('contenteditable', true);
    tableRow.addEventListener('click', selectProcessTableElement);
    processTable.appendChild(tableRow);

    var processName = document.createElement('td');
    processName.innerText = 'P' + (processTableElements.length - 1);
    tableRow.appendChild(processName);

    var burstTime = document.createElement('td');
    burstTime.innerText = '0';
    tableRow.appendChild(burstTime);

    var arrivalTime = document.createElement('td');
    arrivalTime.innerText = '0';
    tableRow.appendChild(arrivalTime);
}


function deleteProcessButtonClicked() {
    var highlightProcesses = processTable.getElementsByClassName('highlight');
    while(highlightProcesses.length > 0){
        highlightProcesses[0].parentNode.removeChild(highlightProcesses[0]);
    }
}

init();
