import React, { useState, useEffect, useMemo } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import axios from '../commons/axios'
import { formatPrice } from '../commons/helpers'
import Layout from './Layout'

import CartItem from './CartItem'

const Cart = () => {
    // 使用 Hook 撰寫，需要先導入 useState
    const [carts, setCarts] = useState([]) // 返回 []，使用解構

    useEffect(() => {
      axios.get('/carts').then(res => 
        setCarts(res.data)
      )
    }, [])

    const totalPrice = useMemo(() => {
      const totalPrice = carts
      .map(cart => cart.mount * parseInt(cart.price))
      .reduce((a, value) => a + value, 0)
      return formatPrice(totalPrice)
    }, [carts])

    const updateCart = cart => {
      const newCart = [...carts]
      const _index = newCart.findIndex(c => c.id === cart.id)
      newCart.splice(_index, 1, cart)
      setCarts(newCart)
    }

    const deleteCart = cart => {
      const _carts = carts.filter(c => c.id !== cart.id)
      setCarts(_carts)
    }

    return (
      <Layout>
      <div className="cart-page">
        <span className="cart-title">Shopping Cart</span>
        <div className="cart-list">
          {/* null 是為了不讓他另外開一個 div */}
          <TransitionGroup component={null}> 
            {
              carts.map(cart => (
                <CSSTransition className="cart-item" timeout={300} key={cart.id}> 
                  <CartItem key={cart.id} cart={cart} 
                  updateCart={updateCart} 
                  deleteCart={deleteCart}/>
                </CSSTransition>
                )
              )
            }
          </TransitionGroup>
        </div>
        {
          carts.length === 0 ? <p className="no-cart">NO GOODS</p> : ''
        }
        <div className="cart-total">
          Total:
          <span className="total-price">{totalPrice}</span>
        </div>
      </div>
    </Layout>
    )
}

export default Cart