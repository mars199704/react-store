import React, { Fragment } from 'react'

import Panel from '../Panel'
import UserProfile from '../UserProfile'
class Header extends React.Component{

  toProfile = () => {
    Panel.open({
      component: UserProfile,
      props: {
        user: this.props.user
      },
      callback: data => {
        console.log(data);
      }
    })
  }

  renderLink() {

    if(this.props.user.nickname){
      console.log(this.props.user.nickname);
      return (
        <span className="nickname" onClick={this.toProfile}>
          <i className="far fa-user"></i>
          {this.props.user.nickname}
        </span>
      )
    }else{
      return(
        <Fragment>
            <a href="/auth/login">Login</a>
            <a href="/register">Register</a>
        </Fragment>
      )
    }
  }

  render() {
    return(
      <div className="header">
        <div className="grid">
          <div className="start">
            <a href="/">Home</a>
          </div>
          <div className="end">
            {this.renderLink()}
          </div>
        </div>
      </div>
    )
  }
}

export default Header