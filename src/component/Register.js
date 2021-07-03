import React from 'react'
// import { Fragment } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import axios from '../commons/axios'

export default function Login(props) {

  const { register, handleSubmit } = useForm()

  const submitHandler = async data => {
    // 2.獲取表單數據
    console.log(data);
    // 3.處理登陸邏輯
    try {
      const { email, password } = data
      const res = await axios.post('/auth/login', { email, password})
      const jwToken = res.data
      console.log(jwToken);
      global.auth.setToken(jwToken)
      toast.success("Login Success")
      // 4.跳轉到 app 頁面
      props.history.push('/')
    } catch (error) {
      const message = error.response.data.message
      toast.error(message)
    }
  }

  return (
    <div className="login-wrapper">
        <form className="box login-box" onSubmit={handleSubmit(submitHandler)}>
          <div className="field">
            <label className="label">Nickname</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-success" type="text" placeholder="Nickname" name="email" {...register("email")} required/>
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-success" type="email" placeholder="Email" name="email" {...register("email")} required/>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-danger" type="password" placeholder="Password" name="password" {...register("password")} required/>
            </div>
          </div>

          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
        </form>
      </div>
  )
}