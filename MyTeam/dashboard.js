window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    try {
        const response = await fetch('/.netlify/functions/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });
        
        const data = await response.json();
        if (!response.ok || !data.valid) {
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.log('Token verification failed:', error);
        window.location.href = 'login.html';
    }
});
