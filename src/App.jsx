import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignUp from "../public/Auth/signUp.jsx"
import Login from "../public/Auth/login.jsx"
import Dashboard from "./Dashboard.jsx"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
   
  const router  =  createBrowserRouter([
    {
      path: "/",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    }

  ])

  return (
    <>
      <RouterProvider router={router} />\
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  )
}
