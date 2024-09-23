let fields = [
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    let content = document.getElementById('content');
    let html = '<table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];
            let displayValue = value === 'circle' ? generateCircleSVG() : (value === 'cross' ? generateCrossSVG() : '');
            html += `<td onclick="handleClick(${index}, this)">${displayValue}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    content.innerHTML = html;
}

function handleClick(index, cell) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null; // Entfernt den onclick-Handler
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechselt den Spieler
    }
}

function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="#00b0f1" stroke-width="10" fill="none">
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#fec000" stroke-width="10" />
            <line x1="60" y1="10" x2="10" y2="60" stroke="#fec000" stroke-width="10" />
        </svg>
    `;
}