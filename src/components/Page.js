import React from 'react'
import { useLoaderData, Link } from 'react-router-dom'

const Page = () => {

  const pages = useLoaderData()
  const page = pages[0]
  const nextPage = pages[1]
  const previousPage = pages[2]
  return (

    <div className="container-fluid p-0 d-flex flex-column justify-content-between overflow-auto">
      <div>
        <div className="d-flex my-2  m-3 p-2 justify-content-between">

          <h2 className="display-5 mr-auto m-1 ">{page.name}</h2>
          <div>
            <Link className="m-1" to={"/editPage/" + page._id}>Edit Page</Link>
            <Link className="m-1" to={"/" + page.notebook}>Back to Notebook</Link>
          </div>
        </div>

        <p className="mx-5 px-3 my-3">{page.summary}</p>

        {page.content ?

          page.content.map((article) => (
            <article className="p-3 mx-5 my-3" key = {page.content.indexOf(article)}>

              <h2>{article.header}</h2>
              <p>{article.paragraph}</p>
            </article>
          ))
          :
          ""


        }


      </div>
      <div className="d-flex justify-content-between border-top p-5 bg-light">
        <Link to = {"/" + page.notebook + "/" + previousPage._id}>Previous Page</Link>
        <Link to =  {"/" + page.notebook + "/" + nextPage._id}>Next Page</Link>

      </div>

    </div>
  )
}

export default Page
