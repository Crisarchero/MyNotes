import React from 'react'
import {useNavigate} from 'react-router-dom'


const SignUp = () => {
    
    const navigate = useNavigate()
    async function createUser (event){  
        event.preventDefault()
        
        const username = document.getElementById("username").value
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value
        console.log(password, confirmPassword)
        
        if(confirmPassword === password){
            console.log("passwords match")
            let obj = {
                "name": username,
                "password": password
              }
          
              let json = JSON.stringify(obj)
          
              let response = await fetch("https://mynotesbackend.up.railway.app/users/add", {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: json
              })

              let res = await response.json()
              console.log(res.status)
              if (res.status === 'ok'){
                alert("Account was created successfully! Please log in.")
                navigate('/login')
              }
              else{
                let error = document.getElementById('error')
                error.value= res.error
              }
        }
        else{
            let error = document.getElementById('error')
            error.value = "The first and second password must match!"
        }
       
    }
    return (

        <div className = "col align-self-center mx-5">

        <h2 className = "my-5 display-3">Create an Account</h2>
          <form>
            <div className="form-group bg-primary p-5 shadow border rounded">
    
              <label for="username">Username:</label>
              <input id="username" className="form-control w-50" name="username" type="text" />
              <label for="username">Password:</label>
              <input id="password" className="form-control w-50" name="username" type="text" />
              <label for="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" className="form-control w-50" name="confirmPassword" type="text" />
    
              <input id="error" className=" form-control text-warning p-0 my-3 bg-transparent border-primary" readOnly />
    
              <div className="d-flex justify-content-end mt-5">
                <button className="btn btn-secondary mx-5" onClick={(event) => { createUser(event) }}>Sign Up</button>
                <button className="btn btn-secondary" onClick={() => { navigate('/login')}}>Cancel</button>
              </div>
    
            </div>
    
          </form>
        </div>
      )
}

export default SignUp
