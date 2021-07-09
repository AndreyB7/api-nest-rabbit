
const Web3 = require("web3");

const SOCKET_ADDRESS = process.env.ETH_NODE_RPC_WEBSOCKET_ADDR;

const provider = new Web3.providers.WebsocketProvider(SOCKET_ADDRESS);

const web3 = new Web3(provider);

web3.eth.net
  .isListening()
  .then(() => {
    console.info(`[Web3][Websocket] connected: ${SOCKET_ADDRESS}.`);
  })
  .catch(e => {
    console.error("[Web3][Websocket] error:", e);
    web3.setProvider(provider);
  });

export default web3;
