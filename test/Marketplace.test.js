const { assert, } = require("chai")
const { utils } = require("react-bootstrap")

const Marketplace=artifacts.require('./Marketplace.sol')

contract('Marketplace',([deployer,seller,buyer])=>{
    let marketplace
    before(async()=>{
        marketplace=await Marketplace.deployed()
    })

    describe('deployement', async() => {
        it('deploys successfully',async()=>{
            const address=await marketplace.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })

        it('has a name',async()=>{
            const name=await marketplace.name()
            assert.equal(name,'meow meow')
        })

    })


    describe('products', async() => {
        let result,productCount;
        before(async()=>{
            result=await marketplace.createProduct('iphone',web3.utils.toWei('1','Ether'),{from: seller});
            productCount=await marketplace.productCount();
        })

        it('creates product',async()=>{
            assert.equal(productCount,1);
            const event=result.logs[0].args
            assert.equal(event.id.toNumber(),productCount.toNumber(),'id is correct')
        })

        it('lists product',async()=>{
            const products=await marketplace.products(productCount);
            assert.equal(products.id.toNumber(),productCount.toNumber(),'id is correct')
        })

        it('sells product',async()=>{
            result=await marketplace.purchaseProduct(productCount,{from: buyer,value:web3.utils.toWei('1','Ether')})
            const event=result.logs[0].args
            assert.equal(event.id.toNumber(),productCount.toNumber(),'id is correct')
        })
        
    })
    
})
