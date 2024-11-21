const form = document.getElementById('signup-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const birthDate = document.getElementById('birthDate').value;
  const biography = document.getElementById('biography').value;

  // Validate form
  if (!username || !email || !password || !confirmPassword) {
    errorMessage.textContent = 'All fields are required.';
    return;
  }
  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match.';
    return;
  }
  if (password.length < 8) {
    errorMessage.textContent = 'Password must be at least 8 characters long.';
    return;
  }

    try {
    const response = await fetch('http://127.0.0.1:8000/users/sign-up/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, password,
         firstName, lastName, birthDate, biography}),
    });


    if (response.ok) {
      const data = await response.json();
      // Signup successful, handle the response
      console.log('Signup successful!');
      console.log("response: ", response)
      console.log("data: ", data)

      // Save JWT to localStorage
      localStorage.setItem('accessToken', data['accessToken']);
      localStorage.setItem('refreshToken', data['refreshToken']);

      // Redirection to login page:
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);

    } else {
      // Signup failed, handle the error
      console.error('Signup failed:', await response.json());
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
