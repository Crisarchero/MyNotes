import React from 'react'
import { useNavigate, useLoaderData} from 'react-router-dom'
const Delete = () => {
  let data = useLoaderData()
  let id = ""
  let object = ""
  if (Array.isArray(data)) {
    id = data[0]
    object = data[1]
  }
  else {
    id = data
    object = "user"
  }

 
  let navigate = useNavigate()

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <p className="display-5 m-5">Are you sure you want to delete the selected {object}?</p>

      <div className="d-flex w-100 p-5">


        <button className="btn btn-info w-25" onClick={() => { deleteLink(id, object) }}>Delete</button>
        <button className="btn btn-info w-25 ms-5" onClick={() => { navigate(-1) }}>Cancel</button>
      </div>
    </div>

  )
}
async function deleteLink(id, object) {
  const token = sessionStorage.getItem('token')

  let link = ""

  if (object === "page") {
    link = "/pages/" + id
  } else if (object === "notebook") {
    link = "/notebooks/" + id
  }
  else {
    link = "/users/" + id
  }

  let response = await fetch("https://mynotesbackend.up.railway.app" + link, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,

    },
  })
  let message = await response.json()
  alert(message)
  if (object === 'user') {
    sessionStorage.clear()
    window.location.href = "/login"
  }
  else {
    window.location.href = "/"
  }
}

export default Delete