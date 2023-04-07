import './App.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";

// Import All components
import Username from './components/Username'
import Reset from './components/Reset'
import Register from './components/Register'
import Recovery from './components/Recovery'
import Profile from './components/Profile'
import Password from './components/Password'
import PageNotFound from './components/PageNotFound';




const router = createBrowserRouter([
  {
    path:'/',
    element: <Username/>
  },
  {
    path:'/register',
    element: <Register/>
  },
  {
    path:'/profile',
    element: <Profile/>
  },
  {
    path:'/reset',
    element: <Reset/>
  },
  {
    path:'/recovery',
    element: <Recovery/>
  },
  {
    path:'/password',
    element: <Password/>
  },
  {
    path:'*',
    element: <PageNotFound/>
  },
])

function App() {

  return (
   <main>
    <RouterProvider router={router}/>
   </main>
  )
}

export default App
