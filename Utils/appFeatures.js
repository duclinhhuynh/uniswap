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
    IWETHAddress,
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
        return firstAccount;
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
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
}

// fetching Boo

export const fetchBooContract = (singerOrProvider) => new ethers.Contract(BooTokenAddress,
    BooTokenABI, singerOrProvider
);

export const connectingWithBooToken = async() => {
    try {
        const Web3Modal = new Web3Modal();
        const connection = await Web3Modal.connect();
        const provider = new ethers.provider.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchBooContract(signer); 
        return contract;
    } catch (error) {
        
    }
}

// life Token

export const fetchLifeContract = (singerOrProvider) => new ethers.Contract(LifeTokenAddress,
    LifeTokenABI, singerOrProvider
);


export const connectingWithLifeToken = async() => {
    try {
        const Web3Modal = new Web3Modal();
        const connection = await Web3Modal.connect();
        const provider = new ethers.provider.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchLifeContract(signer)
        return contract; 
    } catch (error) {
        
    }
}


// fetching single 

export const fetchSingleSwapContract = (singerOrProvider) => new ethers.Contract(SingleSwapTokenAddress,
    SingleTokenABI, singerOrProvider
);

export const connectingSingleSwapToken = async() => {
    try {
        const Web3Modal = new Web3Modal();
        const connection = await Web3Modal.connect();
        const provider = new ethers.provider.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchSingleSwapContract(signer); 
        return contract;
    } catch (error) {
        
    }
}

// fetching mutiple

export const fetchMutipleSwapContract = (singerOrProvider) => new ethers.Contract(MutilHopSwapTokenAddress,
    MutilHopTokenABI, singerOrProvider
);

export const connectingMutipleSwapToken = async() => {
    try {
        const Web3Modal = new Web3Modal();
        const connection = await Web3Modal.connect();
        const provider = new ethers.provider.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchMutipleSwapContract(signer)
        return contract; 
    } catch (error) {
        
    }
}


// fetching IWETH contract 

export const fetchIWETHContract = (singerOrProvider) => new ethers.Contract(IWETHAddress,
    IWETHABI, singerOrProvider
);

export const connectingWithIWETHToken = async() => {
    try {
        const Web3Modal = new Web3Modal();
        const connection = await Web3Modal.connect();
        const provider = new ethers.provider.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchIWETHContract(signer); 
        return contract;
    } catch (error) {
        
    }
}

// fetch with dai token
const DAIaddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const fetchDAIContract = (singerOrProvider) => new ethers.Contract(DAIaddress,
    IWETHABI, singerOrProvider
);

export const connectingWithDAIToken = async() => {
    try {
        const Web3Modal = new Web3Modal();
        const connection = await Web3Modal.connect();
        const provider = new ethers.provider.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchIWETHContract(signer); 
        return contract;
    } catch (error) {
        
    }
}
