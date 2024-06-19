import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import TransactionDetail from './components/TransactionDetail';
import { Link } from "react-router-dom";

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockTransactions, setBlockTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionData, setTransactionData] = useState({});
  const transactionsPerPage = 10;

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(blockTransactions.length / transactionsPerPage)));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };


  const handleBlockDetails = async (blockNumber) => {
    // setBlockDetail(await alchemy.core.getBlock(blockNumber))
    const response = await alchemy.core.getBlock("latest")
    const allTransactions = response.transactions;
    setBlockTransactions(allTransactions)

  }

  const handleTransactionDetail = async(transactionHash) => {
    const response = await alchemy.core.getTransactionReceipt(transactionHash);

    const data = {
      blockHash: response.blockHash,
      blockNumber: response.blockNumber,
      from: response.from,
      to: response.to,
      gasUsed: response.gasUsed._hex,
      status: response.status,
      transactionHash: response.transactionHash,
      type: response.type,
    }

    setTransactionData(data);

  }
  
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = blockTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

  return (
    // <>
    //   <div className="App">Block Number: {blockNumber}</div>
    //   <button onClick={handleBlockDetails}>Block details</button>
    //   <div>
    //   <div className="grid-container">
    //     {currentTransactions.map((item, index) => (
    //       <div key={index} className="grid-item">
    //         {/* Render your item here */}
    //         {item} {/* Adjust based on your data structure */}
    //         <button onClick={() => handleTransactionDetail(item)}>Transaction Details</button>
    //       </div>
    //     ))}
    //   </div>
    //   <div className="pagination-controls">
    //     <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
    //     <span>Page {currentPage} of {Math.ceil(blockTransactions.length / transactionsPerPage)}</span>
    //     <button onClick={handleNextPage} disabled={currentPage === Math.ceil(blockTransactions.length / transactionsPerPage)}>Next</button>
    //   </div>
    // </div>

    // <div>
    //     <button>
    //       <Link to='/account'>Get account Balance</Link>
    //     </button>
    // </div>

    // <div>
    //   <TransactionDetail data={transactionData}/>
    // </div>
  
    // </>
    <>
      <div class="container">
        <section class="header">
          <h4>BlockSpace</h4>
        </section>

        <section class="body-container">
          <div class="current-block">
            <p>current block:<span>{blockNumber}</span></p>
            <button onClick={handleBlockDetails} class='detail-btn'>Block details</button>
            <button className='acc-btn'>
              <Link to='/account'>Get account Balance</Link>
            </button>
          </div>

          <div className="grid-container">
             {currentTransactions.map((item, index) => (
                <div key={index} className="grid-item">
                  {item} 
                  <button onClick={() => handleTransactionDetail(item)}>Transaction Details</button>
                </div>
            ))}
          </div>

          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1} class='nav-btn'>Previous</button>
            <span>Page {currentPage} of {Math.ceil(blockTransactions.length / transactionsPerPage)}</span>
            <button onClick={handleNextPage} disabled={currentPage === Math.ceil(blockTransactions.length / transactionsPerPage)} class='nav-btn'>Next</button>
          </div>

        </section>

        <section className='transaction-detail'>
          <TransactionDetail data={transactionData}/>
        </section>
      </div>
    </>
  )
}

export default App;
