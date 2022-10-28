import * as React from 'react';
import { useEffect } from 'react';
import { Button } from 'antd';
import { hero_world_fighter, d7bd74b3 } from './math/math';
import Big from 'big.js';
import sha256 from 'js-sha256';
import {
  web3,
  contract,
  contractAddress,
  myAddress,
  privateKey,
} from './index';
const Tx = require('ethereumjs-tx');

let number = 0;
let total = 0;
let lock = false;
let disable = false;
export default function App() {
  useEffect(() => {}, []);

  const onClick = async () => {
    // const str = web3.utils
    //   .BN(web3.utils.soliditySha3('2', 1660900219, 100))
    //   .toString();
    // const a = new Big(str).mod(100);
    // console.log(parseFloat(a));

    // web3.eth.getBlock('22482969').then(
    //   (res) => {
    //     console.log(res);
    //   },
    const timer = setInterval(async () => {
      // web3.eth
      //   .getStorageAt('0x19d3f24eb8294e0ae149b06cff486b0cfc64f4c8', 201)
      //   .then((res) => {
      //     console.log(res);
      //   });
      // web3.eth.getBlockNumber().then((res1) => {
      //   web3.eth.getBlock(res1).then(async (res) => {
      //     console.log(res, CryptoJS.SHA256([blockNumber, nonce, data, prev]));
      //   });
      // });
      // let returnvalue2 = await contract.methods
      //   .getRandom(myAddress, 32332, 2222)
      //   .call();
      // console.log(returnvalue2, 222);
    }, 1000);
    // console.log(
    //   parseFloat(
    //     new Big(
    //       web3.utils
    //         .BN(
    //           web3.utils.soliditySha3(
    //             '0x7686Ed8dde3f74Ef9e55b3b6ba49E20770e46011',
    //             '0x1889a60cb8f04f1018f80941460db34f3965b4937ced6aa9880d6d14637bb2b0',
    //             123,
    //             1666704900,
    //             '0x00000000000000000000000000000000000000000000000000000000000026eb',
    //           ),
    //         )
    //         .toString(),
    //     ).mod(100),
    //   ),
    // );
    // );
  };

  const onClick2 = () => {
    web3.eth.getBlockNumber().then((id) => {
      // web3.eth.getBlock('22482969').then((res) => {
      console.log(id);
      // });
    });
  };

  const startCall = async () => {
    if (!disable) {
      disable = true;
      await web3.eth.getBlock('latest').then((block) => {
        number = block.number;
        console.log(block.number);
      });
      const timer = setInterval(() => {
        web3.eth.getBlock('latest').then((block) => {
          console.log(block.number);
          if (number != block.number && lock === false) {
            lock = true;
            console.log(
              block.number,
              new Date(block.timestamp * 1000).getTime() / 1000,
            );
            send(block.timestamp);
            clearInterval(timer);
          }
        });
      }, 50);
    }
  };

  const reGetTotal = async () => {
    await web3.eth
      .getStorageAt('0x19d3f24eb8294e0ae149b06cff486b0cfc64f4c8', 201)
      .then((res) => {
        total = res;
      });
  };
  const loopJudgment = (timestamp, hash) => {
    timestamp = timestamp + 3;
    let time = 0;
    const timer = setInterval(() => {
      time++;
      if (time == 7) {
        reGetTotal();
        time = 0;
      }
      // let val = hero_world_fighter(timestamp + 9);
      let val = d7bd74b3(timestamp, hash, total);
      let val2 = d7bd74b3(timestamp, hash, total + 1);
      console.log(val, new Date(timestamp * 1000).getTime(), timestamp);
      if (val <= 50 && val2 <= 50) {
        // console.log("send")
        //币安主网
        setTimeout(() => {
          send();
        }, 600);
        clearInterval(timer);
      }
      timestamp = timestamp + 3;
    }, 200);
  };

  const send = async (timestamp) => {
    web3.eth.getTransactionCount(myAddress, (err, txCount) => {
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: contractAddress,
        gasLimit: web3.utils.toHex(500000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        //  需要修改
        // data: contract.methods.fighter(39, 4).encodeABI(),
        data: contract.methods.Timestamp(timestamp).encodeABI(),
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
      console.log(new Date().getTime() / 1000);
      web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash);
        number = 0;
        lock = false;
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
