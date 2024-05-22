import React, {useEffect, useState, useContext} from 'react';
import { ethers, BigNumber} from 'ethers';
import Web3Modal from 'web3modal'; 
import {Token, CurrencyAmount, TradeType, Percent} from "@uniswap/sdk-core";
import { getPrice } from "../Utils/fetchingPrice";
import { swapUpdatePrice} from "../Utils/swapUpdatePrice";
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
        "0x776D6996c8180838dC0587aE0DE5D614b1350f37",
        "0x3A906C603F080D96dc08f81CF2889dAB6FF299dE",
        "0x820638ecd57B55e51CE6EaD7D137962E7A201dD9",
        "0x725314746e727f586E9FCA65AeD5dBe45aA71B99",
        "0x987Aa6E80e995d6A76C4d061eE324fc760Ea9F61",
        "0x6B9C4119796C80Ced5a3884027985Fd31830555b",
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
            // console.log("eth Value", ethValue);
            // GET NETWORK
            const networks = await provider.getNetwork();
            // console.log(networks);
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
                    tokenBalance: tokenTokenBal,
                    tokenAddress: el,
                };
            }));
            
            setTokenData(tempTokenData);
            console.log("tokenData:", tempTokenData);

            // DAI TOKEN 
            const dai = await connectingWithDAIToken();
            const daiBal = await dai.balanceOf(userAccount);
            const TokenDai = BigNumber.from(daiBal).toString();
            const convertTotkendai = ethers.utils.formatEther(TokenDai);
            setDai(convertTotkendai);
            // console.log(convertTotkendai);

            // WETH token 
            const weth9 = await connectingWithIWETHToken();
            const ethBal = await weth9.balanceOf(userAccount);
            const Tokeneth = BigNumber.from(ethBal).toString();
            const convertTotkeneth = ethers.utils.formatEther(Tokeneth);
            console.log("eth_balance", convertTotkeneth);
            // setWeth9(convertTotkeneth);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        fetchingData();
    }, []);

    // SINGLE SWAP TOKEN
    const singleSwapToken = async ({token1, token2, swapAmount}) => {
        console.log(token1.tokenAddress.tokenAddress,token2.tokenAddress.tokenAddress, swapAmount);
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
            const decimal = 18;
            const inputAmount = swapAmount;
            const amountIn = ethers.utils.parseEther(inputAmount.toString(), decimal);
            console.log(amountIn);
            // nap vao hop dong eth
            await weth.deposit({ value: amountIn });

            await weth.approve(singleSwapContract.address, amountIn);
    
            // Thực hiện đổi ETH thành DAI thông qua hợp đồng SingleSwapToken
            const transaction = await singleSwapContract.swapExactInputSingleHop(token1, token2, swapAmount, 1);
            await transaction.waith();
            console.log(transaction);
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
        getPrice,
        swapUpdatePrice,
        connectWallet, 
        singleSwapToken,
        tokenData
        }}>
        {children}
    </SwapTokenContext.Provider>
    )
};

export default SwapTokenContext