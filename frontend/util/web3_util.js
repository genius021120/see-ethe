import Web3 from 'web3';

import infuraEndPoint from './web3_identity';
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndPoint));


export const start = () => {
  console.log(infuraEndpoint);

  web3.eth.getBlock(web3.eth.getBlock)
    .then(console.log);
};


const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(i);
  }
  return result;
};

export const processGetBlockResoponse = (err, block) => {
  // console.log('err', err);
  console.log('block', block);
};

// https://ethereum.stackexchange.com/questions/1587/how-can-i-get-the-data-of-the-latest-10-blocks-via-web3-js


export const getNLatestBlocks = (n, processBlockCB) => {
  const batch = new web3.BatchRequest();

  web3.eth.getBlockNumber().then((latestBlockNum) => {
    console.log('testing, 2', latestBlockNum);
    const blockRange = range(latestBlockNum - n, latestBlockNum + 1);
    const returnTransactionObjects = true;
    blockRange.forEach((blockNum) => {
      batch.add(web3.eth.getBlock.request(blockNum,
        returnTransactionObjects,
        processBlockCB));
    });
    batch.execute();
  });
};

// extracts txn objects from an incoming block
// returns an object of txns with hash as keys, a
// modified blocks with just txn hashes, and an array of txn hashes
// @return { txnsObject, txnsHashArray, block}
export const extractTxnObjectsFromBlock = (block) => {
  const { transactions } = block;
  const newBlock = { ...block };

  if ((typeof transactions[0] === 'object' && transactions[0] !== null)) {
    const txnsObject = {};
    const txnsHashArray = [];

    transactions.forEach((txn) => {
      txnsHashArray.push(txn.hash);
      txnsObject[txn.hash] = txn;
    });

    newBlock.transactions = [...txnsHashArray];
    return { txnsObject, txnsHashArray, block: newBlock };
  }
  // return undefined if transactions are not objects
  return { txnsObject: {}, txnsHashArray: {}, block };
};

export const requestBatcher = (...args) => {
  const batch = new web3.BatchRequest();
  args.forEach((req) => batch.add(req));
  return batch;
};

// export const getTransactionsFromBlock = (block) => {
//   const { transactions } = block;

// }



// https://ethereum.stackexchange.com/questions/38403/best-way-to-get-latest-block-data
// NOTE - filter is decremented and infura subscription does not support subscribe
// export const watchForNewBlocks = () => {
//   web3v2.eth.subscribe('newBlockHeaders', (blockHeader, other) => {
//     console.log(blockHeader);
//     console.log(other);
//   })
// };

