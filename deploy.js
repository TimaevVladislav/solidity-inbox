const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3")
const { interface, bytecode } = require("./compile")

const provider = new HDWalletProvider(
    "Our Web3 API Key works across several networks, use it on one or use it on all",
    "https://goerli.infura.io/v3/ea71abb3090a4aae894cce974163dab9"
)

const web3 = new Web3(provider)
const deploy = async () => {
   const accounts = await web3.eth.getAccounts()
   const contract = await web3.eth.Contract(JSON.parse(interface))
         .deploy({data: bytecode, arguments: ["Hi there"]})
         .send({ gas: "100000", from: accounts[0] })
}

deploy()