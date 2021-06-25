import React from 'react'
import axios from '../commons/axios'

import { toast } from 'react-toastify';

// 1.子組建做為參數傳遞並渲染
// 2.子組件可關閉彈出窗口
// 3.子組建與調用者可通訊

class AddInventory extends React.Component {

  state = {
    name: '',
    price: 0,
    tags: '',
    image: '',
    status: 'available'
  }

  handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }

  submit = e => {
    e.preventDefault();
    const product = {...this.state}
    axios.post("products", product).then(res => {
      toast.success('POST success!!!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      this.props.close()
    })
  }

  render() {
    return (
      <div className="inventory">
        <p className=" title has-text-centered">AddInventory</p>
        <br/>
        
        <form onSubmit={this.submit}>
          <div className="field">
            <div className="control">
            <label className="label">Message</label>
              <textarea className="textarea" name="name" value={this.state.name} onChange={this.handleChange}/>
            </div>
          </div>

          <div className="field">
            <div className="control">
            <label className="label">Price</label>
              <input type="number" className="input" name="price" value={this.state.price} onChange={this.handleChange}/>
            </div>
          </div>

          <div className="field">
            <div className="control">
            <label className="label">tags</label>
              <input type="text" className="input" name="tags" value={this.state.tags} onChange={this.handleChange}/>
            </div>
          </div>

          <div className="field">
            <div className="control">
            <label className="label">Image</label>
              <input type="text" className="input" name="image" value={this.state.image} onChange={this.handleChange}/>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label">Status</label>
              <div className="select is-fullwidth">
                <select name="status" value={this.state.status} onChange={this.handleChange}>
                  <option>available</option>
                  <option>unavailable</option>
                </select>
              </div>
            </div>
          </div>

          <br/>

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button" type="button" onClick={() => {this.props.close()}}>Cancel</button>
            </div>
          </div>
        </form>

        {/* <div className="control">
          <button className="button" onClick={
            () => this.props.close("AddInventory data")
          }>cancel</button>
        </div> */}
      </div>
    )
  }
}

export default AddInventory