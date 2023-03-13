import React from 'react'
import { useNavigate} from 'react-router-dom'



const Login = () => {
  const navigate = useNavigate()
  
  async function validate(event) {
    event.preventDefault()
    const username = document.getElementById('username')
    const password = document.getElementById('password')

    let obj = {
      "name": username.value,
      "password": password.value
    }

    let json = JSON.stringify(obj)

    let response = await fetch("https://mynotesbackend.up.railway.app/users/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: json
    })

    let res = await response.json()
    if (res.user) {
    
      sessionStorage.setItem("token", res.user)
      navigate('/')
    }
    else {
      let error = document.getElementById('error')
      error.value = res.status
    
      alert("Either the username or password is incorrect!")
    }
  }
  return (

    <div className = "col align-self-center">
      <form className = " ">
        <div className="form-group bg-primary p-5 shadow border rounded">

          <label for="username">Username:</label>
          <input id="username" className="form-control w-50" name="username" type="text" />
          <label for="username">Password:</label>
          <input id="password" className="form-control w-50" name="username" type="password" />

          <input id="error" className=" form-control text-warning p-0 my-3 bg-transparent border-primary" readOnly />

          <div className="d-flex justify-content-end mt-5">
            <button className="btn btn-secondary mx-5" onClick={(event) => { validate(event) }}>Login</button>
            <button className="btn btn-secondary" onClick={() => { navigate('/signup')}}>Sign Up</button>
          </div>

        </div>

      </form>
    </div>
  )
}

export default Login