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
    sourceProduct: []
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

  render() {
    return(
    <div>
      <Toolbox search={this.search}/>
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
                    <Product product={product}/>
                  </div>
                  </CSSTransition>
                )
              })
            }
          </TransitionGroup>
        </div>
        <button className="button is-primary add-btn" 
        onClick={this.toAdd}>add</button>
      </div>
    </div>
    )
  }
}

export default Products