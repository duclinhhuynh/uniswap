import React, {useState, useEffect} from 'react'
import { ethers, BigNumber } from 'hardhat'
import Web3Modal from 'ethers';
// INTERNAL IMPORT
import {
    checkIfWalletConnected, 
    connectWallet,
    connectingWithBooToken,
    connectingWithLifeToken,
    connectingSingleSwapToken,
    connectingMutipleSwapToken,
    connectingWithIWETHToken,
    connectingWithDAIToken,
} from '../Utils/appFeatures';

import { IWETHABI } from "./constants";
import ERC20 from './ERC20.json';

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
    return  <SwapTokenContext.Provider value={{swap}}>{children}</SwapTokenContext.Provider>
};

const swapcontext = () => {
  return (
    <div>swapcontext</div>
  )
}

export default swapcontext