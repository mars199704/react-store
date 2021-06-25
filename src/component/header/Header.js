import React, { Fragment } from 'react'

class Header extends React.Component{

  renderLink() {
    const nickname = this.props.nickname
    if(nickname){
      return (
        <span className="nickname">
          <i className="far fa-user"></i>
          {this.props.nickname}
        </span>
      )
    }else{
      return(
        <Fragment>
            <a href="/">Login</a>
            <a href="/">Register</a>
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