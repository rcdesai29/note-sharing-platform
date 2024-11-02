const SignUp = () => {

  return(
    <body>
    <form method = "POST" action = "/api/users">
      <h3>Sign Up</h3>

      <label for = "username">Username: </label>
      <input type = "text" id = "username" name = "username" required />
      <label for = "email">Email: </label>
      <input type = "text" id = "email" name = "email" required />
      <label for = "password">Password: </label>
      <input type = "password" id = "password" name = "password" minlength="8" maxlength="64" required />

      <input type = "submit" value = "Submit"/>
    </form>
    </body>
  )
}

export default SignUp