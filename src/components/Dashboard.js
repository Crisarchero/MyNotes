
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet, redirect} from 'react-router-dom'


const Dashboard = (prop) => {
  
   
  

  
  return (
    <div>
    <Header />
    <div className="d-flex align-items-stretch vh-100 container-fluid p-0 m-0">
      <Sidebar list={prop.notebooks} />
      <Outlet />
    </div>

  </div>
  )
}

export default Dashboard