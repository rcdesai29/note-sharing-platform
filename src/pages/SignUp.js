import { useState } from 'react'

const SignUp = () => {

  return(
    <body>
    <form method = "POST" action = "/">
      <h3>Sign Up</h3>

      <label for = "firstName">First Name: </label>
        <input type = "text" id = "firstName" name = "firstName" required />
        <label for = "lastName">Last Name: </label>
        <input type = "text" id = "lastName" name = "lastName" required />
        <label for = "email">Email: </label>
        <input type = "text" id = "email" name = "email" required />
        <label for = "password">Password: </label>
        <input type = "password" id = "password" name = "password" minlength="8" maxlength="64" required />

      <button>Submit</button>
    </form>
    </body>
  )
}

export default SignUp