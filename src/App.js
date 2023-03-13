import { useEffect } from 'react'

import { useNavigate, redirect, useLoaderData } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import jwt_decode from 'jwt-decode';

function App() {
  const navigate = useNavigate()
  let notebooks = useLoaderData()

  useEffect(() => {

    const token = sessionStorage.getItem('token')

    if (token && typeof token === "string") {
      const user = jwt_decode(token, { header: true })
      if (!user) {
     
        sessionStorage.removeItem('token')
        navigate("/login")
      }

    }
    else {
      navigate("/login")
    }
  })

  return (
    <div className="App overflow-hidden">
      <Dashboard notebooks={notebooks} />
    </div>
  );
}

//Functions that will be exported for the router.
export default App;

export async function loader() {//Load the user's notebooks.
  try {
    const token = sessionStorage.getItem('token')
    if (token && typeof token === "string") {
      const token = sessionStorage.getItem('token')

      const user = jwt_decode(token)


      let response = await fetch(`https://mynotesbackend.up.railway.app/notebooks/owner/${user.id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,

        }
      })
      let notebooks = await response.json()

      return notebooks
    }
    return []
  }
  catch (err) {
    sessionStorage.clear()
    return err
  }
}

export async function pageAction() {//Add a new page.

  //Getting elements from the form.
  let notebook = document.getElementById("notebook").value
  let page = document.getElementById("page")
  let name = document.getElementById("name").value
  let summary = document.getElementById('summary').value
  let articles = document.getElementsByClassName('section')

  //Getting token
  const token = sessionStorage.getItem('token')

  //Creating object to send to the database.
  let obj = {
    "name": name,
    "notebook": notebook,
    "summary": summary,
    "content": [

    ]
  }

  //This will add any optional articles that the user added to the object.
  for (let i = 0; i < articles.length; i++) {

    let id = articles[i].id
    let x = id.charAt(id.length - 1)

    let header = document.getElementById('header' + x)
    let paragraph = document.getElementById('paragraph' + x)

    if (paragraph) {

      let contentAddition = {
        "header": header.value,
        "paragraph": paragraph.value
      }
      obj.content.push(contentAddition)

    }
  }

  let json = JSON.stringify(obj)

  if (page) {//If the user is editing a page.
    let response = await fetch("https://mynotesbackend.up.railway.app/pages/edit/" + page.value, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: json
    })
    await response.json()
    return redirect("/")

  }

  else { //If the user is adding a new page.

    let response = await fetch("https://mynotesbackend.up.railway.app/pages/add", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: json
    })
    await response.json()
    return redirect('/')
  }




}

export async function notebookAction() { //Add a new notebook to the database.
  const token = sessionStorage.getItem('token')
  let notebook = document.getElementById("newNotebook")
  let owner = document.getElementById("owner")

  let obj = {
    "owner": owner.value,
    "name": notebook.value

  }

  let json = JSON.stringify(obj)

  let response = await fetch("https://mynotesbackend.up.railway.app/notebooks/add", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,

    },
    body: json
  })

  await response.json()
  notebook.value = ""
  return redirect("/")
}

