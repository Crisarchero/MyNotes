import React from 'react'
import jwt_decode from 'jwt-decode'

const Settings = () => {
  async function changeName(event) {
    event.preventDefault()

    const token = sessionStorage.getItem('token')
    if (typeof token === "string") {
      let user = jwt_decode(token)
      let id = user.id


      let username = document.getElementById('new-username')

      if (username.value) {
        let obj = {
          "name": username.value,
        }
        let json = JSON.stringify(obj)
        let response = await fetch("http://localhost:5000/users/edit/" + id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token,

          },
          body: json
        })
        let res = await response.json()
        let error = document.getElementById('username-error')
        if (res.error) {
          error.value = res.error
        }
        else{
          error.value = "Username changed successfully!"
        }
      }
      else {
        let error = document.getElementById('username-error')
        error.value = "Your new username cannot be blank."
      }
    }

  }
  return (
    <div className="ps-5 pt-5 position-relative col-md-6">
      <h2>Settings</h2>
      <ul className="list-group list-group-flush my-5 w-100">
        <li className="list-group-item py-3  d-flex flex-wrap justify-content-between align-items-center">
          <button className="btn text-primary" onClick={(event) => { changeName(event) }}>Change Username:</button>
          <input id="new-username" name="new-username" className="mx-5" />

        </li>

        <li className="list-group-item py-3"><a href={"/delete/user"} className=" btn link-warning">Delete Account</a></li>

        <input id="username-error" name="username-error" className="mx-5 border-0 text-center bg-transparent" disabled/>
      </ul>
    </div>
  )
}

export default Settings