import { ethers } from "hardhat";
import Web3Modal from 'web3modal';

import {
    BooTokenAddress, 
    BooTokenABI,
    LifeTokenAddress,
    LifeTokenABI,
    SingleSwapTokenAddress,
    SingleTokenABI,
    MutilHopSwapTokenAddress,
    MutilHopTokenABI,
    IWETHABI
}from '../context/constants';

// CHECK IF wallet is connect
export const checkIfWalletConnected = async() => {
    try {
        if(!window.ethereum) return console.log("install Metamask");
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const firstAccount = accounts[0];
    } catch (error) {
        console.log(error);
    }
}

// connnect wallet

export const connectWallet = async() => {
    try {
        if(!window.ethereum) return console.log("install Metamask");
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        const firstAccount = accounts[0];
    } catch (error) {
        console.log(error);
    }
}

// boo fetching

export const fetchBooContract = (singerOrProvider) => new ethers.Contract(BooTokenAddress,
    BooTokenABI, singerOrProvider
);

//connecting 
export const connectingWithBooToken = async() => {
    try {
        const Web3Modal = new Web3Modal();
        const connection = await Web3Modal.connect();
        const provider = new ethers.provider.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchBooContract(signer) 
    } catch (error) {
        
    }
}

// boo fetching

export const fetchLifeContract = (singerOrProvider) => new ethers.Contract(LifeTokenAddress,
    LifeTokenABI, singerOrProvider
);

//connecting 
export const connectingWithLifeToken = async() => {
    try {
        const Web3Modal = new Web3Modal();
        const connection = await Web3Modal.connect();
        const provider = new ethers.provider.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchLifeContract(signer) 
    } catch (error) {
        
    }
}