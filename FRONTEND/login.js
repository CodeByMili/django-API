
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('http://127.0.0.1:8000/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save JWT to localStorage
            localStorage.setItem('token', data.token);
            messageDiv.textContent = 'Login successful!';
            messageDiv.style.color = 'green';

            // Redirection to client dashboard:
             setTimeout(() => {
                 window.location.href = 'http://127.0.0.1:5500/FRONTEND/index.html';
             }, 1500);
        } else {
            messageDiv.textContent = data.message || 'Login failed';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        messageDiv.textContent = 'Network error. Please try again.';
        messageDiv.style.color = 'red';
    }
});

