import React, { Component } from 'react';

class Main extends Component {
  constructor(props){
    super(props)
   
  }
  render() {
    return (
      <div id="content">
        <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price)
          this.productName.value=""
          this.productPrice.value=""
          this.props.handler()
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
              { this.props.products.map((product,key)=>{
                let showButton=true
                if(product.owner===this.props.account){
                  showButton=false
                }
                  return(
                    !product.purchased?
                    <tr key={key}>
              <th scope="row">{key-1}</th>
              <td>{product.name}</td>
              <td>{product.price.toString()}</td>
              <td>{product.owner}</td>
              {showButton?<td><button className="buyButton"
              onClick={e=>{
                  e.preventDefault()
                  this.props.purchaseProduct(product.id,product.price.toString())
                  this.props.handler()
              }}
              >Buy</button></td>:null}
            </tr>:null
                  )
              })}
            
          </tbody>
        </table>
        <h2>Purchased Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
              { this.props.products.map((product,key)=>{
                  return(
                    product.purchased?
                    <tr key={key}>
              <th scope="row">1</th>
              <td>{product.name}</td>
              <td>{product.price.toString()}</td>
              <td>{product.owner}</td>
              
            </tr>:null
                  )
              })}
            
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
