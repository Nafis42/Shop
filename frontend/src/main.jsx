import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route,RouterProvider,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/store.js'

import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
// import AdminHome from './components/Admin/AdminHome.jsx'
import AdminHome from './pages/AdminHome.jsx'
import AddItem from './components/Admin/AddItem.jsx'
import ListItems from './components/Admin/ListItems.jsx'
import Orders from './components/Admin/Orders.jsx'
import AdminRoute from '../Utils/AdminRoute.jsx'


const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>

      {/* Protect Admin Routes */}
      <Route path="admin" element={<AdminRoute />}>
                <Route element={<AdminHome />}>
                    <Route index element={<ListItems />} /> {/* Default Admin Page */}
                    <Route path="add-item" element={<AddItem />} />
                    <Route path="list-items" element={<ListItems />} />
                    <Route path="orders" element={<Orders />} />
                </Route>
            </Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
