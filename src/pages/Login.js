import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON headers
        },
        body: JSON.stringify({ email, password }), // Send JSON body
      });

      const data = await response.text(); // Adjust based on backend response type
      if (response.ok) {
        console.log("Login successful:", data);
        // Handle successful login (e.g., store token, redirect, etc.)
      } else {
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label htmlFor="email">Email: </label>
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength="8"
        maxLength="64"
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
