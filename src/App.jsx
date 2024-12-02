import DashBoard from "./components/pages/dashboard"
import ContactForm from "./components/pages/contactus"
import LandingPage from "./components/pages/LandingPage/Landingpage"
import RegistrationForm from "./components/pages/RegistrationForm"
import OurEvents from "./components/pages/Ourevent"
import { Navbar } from "./components/Navbar/Navbar"
import { Footer } from "./components/Footer/Footer"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout"
import Event from "./components/pages/algoolympics"
import Team from "./components/pages/Team/Team"
import LoginForm from "./components/pages/login"

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<AppLayout/>,
      // errorElement:<ErrorPage/>,
      children:[
        {
          path:"/",
          element:<LandingPage/>
        },
        {
          path:"/events",
          element:<OurEvents/>
        },
        {
          path:"/events/eve",
          element:<Event/>
        },
        {
          path:"/team",
          element:<Team/>,
          // loader:getmovieData,
        },
        {
          path:"/contact",
          element:<ContactForm/> 
        },
        {
          path:"/verify",
          element:<DashBoard/>,
        },
        {
          path:"/login",
          element:<LoginForm/>,
        },
      ]
     },
   ]);
   return <RouterProvider router={router}/>
}

export default App