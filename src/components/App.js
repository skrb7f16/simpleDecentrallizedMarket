import React, { Component } from 'react';
import './App.css';
import 'web3'
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'


class App extends Component {

  constructor(props){
    super(props)
    this.state={
      account:'',
      productCount:0,
      products:[],
      loading:true,
      change:false
    }
    this.createProduct=this.createProduct.bind(this)
    this.purchaseProduct=this.purchaseProduct.bind(this)
    this.changeState=this.changeState.bind(this)
    
  }
  async componentDidMount(){
    await this.loadWeb3()
    await this.loadBlockChainData()
    this.setState({change:false})
  }


  async loadWeb3(){
    if(window.ethereum){
      window.web3=new Web3(window.ethereum)
      await window.ethereum.enable();
    }
    else if(window.web3){
      window.web3=new Web3(window.web3.currentProvider);

    }
    else{
      console.log("not supported")
    }
  }

  async loadBlockChainData(){
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]

    if(networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      this.setState({productCount:parseInt(productCount.toString())})
      for(var i=1;i<=this.state.productCount;i++){
        const product=await marketplace.methods.products(i).call()
        this.setState({
          products:[...this.state.products,product]
        })
      }
      this.setState({ loading: false})
      
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  async createProduct(name,price){
    this.setState({ loading: true })
     this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
    .catch(e=>{
      console.log(e)
    })
    this.changeState()

  }

  async purchaseProduct(id,price){
    this.setState({loading:true})
    this.state.marketplace.methods.purchaseProduct(id).send({from:this.state.account,value:price}).once('reciept',(reciept)=>{
      this.setState({loading:false})
    }).catch(e=>{
      alert(e.message)
    })
    this.changeState()
  }

  changeState(){
    console.log("meow")
    this.setState({change:!this.state.change})
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <Main createProduct={this.createProduct} products={this.state.products} purchaseProduct={this.purchaseProduct} account={this.state.account} handler={this.changeState}/>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
