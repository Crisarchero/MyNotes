//DEPENDENCIES

import React from 'react';
import ReactDOM from 'react-dom/client';


// CSS AND SCSS
import "./main.scss";
import './index.css'

//ROUTING AND COMPONENTS
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import ErrorPage from './error'
import PageList from './components/PageList'
import PageForm from './components/PageForm'
import Page from './components/Page'
import EditPage from './components/EditPage'
import Delete from './components/Delete'
import Settings from './components/Settings'
import Intro from './Intro'
import SignUp from './SignUp'
import App, {
  loader as rootLoader,
  pageAction, notebookAction
}
  from './App';
import jwt_decode from 'jwt-decode'

const token = sessionStorage.getItem('token')
if (token === undefined){
  sessionStorage.setItem('token', "No token")
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: notebookAction,
    children: [
      {//Render the page list.
        path: ":notebookId",
        element: <PageList />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          const token = sessionStorage.getItem('token')
          if(token){

            let response = await fetch(`https://mynotesbackend.up.railway.app/notebooks/${params.notebookId}`,
            {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
                
              }
            });
            let notebook = await response.json()
            return notebook;
          }
          else{
            return []
          }
        }
      },

      {//Form for adding the page.
        path: "/:notebookId/addPage",
        loader: async ({ params }) => {
          return params.notebookId
        },
        action: pageAction,
        element: <PageForm />,
        errorElement: <ErrorPage />,
      },

      {//Render a single page view.
        path: ":notebookId/:pageId",
        element: <Page />,
        errorElement: <ErrorPage />,
        loader: async ({ params }) => {
          const token = sessionStorage.getItem('token')
          let nextPage = " "
          let previousPage = " "
          let response = await fetch(`https://mynotesbackend.up.railway.app/pages/${params.pageId}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,

            }
          });
          let page = await response.json()
          let responseSecond = await fetch(`https://mynotesbackend.up.railway.app/notebooks/${page.notebook}`,
            {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,

              }
            })
          let notebook = await responseSecond.json()
          let pages = notebook.pages
          let selectedPage = notebook.pages.find((selectPage) => {
            return selectPage._id === (page._id)
          })

          if (pages[pages.indexOf(selectedPage) + 1]) {
            nextPage = pages[pages.indexOf(selectedPage) + 1]
          }
          else {
            nextPage = pages[0]
          }
          if (pages[pages.indexOf(selectedPage) - 1]) {
            previousPage = pages[pages.indexOf(selectedPage) - 1]
          }
          else {
            previousPage = pages[pages.length - 1]
          }

          return [page, nextPage, previousPage];
        },

      },

      {//Editing a page.
        path: "/editPage/:pageId",
        element: <EditPage />,
        errorElement: <ErrorPage />,
        action: pageAction,
        loader: async ({ params }) => {
          const token = sessionStorage.getItem('token')
          let response = await fetch(`https://mynotesbackend.up.railway.app/pages/${params.pageId}`,  {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,

            }
          });
          let page = await response.json()
          return page;
        },

      },

      {//Delete a page.
        path: "/delete/page/:id",
        element: <Delete />,
        errorElement: <ErrorPage />,
        loader: ({ params }) => {

          return [params.id, "page"];
        }
      },

      {//Delete a notebook
        path: "/delete/notebook/:id",
        element: <Delete />,
        errorElement: <ErrorPage />,
        loader: ({ params }) => {

          return [params.id, "notebook"];
        }
      }, 
         {//Delete user
          path: "/delete/user",
          element: <Delete />,
          errorElement: <ErrorPage />,
          loader: () => {
            let token = sessionStorage.getItem('token')
            if(typeof token === "string"){

              const user = jwt_decode(token)
              return user.id
            }
            else return "No user"
          
          }
        }, 
      {
        path: "/settings",
        element: <Settings/>,
        errorElement: <ErrorPage />,
      }

    ]
  },
  {
    path: '/login',
    element: <Intro />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



