import React from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';

const router = createBrowserRouter(
  createRoutesFromElements(
   <>
    <Route path="/" element={<Registration />}></Route>
    <Route path="/login" element={<Login />}></Route>
   </>
  )
);


const App = () => {
  return (
      <RouterProvider router={router} />
  )
}

export default App