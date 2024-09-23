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
    let html = '<div style="position: relative;">';
    html += '<table>';

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
    html += `<svg id="winningLine" width="316" height="316" style="position: absolute; top: 0; left: 0; display: none;"></svg>`;
    html += '</div>';
    content.innerHTML = html;
}

function handleClick(index, cell) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null; // Entfernt den onclick-Handler
        if (checkWin()) {
            drawWinningLine();
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechselt den Spieler
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
        [0, 4, 8], [2, 4, 6]             // Diagonale Reihen
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return pattern; // Gibt das Gewinnmuster zurück
        }
    }
    return null;
}

function drawWinningLine() {
    const pattern = checkWin();
    if (pattern) {
        let svg = document.getElementById('winningLine');
        svg.style.display = 'block'; // Zeigt das SVG-Element an
        svg.innerHTML = `<line x1="${getX(pattern[0])}" y1="${getY(pattern[0])}" x2="${getX(pattern[2])}" y2="${getY(pattern[2])}" stroke="white" stroke-width="5" />`;
    }
}

function getX(index) {
    return (index % 3) * 100 + 50;
}

function getY(index) {
    return Math.floor(index / 3) * 100 + 50;
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