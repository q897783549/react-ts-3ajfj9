import { web3 } from '../index';
import Big from 'big.js';

const myAddress = '0x7686Ed8dde3f74Ef9e55b3b6ba49E20770e46011';
export const hero_world_fighter = (timestamp) => {
  const str = web3.utils
    .BN(web3.utils.soliditySha3(timestamp, myAddress))
    .toString();
  const a = new Big(str).mod(100);
  return parseFloat(a);
};
