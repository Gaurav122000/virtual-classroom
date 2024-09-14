import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import Login from './Components/Login/Login.jsx';
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import ClassList from './Components/ClassList/ClassList.jsx';
import CreateClass from './Components/CreateClass/CreateClass.jsx';
import CreateUnit from './Components/CreateUnit/CreateUnit.jsx';
import CreateSession from './Components/CreateSession/CreateSession.jsx';
import SessionList from './Components/SessionList/SessionList.jsx';
import CommentList from './Components/CommentList/CommentList.jsx';
import AddComment from './Components/AddComment/AddComment.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';


const router = createBrowserRouter([

  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/navbar",
    element: <Navbar/>
  },
  {
    path: "/app",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/classes",
    element: <ClassList/>
  },
  {
    path: "/create-class",
    element: <CreateClass/>
  },
  {
    path: "/classes/:classId/units",
    element: <CreateUnit/>
  },
  {
    path: "/classes/:classId/units/:unitId/sessions",
    element: <CreateSession/>
  },
  {
    path: "/units/:unitId/sessions",
    element: <SessionList/>
  },
  {
    path: "/sessions/:sessionId/comments",
    element: <CommentList/>
  },
  {
    path: "/sessions/:sessionId/add-comment",
    element: <AddComment/>
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
