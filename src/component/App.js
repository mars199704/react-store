import React from 'react'

import Header from './header/Header'
import Products from './products/Products'

class App extends React.Component{
  render() {
    return(
      <div className="main">
        <Header nickname="nick" />
        <Products />
      </div>
    )
  }
}

export default App