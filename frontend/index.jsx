import React from "react";
import ReactDOM from "react-dom";

import configureStore from './store/store'
import Root from './components/root'
import * as Web3Util from './util/web3_util';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  Web3Util.getNLatestBlocks(100);

  // Web3Util.watchForNewBlocks();

  ReactDOM.render(<Root store={store} />, root);
});