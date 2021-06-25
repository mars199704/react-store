import React from 'react'

class Toolbox extends React.Component {

  state = {
    searchText: ''
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

        <div className="cart-box">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-number">(0)</span>
        </div>
      </div>
    )
  }
}

export default Toolbox