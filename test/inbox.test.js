const assert = require("assert")

const { Web3 } = require("web3")
const ganache = require("ganache")
const {interface, bytecode} = require("../compile")

const web3 = new Web3(ganache.provider())

let accounts
let contract

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ["Hello Vlad"]})
        .send({from: accounts[0], gas: "1000000"})
})


describe("Inbox", () => {
    it("deploys a contract", () => {
      assert.ok(contract.options.address)
    })

    it("has a default message",  async () => {
       const message = await contract.methods.message().call()
       assert.equal(message, "Hello Vlad")
    })

    it("can change the message",  async () => {
       await contract.methods.setMessage("Bye").send({ from: accounts[0] })
       const message = await contract.methods.message().call()
       assert.equal(message, "Bye")
    })
})