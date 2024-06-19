import React from 'react';
import './TransactionDetail.css';

function TransactionDetail({data}) {
    console.log(data);
  return (
    <>
      <table>
        <tbody>
            <tr>
              <th>Block Hash</th>
              <td>{data.blockHash}</td>
            </tr>
            <tr>
              <th>Block Number</th>
              <td>{data.blockNumber}</td>
            </tr>
            <tr>
              <th>From</th>
              <td>{data.from}</td>
            </tr>
            <tr>
              <th>To</th>
              <td>{data.to}</td>
            </tr>
            <tr>
              <th>Gas Used</th>
              <td>{data.gasUsed}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{data.status}</td>
            </tr>
            <tr>
              <th>Transaction Hash</th>
              <td>{data.transactionHash}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{data.type}</td>
            </tr>
          </tbody>
      </table>
    </>
  )
}

export default TransactionDetail