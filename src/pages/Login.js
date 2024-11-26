import React from 'react';

const Login = () => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Login Successful');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      alert('Error Logging In');
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" required />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" required />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
