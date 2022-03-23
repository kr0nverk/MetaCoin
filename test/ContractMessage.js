// Chai test network
const { assert } = require("chai")


const ContractMessage = artifacts.require("./ContractMessage.sol")

require("chai")
  .use(require("chai-as-promised"))
  .should()

contract('ContractMessage', ([contractOwner, secondAddress, thirdAddress]) => {
  let contract

 
  before(async () => {
    contract = await ContractMessage.deployed()
  })


  describe('deployment', () => {
    it('deploys successfully', async () => {
      const address = await contract.address

      assert.notEqual(address, '')
      assert.notEqual(address, undefined)
      assert.notEqual(address, null)
      assert.notEqual(address, 0x0)
    })


    it('has a message', async () => {
      const message = await contract.message()
      assert.equal(message, 'Hello')
    })
  })

  describe('message', () => {
    it('contract owner sets a message', async () => {
      // set new message
      await contract.setMessage('Hi its Alex', { from: contractOwner }) 

      const message = await contract.message()
      assert.equal(message, 'Hi its Alex')
    })

    // make sure only owner can setMessage
    it('is not the owner', async () => {
      await contract.setMessage('Hi there!', { from: secondAddress })
        .should.be.rejected

      await contract.setMessage('Hi there!', { from: thirdAddress })
        .should.be.rejected
    })
  })
})
