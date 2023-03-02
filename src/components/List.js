import { useState } from 'react'
import ListItem from './ListItem'
import { Form } from 'react-router-dom'
import { HiOutlinePlus } from 'react-icons/hi'
import jwt_decode from 'jwt-decode'
const List = (props) => {
  const [newNotebook, setNotebook] = useState(false)
  const token = sessionStorage.getItem('token')
  let user = ""

  if (typeof token === "string") {
    user = jwt_decode(token)
  }

  return (
    <div className="w-100">


      {//Add a header if this list should have one.
        (props.title) ?
          <h2 className={"display-6 border-bottom border-primary-subtle border-3"}>{props.title}<HiOutlinePlus className="p-1" onClick={() => setNotebook(!newNotebook)} /></h2>
          :
          ""
      }

      {//Add a form element for the user to add a new notebook if they click the plus button.
        (newNotebook) ?
          <Form className="m-3" method="post">
            <input id="newNotebook" name="name" type="text" required />
            <input id="owner" name="owner" value={user.id} type="hidden" required />
            <button className="btn btn-info mx-4" type="submit">New</button>
            <button className="btn btn-info" onClick={() => setNotebook(!newNotebook)}>Cancel</button>
          </Form>
          :
          ""
      }

      {//Render the list or an empty message instead.
        (props.emptyMessage) ?
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center display-6 text-muted w-50">{props.emptyMessage}</p>
            <div>
              {props.emptyLink}
            </div>
          </div>
          :

          <ul className={"list-group list-group-flush"}>
            {props.list.map((listItem) => (
              <ListItem key={"item" + props.list.indexOf(listItem)} item={listItem} num={props.list.indexOf(listItem)} />
            ))}
          </ul>
      }


    </div>
  )
}

export default List