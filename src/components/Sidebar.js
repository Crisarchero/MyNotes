import React, { useState} from 'react'
import List from './List'
import { HiArrowSmRight } from 'react-icons/hi'

const Sidebar = (props) => {
  const [isSideBarOpen, setSideBar] = useState(true)


  return (
    <div className={`${isSideBarOpen ? "z-1 p-4 bg-light open-sidebar" : "p-2 border closed-sidebar"}`}>


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
          <button className = {"btn btn-light shadow-sm"} onClick={() => setSideBar(true)}>
            <HiArrowSmRight className={""}  />
            </button>
      }

    </div>


  )
}

export default Sidebar