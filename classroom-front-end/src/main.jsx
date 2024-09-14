import React from 'react'; // Importing React library
import ReactDOM from 'react-dom/client'; // Importing ReactDOM for rendering
import App from './App.jsx'; // Importing main App component
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; // Importing RouterProvider and createBrowserRouter for routing
import './index.css'; // Importing CSS file for styling
import Login from './Components/Login/Login.jsx'; // Importing Login component
import Home from './Components/Home/Home.jsx'; // Importing Home component
import Register from './Components/Register/Register.jsx'; // Importing Register component
import ClassList from './Components/ClassList/ClassList.jsx'; // Importing ClassList component
import CreateClass from './Components/CreateClass/CreateClass.jsx'; // Importing CreateClass component
import CreateUnit from './Components/CreateUnit/CreateUnit.jsx'; // Importing CreateUnit component
import CreateSession from './Components/CreateSession/CreateSession.jsx'; // Importing CreateSession component
import SessionList from './Components/SessionList/SessionList.jsx'; // Importing SessionList component
import CommentList from './Components/CommentList/CommentList.jsx'; // Importing CommentList component
import AddComment from './Components/AddComment/AddComment.jsx'; // Importing AddComment component
import Navbar from './Components/Navbar/Navbar.jsx'; // Importing Navbar component

// Creating a router with defined routes
const router = createBrowserRouter([
  {
    path: "/", // Route for Home component
    element: <Home/>
  },
  {
    path: "/navbar", // Route for Navbar component
    element: <Navbar/>
  },
  {
    path: "/app", // Route for App component
    element: <App/>
  },
  {
    path: "/login", // Route for Login component
    element: <Login/>
  },
  {
    path: "/register", // Route for Register component
    element: <Register/>
  },
  {
    path: "/classes", // Route for ClassList component
    element: <ClassList/>
  },
  {
    path: "/create-class", // Route for CreateClass component
    element: <CreateClass/>
  },
  {
    path: "/classes/:classId/units", // Route for CreateUnit component
    element: <CreateUnit/>
  },
  {
    path: "/classes/:classId/units/:unitId/sessions", // Route for CreateSession component
    element: <CreateSession/>
  },
  {
    path: "/units/:unitId/sessions", // Route for SessionList component
    element: <SessionList/>
  },
  {
    path: "/sessions/:sessionId/comments", // Route for CommentList component
    element: <CommentList/>
  },
  {
    path: "/sessions/:sessionId/add-comment", // Route for AddComment component
    element: <AddComment/>
  }
]);

// Rendering the application with RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* Providing the router to the application */}
  </React.StrictMode>,
);
