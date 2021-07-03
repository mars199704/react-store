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
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-success" type="email" placeholder="Text input" name="email" {...register("email")} required/>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-danger" type="password" placeholder="Email input" name="password" {...register("password")} required/>
            </div>
          </div>

          <div className="control">
            <button className="button is-link">Login</button>
          </div>
        </form>
      </div>
  )
}

// class Login extends React.Component {

//   // State
//   state = {
//     email: '',
//     password: '',
//   }

//   submitHandler = event => {
//     // 1.阻止阻止默認行為
//     event.preventDefault();
//     // 2.獲取表單數據
//     console.log(this.state);

//     // console.log(formData);

//     // 3.處理登陸邏輯

//     // 4.跳轉到 app 頁面
//     // this.props.history.push('/')
//   }

//   handleChange = e => {
//     console.log(e.target.name, e.target.value);
//     this.setState({
//       [e.target.name]: e.target.value,
//     })
//   }

//   render() {
//     return (
//     // 這樣寫之後就可以接受一個 return 中存在多個並列元素
//     <Fragment>  
//       <div className="login-wrapper">
//         <form className="box login-box" onSubmit={this.submitHandler}>
//           <div className="field">
//             <label className="label">Username</label>
//             <div className="control has-icons-left has-icons-right">
//               <input className="input is-success" type="text" placeholder="Text input" value={this.state.email} name="email" onChange={this.handleChange}/>
//             </div>
//           </div>

//           <div className="field">
//             <label className="label">Email</label>
//             <div className="control has-icons-left has-icons-right">
//               <input className="input is-danger" type="email" placeholder="Email input" value={this.state.password} name="password" onChange={this.handleChange}/>
//             </div>
//           </div>

//           <div className="control">
//             <button className="button is-link">Login</button>
//           </div>
//         </form>
//       </div>
//     </Fragment>
//     )
//   }
// }

// export default Login