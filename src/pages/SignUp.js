import React from 'react';

const SignUp = () => {
  const handleSignUp = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:5001/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const responseData = await response.text(); // Capture the response text

      if (response.ok) {
        alert('Sign Up Successful');
      } else {
        console.error('Error Signing Up:', responseData);
        alert('Error Signing Up: ' + responseData);
      }
    } catch (error) {
      console.error('Error Signing Up:', error);
      alert('Error Signing Up: ' + error.message);
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <form onSubmit={handleSignUp}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" required />
        <br />
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" required />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" required />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUp;