import * as React from 'react';
import { useEffect } from 'react';
import { Button } from 'antd';
import { hero_world_fighter } from './math/math';
import Big from 'big.js';

import {
  web3,
  contract,
  contractAddress,
  myAddress,
  privateKey,
} from './index';
const Tx = require('ethereumjs-tx');

let number = 0;
let po = false;
let disable = false;
export default function App() {
  useEffect(() => {}, []);

  const onClick = () => {
    const str = web3.utils
      .BN(web3.utils.soliditySha3('2', 1660900219, 100))
      .toString();
    const a = new Big(str).mod(100);
    console.log(parseFloat(a));
  };

  const onClick2 = () => {
    web3.eth.getBlockNumber().then((id) => {
      web3.eth.getBlock('20573816').then((res) => {
        console.log(res);
      });
    });
  };

  const startCall = () => {
    if (!disable) {
      disable = true;
      web3.eth.getBlockNumber().then((res) => {
        number = res;
      });
      const timer = setInterval(() => {
        web3.eth.getBlockNumber().then((res1) => {
          console.log(res1);
          if (number != res1 && po === false) {
            po = true;
            web3.eth.getBlock(res1).then((res) => {
              loopJudgment(res.timestamp);
              clearInterval(timer);
            });
          }
        });
      }, 200);
    }
  };

  const loopJudgment = (timestamp) => {
    timestamp = timestamp + 3;
    const timer = setInterval(() => {
      let val = hero_world_fighter(timestamp + 9);
      console.log(val, new Date(timestamp * 1000), timestamp);
      if (val <= 30) {
        // console.log("send")
        //币安主网
        setTimeout(() => {
          send();
        }, 600);
        clearInterval(timer);
      }
      timestamp = timestamp + 3;
    }, 3000);
  };

  const send = () => {
    web3.eth.getTransactionCount(myAddress, (err, txCount) => {
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: contractAddress,
        gasLimit: web3.utils.toHex(500000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        //  需要修改
        data: contract.methods.fighter(39, 4).encodeABI(),
        // data: contract.methods.Timestamp(3443443).encodeABI(),
      };

      // 签署交易
      const tx = new Tx(txObject, {
        customChain: {
          //  需要修改
          //币安测试网
          // networkId: 97,
          // chainId: 97,
          // 币安主网
          networkId: 56,
          chainId: 56,
        },
      });
      tx.sign(privateKey);
      const serializedTx = tx.serialize();
      const raw = '0x' + serializedTx.toString('hex');
      web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash);
        number = 0;
        po = false;
        disable = false;
      });
    });
  };

  return (
    <div>
      <Button size='ml' onClick={onClick}>
        测试
      </Button>
      <Button size='ml' onClick={onClick2}>
        获得最新区块信息
      </Button>
      <Button size='ml' onClick={startCall}>
        Start
      </Button>
    </div>
  );
}
