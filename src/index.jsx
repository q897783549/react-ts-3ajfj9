import * as React from 'react';
import 'antd/dist/antd.min.css';

import { createRoot } from 'react-dom/client';
import App from './App';

const Web3 = require('web3');
export const web3 = new Web3('https://bsc-dataseed4.ninicoin.io');

export const myAddress = '0x7686Ed8dde3f74Ef9e55b3b6ba49E20770e46011';

var Buffer = require('buffer/').Buffer;
const _KEY = 'c54527b04023e7cd0a5d7114d20c040ba084afd8ededb8e29ce28c04a64e768a';
export const privateKey = Buffer.from(_KEY, 'hex');
export const test_abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'string',
        name: '_key',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'Uint256ParamSetted',
    type: 'event',
  },
  {
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_key',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'SetUint256Param',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'Timestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'GetA',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_key',
        type: 'string',
      },
    ],
    name: 'GetUint256Param',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const contractAddress = '0x250e65b8ffef3eaae46f8ef8c5eebb986795f278';
export const contract = new web3.eth.Contract(test_abi, contractAddress);

// 测试合约 币安测试网
// import { test_abi } from "./abi/abi";
// export const contractAddress = "0x5859a8a8da4c0ac0a63d2aad5558117d68effe9a";
// export const contract = new web3.eth.Contract(test_abi, contractAddress);

// 测试合约 币安主网
// import { test_abi } from "./abi/abi";
// export const contractAddress = "0x250e65B8FFef3eaAE46f8EF8c5EEBB986795F278";
// export const contract = new web3.eth.Contract(test_abi, contractAddress);

const rootElement = document.getElementById('root');
//@ts-ignore
const root = createRoot(rootElement);

root.render(
  <>
    <App />
  </>,
);
