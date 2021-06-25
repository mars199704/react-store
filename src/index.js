import React from 'react'
import ReactDOM from 'react-dom'
import './css/style.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './component/App'
import Login from './component/Login'
import Notfound from './component/NotFound'

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
    <Route path="/login" component={Login} />
    <Route component={Notfound}></Route> 
  </Switch>
</BrowserRouter>, document.getElementById("root"))