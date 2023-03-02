import React from 'react'
import List from './List'
import { useLoaderData, Link } from 'react-router-dom'



const PageList = () => {


  let notebook = useLoaderData()
 
  return (

    <div className="position-relative z-0 w-100 d-flex p-3 justify-content-center pagelist-background overflow-auto">

      {notebook.pages.length ?
        //Render a list of pages and components to delete the notebook or add a page.
        <div className=" d-flex flex-column w-100 align-items-center">


          
          <Link className="btn btn-primary align-self-end" to={`/${notebook._id}/addPage`}>Add Page</Link>

          <List list={notebook.pages} />
         
        </div>

        :
        //Render a message for when the notebook is empty.
        <div className="d-flex flex-column justify-content-center align-items-center">
          <List emptyMessage="Click the plus sign to add the first page!"
            emptyLink={<Link className="btn btn-primary " to={`/${notebook._id}/addPage`}>+</Link>}
          />
        </div>
      }
    </div>
  )
}

export default PageList