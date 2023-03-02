import { React, useState } from 'react'
import { Form, useNavigate, useLoaderData } from 'react-router-dom'
import FormSection from './FormSection'
import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'

const PageForm = (prop) => {

  const notebookId = useLoaderData()
  const navigate = useNavigate()

  const [counter, setCounter] = useState(prop.page ?
    prop.page.content.length : 0
  )
  const eachButton = <div className="">

    <button className="btn btn-white float-end" title="Add section below" onClick={(event) => {

      setCounter((counter) => {
        return counter + 1
      })
      addArticle(event)
    }}>+</button>

    <button className="btn btn-white float-end" title="Delete this section" onClick={(event) => {
      removeArticle(event)

    }}>-</button>
  </div>


  const [eachArticle, setArticle] = useState(prop.page ?

    prop.page.content.map((article) => (
      <FormSection counter={prop.page.content.indexOf(article)}
        paragraph={article.paragraph}
        header={article.header}
        button={eachButton}

      />

    ))
    :
    [])

  const addArticle = (event, top) => {
    event.preventDefault()
    let source = event.target.parentNode.parentNode.parentNode.id


    let articleNum = source.charAt(source.length - 1)

    let count = document.getElementById("counter").value

    setArticle((eachArticle) => {//The function for adding form sections beneath the section where the button was clicked.
      if (!top) {

        let index = eachArticle.indexOf(eachArticle.find((element) => (element.props.counter === articleNum)))

        if (index === -1) {
          return [
            ...eachArticle,
            <FormSection
              button={eachButton}
              counter={count}
            />]
        }
        else {
          let newArticle = [...eachArticle]
          newArticle.splice(index + 1, 0,
            <FormSection
              button={eachButton}
              counter={count}
              paragraph=""
              header=""
            />)
          return newArticle
        }
      }
      else {

        let newArticle = [
          <FormSection
            button={eachButton}
            counter={count}
            paragraph=""
            header=""
          />, ...eachArticle]

        return newArticle

      }
    })



  }

  const removeArticle = (event) => { //Removing the form section from which the button was clicked.
    event.preventDefault()

    let source = event.target.parentNode.parentNode.parentNode.id
    let articleNum = source.charAt(source.length - 1)

    setArticle((eachArticle) => {
      let index = eachArticle.indexOf(eachArticle.find(
        (element) => (element.props.counter === articleNum)))
      let newArticles = [...eachArticle]
      newArticles.splice(index, 1)
      return newArticles
    })

  }


  return (

    <Form id="Form" className="d-flex flex-column w-100 p-4 overflow-auto" method="post">


      {prop.page ?
        //If the user is editing a page this will allow the page to be deleted and store the page's id which won't change .
        <div>
          <Link className={"float-end text-warning"} to={"/delete/page/" + prop.page._id}><BsTrash /></Link>
          <input type="hidden" name="page" id="page" value={prop.page._id} />
        </div>

        :
        ""
      }

      {//Hidden information that will help with storage.
      }
      <input type="hidden" name="notebook" id="notebook" defaultValue={prop.page ? prop.page.notebook : notebookId} />
      <input type="hidden" name="counter" id="counter" value={counter} />

      {//The first form section.
      }
      <div className="d-flex flex-column w-100 border my-3 py-2 shadow">
        <label for="name">Page Name:</label>
        <input className="m-2 border rounded" type="text" name="name" id="name" maxlength="25" defaultValue={prop.page ? prop.page.name : ""} required />
        <label for="summary">Summary:</label>
        <textarea className="m-2 border rounded" name="summary" id="summary" defaultValue={prop.page ? prop.page.summary : ""} required></textarea>
        <div>
          <button className={"btn btn-white float-end"} onClick={(event) => {
            setCounter((counter) => { return counter + 1 })
            addArticle(event, true)
          }}>+</button>
        </div>
      </div>

      {//Additional form sections that the user can add.
      eachArticle}
      
      
      {//Buttons to cancel or submit.
      }
      <div>
        <button className="btn btn-info" type="submit">Create New</button>
        <button className="btn btn-info" onClick={() => { navigate(-1) }}>Cancel</button>
      </div>
    </Form>

  )
}

export default PageForm


