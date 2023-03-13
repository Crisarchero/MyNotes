import { useRouteError, useNavigate } from "react-router-dom";
import {useEffect} from 'react'

export default function ErrorPage() {
  const navigate = useNavigate()
  const error = useRouteError();
  
  useEffect(()=>{

    
    if (error.message === "Invalid token specified"){
      
      setTimeout(function(){navigate('/MyNotes/login')}, 2000)
    }
    
  })

  return (
    <div className = {"d-flex flex-column justify-content-center align-items-center vh-100"} id="error-page">
      <h1 className = {"mt-5 pt-5 display-2"}>Oops!</h1>
      <p className = {"display-4"}>Sorry, an unexpected error has occurred.</p>
      <p className = "display-6">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}