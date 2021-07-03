import React from 'react'
// 用來獲取 history 參數的套件
import { withRouter } from 'react-router-dom'
class Toolbox extends React.Component {

  state = {
    searchText: '',
  }

  handleChange = e => {
    const value = e.target.value
    this.setState({
      searchText: value
    })
    console.log(value);
    this.props.search(value)
  }

  clearSearchText = () => {
    this.setState({
      searchText : ''
    })
    this.props.search("")
  }

  goCart = () => {
    this.props.history.push("/carts")
  }

  render() {
    return(
      <div className="tool-box">
        <div className="logo-text">
          store
        </div>

        <div className="search-box">
          <div className="field has-addons">
            <div className="control">
              <input type="text" className="input search-input" placeholder="Search Products"
              value={this.state.searchText}
              onChange={this.handleChange}/>
            </div>
            <div className="control">
              <button className="button" onClick={this.clearSearchText}>X</button>
            </div>
          </div>
        </div>

        <div className="cart-box" onClick={this.goCart}>
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-number">({this.props.cartNumber})</span>
        </div>
      </div>
    )
  }
}

export default withRouter(Toolbox)