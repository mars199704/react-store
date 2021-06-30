import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import axios from '../../commons/axios'

import Toolbox from './Toolbox'
import Product from './Product'

import Panel from '../Panel'
import AddInventory from '../AddInventory'

class Products extends React.Component{

  state = {
    products: [
      {
        name: "Air Jordan 3",
        price: "44900",
        status: "available",
        tags: "",
        image: "/images/12.jpg",
        id: 12
      }
    ],
    sourceProduct: [],
    cartNumber: 0
  }

  componentDidMount() {
    // Make a request for a user with a given ID
    axios.get('products')
    .then(response => {
      // console.log(response.data);
      this.setState({
        products: response.data,
        sourceProduct: response.data
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }

  // search
  search = text => {
    console.log(text);
    // 1. Get new Array
    let _products = [...this.state.sourceProduct]
    // 2. filter new Array
    _products = _products.filter(product => {
      const matchArr = product.name.match(new RegExp(text, 'gi'))
      return matchArr
    })
    // 3. set state
    this.setState({
      products: _products
    })
  }

  toAdd = () => {
    // console.log(Panel);
    Panel.open({
      component: AddInventory,
      callback: data => {
        if(data){
          this.add(data)
        }
      }
    })
  }

  add = product => {
    const _product = [...this.state.products]
    _product.push(product)
    const _sProduct = [...this.state.sourceProduct]
    _sProduct.push(product)
    this.setState({
      products: _product,
      sourceProduct: _sProduct
    })
  }

  delete = id => {
    const _products = this.state.products.filter(p => p.id !== id)
    const _sProducts = this.state.sourceProduct.filter(p => p.id !== id)
    this.setState({
      products: _products,
      sourceProduct: _sProducts
    })
  }

  updateCartNumber = async() => {
    const Num = await this.initCartNumber()
    this.setState({
      cartNumber: Num
    })
  }

  initCartNumber = async() => {
    const res = await axios.get('/carts')
    const carts = res.data || []
    const cartNum = carts.map(cart => cart.mount).reduce((a, val) => a + val, 0)
    return cartNum
  }

  render() {
    return(
    <div>
      <Toolbox search={this.search} cartNumber={this.state.cartNumber}/>
      <div className="products">
        <div className="columns is-multiline is-desktop">
          <TransitionGroup component={null}>
          {
              this.state.products.map(product => {
                return(
                  <CSSTransition 
                  classNames="product-fade" 
                  timeout={300} 
                  key={product.id}>
                  <div className="column is-3" key={product.id}>
                    <Product 
                      product={product}
                      delete={this.delete}
                      updateCartNumber={this.updateCartNumber}/>
                  </div>
                  </CSSTransition>
                )
              })
            }
          </TransitionGroup>
        </div>
        <button className="button is-primary add-btn" 
        onClick={this.toAdd}>Panel</button>
      </div>
    </div>
    )
  }
}

export default Products