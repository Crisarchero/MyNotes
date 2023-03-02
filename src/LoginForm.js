import React from 'react'

const LoginForm = (prop) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="d-flex flex-column justify-content-center align-items-center">
        <div className="form-group bg-primary p-5 m-5 shadow border rounded">

          <label for="username">Username:</label>
          <input className="form-control" name="username" type="text" />
          <label for="username">Password:</label>
          <input className="form-control" name="username" type="password" />

          <div className="d-flex justify-content-between mt-5">
            <button className="btn btn-secondary">Login</button>
            <a className="btn btn-secondary" href="/signup">Sign Up</a>
          </div>

        </div>



      </form>
    </div>
  )
}

export default LoginForm