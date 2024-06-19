import React, { useState } from 'react';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import './Account.css';
import { Link } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Account() {

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await alchemy.core.getBalance(address, 'latest');
    setBalance(Utils.formatEther(response));
  }
  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Account Balance</h1>
        <h6 className='back'><Link to='/'>Back to Home</Link></h6>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          className="input"
        />
        <button type="submit" className="button">Submit</button>
      </form>

      <div style={{display: 'flex'}} className="result-table">
        <h5>Account: <span>{address}</span></h5>
        <h6>Balance: <span>{balance}</span> ETH</h6>
      </div>
    </div>

    
  )
}

export default Account