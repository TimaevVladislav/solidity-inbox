const path = require("path")
const fs = require("fs")
const solc = require("solc")

const inbox = path.resolve(__dirname, "contracts", "Inbox.sol")
const source = fs.readFileSync(inbox, "utf8")

module.exports = solc.compile(source, inbox).contracts[":Inbox"]