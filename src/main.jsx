import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createHashRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";
import Dashboard from './Components/Dashboard.jsx';
import SignIn from './Components/SignIn.jsx';
import SignUp from './Components/SignUp.jsx';
import { RecoilRoot } from 'recoil';

const router= createHashRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router}>
        <Routes/>
      </RouterProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
