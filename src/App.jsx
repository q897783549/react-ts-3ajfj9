import * as React from "react";
import { useEffect } from "react";
import { Button } from "antd";
import {hero_world_fighter} from "./math/math"
import {web3,contract,contractAddress} from './index'
const myAddress =  "0x7686Ed8dde3f74Ef9e55b3b6ba49E20770e46011"

var Buffer = require("buffer/").Buffer;
const YOUR_INFURA_API_KEY = 'c54527b04023e7cd0a5d7114d20c040ba084afd8ededb8e29ce28c04a64e768a';
const Tx = require("ethereumjs-tx");
const privateKey = Buffer.from(
  YOUR_INFURA_API_KEY,
  "hex"
);

let number = 0;
let po = false

export default function App() {
  useEffect(() => {
  }, []);

  const onClick = () => {
      console.log(hero_world_fighter(1660933430))
  };

  const onClick2 = () => {
      web3.eth.getBlockNumber().then((id) => {
          web3.eth.getBlock(id).then((res) => {
            console.log(res)
        })
      })
  };

  const loopJudgment = (timestamp) => {
    timestamp = timestamp + 3;
    const timer = setInterval(() => {
      let val = (timestamp + 9) % 10 ;
      console.log(val,new Date( timestamp * 1000 ), timestamp);
      if (val == 3) {
        // console.log("send")
      //币安主网
        setTimeout(()=>{
          send();
        },600)
        clearInterval(timer);
      }
      timestamp = timestamp + 3;
    }, 3000);
  };

  const onClick3 = () => {
    web3.eth.getBlockNumber().then((res) => {
      number = res;
    });
    const timer = setInterval(() => {
      web3.eth.getBlockNumber().then((res1) => {
        console.log(res1)
        if (number != res1 && po === false) {
          po = true
          web3.eth.getBlock(res1).then((res) => {
            loopJudgment(res.timestamp);
            clearInterval(timer);
          });
        }
      });
    }, 200);
  };

  const send = () => {
    web3.eth.getTransactionCount(
      myAddress,
      (err, txCount) => {
        // 创建交易对象
        const txObject = {
          nonce: web3.utils.toHex(txCount),
          to: contractAddress,
          gasLimit: web3.utils.toHex(500000),
          gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
          // data: contract.methods.fighter(39,4).encodeABI(),
          data: contract.methods.Timestamp(3443443).encodeABI(),
        };

        // 签署交易
        const tx = new Tx(txObject, {
          customChain: {
            //币安测试网
            // networkId: 97,
            // chainId: 97,
            // 币安主网
            networkId:56,
            chainId: 56,
          },
        });
        tx.sign(privateKey);

        const serializedTx = tx.serialize();
        const raw = "0x" + serializedTx.toString("hex");

        // contract.methods.Timestamp().call().then(console.log);
        // 广播交易
        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
          console.log("txHash:", txHash,err);
          number = 0;
          po = false
        });

      }
    );
  };
  return (
    <div>
      <Button size="ml" onClick={onClick}>
        test_abi
      </Button>
      <Button size="ml" onClick={onClick2}>
        getBlock
      </Button>
      <Button size="ml" onClick={onClick3}>
        onClick3
      </Button>
    </div>
  );
}
