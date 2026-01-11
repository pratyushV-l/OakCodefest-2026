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
const form = document.getElementById('login-form');
const messageDiv = document.getElementById('message');

if (form && messageDiv) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Logging in...';
        
        try {
            const response = await fetch('/.netlify/functions/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('username', data.username);
                
                showMessage('Login successful! Redirecting...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showMessage(data.error || 'Login failed. Please try again.', 'error');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        } catch (error) {
            showMessage('Network error. Please check your connection and try again.', 'error');
            console.error('Login error:', error);
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }

    window.addEventListener('DOMContentLoaded', async () => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            try {
                const response = await fetch('/.netlify/functions/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                
                const data = await response.json();
                
                if (response.ok && data.valid) {
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                console.log('Token verification failed:', error);
            }
        }
    });
}
