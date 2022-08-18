import * as React from 'react';
import './style.css';
import Web3 from 'web3';

const YOUR_INFURA_API_KEY = 'https://ropsten.infura.io/';

const web3 = new Web3(`https://ropsten.infura.io/${YOUR_INFURA_API_KEY}`);
export default function App() {
  return (
    <div>
      <h1>Hello StackBlit!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
