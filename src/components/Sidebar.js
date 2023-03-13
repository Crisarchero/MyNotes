import React, { useState} from 'react'
import List from './List'
import { HiArrowSmRight } from 'react-icons/hi'

const Sidebar = (props) => {
  const [isSideBarOpen, setSideBar] = useState(true)


  return (
    <div className={`position-relative bg-light z-1 p-4  ${isSideBarOpen ? "col-sm-12 col-md-5 book-background overflow-auto" : "col-sm-1"}`}>


      {
        isSideBarOpen ?
          <div>
            <button className={" btn-close float-end m-2"} onClick={() => setSideBar(false)}></button>

            {props.list.length ?
              <List title="Notebooks" list={props.list} />
              :
              <List title="Notebooks" emptyMessage="Click the plus sign to create a notebook" />
            }
          </div>

          :
          <HiArrowSmRight className={"bg-white"} onClick={() => setSideBar(true)} />
      }

    </div>


  )
}

export default Sidebar