import React from 'react'
import { toast } from 'react-toastify';

import { formatPrice } from '../../commons/helpers'
import axios from '../../commons/axios'

import EditInventory from '../EditInventory'
import Panel from '../Panel'


class Product extends React.Component {

  toEdit = () => {
    Panel.open({
      props: {
        product: this.props.product,
        deleteProduct: this.props.delete
      },
      component: EditInventory,
      callback: data => {
        console.log(data);
      }
    })
  }

  addCart = async () => {
    try {
      const { id, name, image, price} = this.props.product
      const res = await axios.get(`/carts?productId=${id}`)
      const carts = res.data
      if(carts && carts.length > 0){
        const cart = carts[0]
        cart.mount += 1
        await axios.put(`/carts/${cart.id}`, cart)
      }else{
        const cart = {
          productId: id,
          name, 
          image,
          price,
          mount: 1
        }
        await axios.post('carts', cart)
      }
      this.props.updateCartNumber()
      toast.success("Add cart success")
    } catch (error) {
      toast.error("Add cart failed")
    }
  }
  
  render() {
    const { name, tags, image, price, status} = this.props.product
    const p_class = {
      available: "product",
      unavailable: "product out-stock"
    }

    return(
      <div className={p_class[status]}>
        <div className="p-content">
          <div className="p-head has-text-right" onClick={this.toEdit}>
            <span className="icon edit-btn">
              <i className="fas fa-sliders-h"></i>
            </span>
          </div>
          <div className="img-wrapper">
            <div className="out-stock-text">Out of stock</div>
            <figure className="img is-4by3">
              <img src={image} alt={name}/>
            </figure>
            <p className="p-tags">{tags}</p>
            <p className="p-name">{name}</p>
          </div>
        </div>
        <div className="p-footer">
          <p className="price">{formatPrice(price)}</p>
          <button className="add-cart" disabled={status === "unavailable"} onClick={this.addCart}>
            <i className="fas fa-shopping-cart"></i>
            <i className="fas fa-exclamation"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Product