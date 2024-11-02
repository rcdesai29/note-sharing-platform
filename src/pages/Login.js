const Login = () => {


  return(
    <form method = "POST" action = "/api/users/login">
      <h3>Login</h3>

        <label for = "email">Email: </label>
        <input type = "text" id = "email" name = "email" required />
        <label for = "password">Password: </label>
        <input type = "password" id = "password" name = "password" minlength="8" maxlength="64" required />

        <input type = "submit" value = "Submit"/>
    </form>
  )
}

export default Login