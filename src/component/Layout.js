import React from 'react'

import Header from './header/Header'

const Layout = props => (
  <div className="main">
    <Header/>
    {props.children}
  </div>
)

export default Layout