import React, {useEffect, useState, useContext} from 'react';
import { ethers, BigNumber} from 'ethers';
import Web3Modal from 'web3modal'; 
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
    const swap = "Hello to swap my token"

    // usestate
    // const userAccount =  checkIfWalletConnected();
    const [currentAccount, setCurrentAccount] = useState();
    const [ether, setEther] = useState('');
    const [networkConnect, setnetWorkConnect] = useState(''); 
    const [weth9, setWeth9] = useState(''); 
    const [dai, setDai] = useState(''); 
    const [tokenData, setTokenData]= useState([])

    const addToken = [
        // "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "0x3Af511B1bdD6A0377e23796aD6B7391d8De68636",
        "0x10537D7bD661C9c34F547b38EC662D6FD482Ae95"
    ];


    // FETCH DATA 
   // Thay đổi hàm fetchingData
 
    const fetchingData = async () => {
        try {
            // GET USER ACCOUNT
            const userAccount = await checkIfWalletConnected();
            setCurrentAccount(userAccount);
            // CREATE PROVIDER
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);

            // CHECK BALANCE
            const balance = await provider.getBalance(userAccount);
            const ethValue = ethers.utils.formatEther(balance);
            setEther(ethValue);
            console.log("eth Value", ethValue);
            // GET NETWORK
            const networks = await provider.getNetwork();
            console.log(networks);
            setnetWorkConnect(networks.name);

            // FETCH TOKEN DATA
            const tempTokenData = await Promise.all(addToken.map(async (el, i) => {
                const contract = new ethers.Contract(el, ERC20.abi, provider);
                const symbol = await contract.symbol();
                const name = await contract.name();
                const userBalance = await contract.balanceOf(userAccount);
                const TokenLeft = BigNumber.from(userBalance).toString();
                const tokenTokenBal = ethers.utils.formatEther(TokenLeft);
                return {
                    name: name,
                    symbol: symbol,
                    tokenBalance: tokenTokenBal
                };
            }));
            
            setTokenData(tempTokenData);
            console.log(tempTokenData);

            // DAI TOKEN 
            const dai = await connectingWithDAIToken();
            const daiBal = await dai.balanceOf(userAccount);
            const TokenDai = BigNumber.from(daiBal).toString();
            const convertTotkendai = ethers.utils.formatEther(TokenDai);
            setDai(convertTotkendai);
            console.log(convertTotkendai);

            // WETH token 
            const weth9 = await connectingWithIWETHToken();
            const ethBal = await weth9.balanceOf(userAccount);
            const Tokeneth = BigNumber.from(ethBal).toString();
            const convertTotkeneth = ethers.utils.formatEther(Tokeneth);
            console.log("eth_balance", convertTotkeneth);
            setWeth9(convertTotkeneth);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        fetchingData();
    }, []);

    // SINGLE SWAP TOKEN
    const singleSwapToken = async () => {
        try {
            let singleSwapContract;
            let weth;
            let dai;
            console.log("current account", currentAccount);
            // Gọi connectingSingleSwapToken để lấy đối tượng hợp đồng SingleSwapToken
            singleSwapContract = await connectingSingleSwapToken();
            console.log("singleSwap",singleSwapContract);
    
            // Gọi connectingWithIWETHToken để lấy đối tượng hợp đồng WETH
            weth = await connectingWithIWETHToken();
            console.log("weth",weth);
            // Gọi connectingWithDAIToken để lấy đối tượng hợp đồng DAI
            dai = await connectingWithDAIToken();
            console.log("dai",dai);
            // Số lượng ETH muốn đổi
            const amountIn = 10n ** 18n; 
            // nap vao hop dong eth
            await weth.deposit({ value: amountIn });

            await weth.approve(singleSwapContract.address, amountIn);
    
            // Thực hiện đổi ETH thành DAI thông qua hợp đồng SingleSwapToken
            await singleSwapContract.swapExactInputSingleHop(amountIn, 1);

            console.log("thanh cong");
            // Lấy số lượng DAI sau khi đổi
            const daiBalance = await dai.balanceOf(currentAccount);// Giả sử biến account đã được khai báo và cung cấp giá trị
            const daiAmount = BigNumber.from(daiBalance).toString();
            const daiValue = ethers.utils.formatEther(daiAmount)
            // Cập nhật giá trị DAI trong state hoặc bất kỳ cơ chế nào bạn sử dụng
            setDai(daiValue);
            console.log("dai balance", daiValue);
        } catch (error) {
            console.error("have a error:", error);
        }
    }
    
    
    return (
    <SwapTokenContext.Provider value={{
        dai, 
        weth9, 
        networkConnect, 
        ether, 
        currentAccount,
        connectWallet, 
        singleSwapToken,
        tokenData}}>
        {children}
    </SwapTokenContext.Provider>
    )
};

export default SwapTokenContext