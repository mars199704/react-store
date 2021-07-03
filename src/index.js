import React from 'react'
import ReactDOM from 'react-dom'
import './css/style.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './commons/auth'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './component/App'
import Login from './component/Login'
import Notfound from './component/NotFound'
import Cart from './component/Cart'
import Register from './component/Register'

ReactDOM.render(
<BrowserRouter>
<ToastContainer 
  position="top-center"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover/>
  <Switch>
    <Route path="/" exact component={App}/>
    <Route path="/auth/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/carts" component={Cart} />
    <Route component={Notfound}></Route> 
  </Switch>
</BrowserRouter>, document.getElementById("root"))