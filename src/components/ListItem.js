import { React, useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { ImBook } from 'react-icons/im'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { BsTrashFill } from 'react-icons/bs'


const ListItem = (props) => {


  const id = props.item._id
  const summary = props.item.summary
  const name = props.item.name
  const num = props.num

  const [viewPages, setViewPages] = useState(false)
  return (
    <div className={`bg-transparent`}>
      {summary ? //For rendering a list of pages.

        <div className='my-4 w-100 border rounded p-3 shadow bg-white'>
          <div className='border-bottom border-3 border-primary  d-flex justify-content-between'>
            <h2 className='display-5'>{name}</h2>
            <Link to={"/" + props.item.notebook + "/" + id}>View Page</Link>

          </div>
          <p>{summary}</p>
          <p className="text-end">Page #{num + 1}</p>
        </div>
        :
        //Rendering a list of notebooks.
        <div>
          <div className = "d-flex">

            <NavLink className={({ isActive, isPending }) => isActive ? "list-group-item list-group-item-action active" : isPending
              ? "bg-light list-group-item list-group-item-action" : "list-group-item list-group-item-action"} onClick={() => setViewPages(!viewPages)} to={"/" + id}>
              <div className="d-flex align-items-center justify-content-between">

                <div className="d-flex align-items-center mt-1">
                  <ImBook className="mx-2 text-secondary" />
                  <h6 className="m-1">{name}</h6>
                  {viewPages ? //Render an arrow that will point up or down.
                    <MdArrowDropUp onClick={() => setViewPages(!viewPages)} />
                    :
                    <MdArrowDropDown onClick={() => setViewPages(!viewPages)} />
                  }
                </div>


              </div>

            </NavLink>
            <Link className="btn me-2" to={"/delete/notebook/" + props.item._id}>
              <BsTrashFill />
            </Link>
          </div>
          {viewPages ? //Render a list of pages beneath each notebook.

            <ul className="text-decoration-non px-5">{
              props.item.pages.length ?
                props.item.pages.map((page) => (
                  <li key={page.name}>{page.name}</li>
                ))
                :
                <li>Empty</li>
            }
            </ul>
            :
            ""
          }


        </div>
      }
    </div>
  )
}

export default ListItem