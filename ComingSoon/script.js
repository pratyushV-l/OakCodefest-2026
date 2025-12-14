const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const matrixChars = '01<>{}[]();:=+-*/&|!?#$%@~^_ABCDEFabcdef';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({ length: columns }, () => Math.random() * -100);

function drawMatrix() {
    ctx.fillStyle = 'rgba(17, 17, 17, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#35D0E3';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -100);
});


const eventDate = new Date('2026-02-07T09:00:00').getTime();

function updateCountdown() {
    const now = Date.now();
    const remaining = eventDate - now;

    if (remaining < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


const terminal = document.getElementById('terminalText');
if (terminal) {
    const content = terminal.textContent;
    terminal.textContent = '';

    let index = 0;
    const speed = 15;

    function type() {
        if (index < content.length) {
            terminal.textContent += content.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    setTimeout(type, 500);
}
