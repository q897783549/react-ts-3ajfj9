import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
const Web3 = require("web3");

export const web3 = new Web3(window.web3.currentProvider);

// import { hero_world_abi } from "./abi/hero_world_abi";
// export const contractAddress = "0x62cb9f80d9e9d54392947483c8103a035032508c";
// export const contract = new web3.eth.Contract(hero_world_abi, contractAddress);

// import { test_abi } from "./abi/abi";
// export const contractAddress = "0x5859a8a8da4c0ac0a63d2aad5558117d68effe9a";
// export const contract = new web3.eth.Contract(test_abi, contractAddress);
 
import { test_abi } from "./abi/abi";
export const contractAddress = "0x250e65B8FFef3eaAE46f8EF8c5EEBB986795F278";
export const contract = new web3.eth.Contract(test_abi, contractAddress);



const rootElement = document.getElementById('root');
//@ts-ignore
const root = createRoot(rootElement);

root.render(
  <>
    <App />
  </>
);
