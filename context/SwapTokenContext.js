import React, {useEffect, useState, useContext} from 'react';
import { ethers, BigNumber} from 'ethers';
import Web3Modal from 'web3modal'; 
import {Token, CurrencyAmount, TradeType, Percent} from "@uniswap/sdk-core";
import { getPrice } from "../Utils/fetchingPrice";
import { swapUpdatePrice} from "../Utils/swapUpdatePrice";
import images from "../assets"
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
import { useParams } from 'next/navigation';
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
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "0x82A9286dB983093Ff234cefCea1d8fA66382876B",
        "0x41219a0a9C0b86ED81933c788a6B63Dfef8f17eE",
        "0x1d460d731Bd5a0fF2cA07309dAEB8641a7b175A1",
        "0xF67e26649037695DdFAB19f4E22d5c9Fd1564592",
        "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    ];
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    }) 
    // const { coinId } = useParams();
    const [historiescalData, setHistoriescalData] = useState([]);
    const fetchHistoricalData = async (coinId) => {
        const options = {
          method: 'GET',
          headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-qPA1U4MtwyJnE2WUmBzPhaAv' }
        };
      
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10`, options);
          const result = await response.json();
          return result.prices;
        } catch (error) {
          console.error('Error fetching historical data:', error);
          return [];
        }
      };
    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-qPA1U4MtwyJnE2WUmBzPhaAv'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }
    useEffect(()=> {
        fetchAllCoin();
    }, [])

    const imagetoken = [
        {
            img: images.eth,
        },
        {
            img: images.dai,
        },
        {
            img: images.usdc,
        },
        {
            img: images.usdt,
        },
        {
            img: images.wbtc,
        },
        {
            img: images.weth,
        },
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
                const tokenImage = imagetoken.find(token => token.address === el)?.img || images.default;
                return {
                    name: name,
                    image: tokenImage,
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
        // console.log(token1.tokenAddress,token2.tokenAddress, swapAmount);
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
            const transaction = await singleSwapContract.swapExactInputSingleHop(token1.tokenAddress, token2.tokenAddress, amountIn);
            await transaction.waith();
            console.log(transaction);
            console.log("thanh cong");
            // Lấy số lượng DAI sau khi đổi
            const daiBalance = await dai.balanceOf(currentAccount);// Giả sử biến account đã được khai báo và cung cấp giá trị
            const daiAmount = BigNumber.from(daiBalance).toString();
            const daiValue = ethers.utils.formatEther(daiAmount)
            // Cập nhật giá trị DAI trong state hoặc bất kỳ cơ chế nào bạn sử dụng
            console.log("dai", daiValue);
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
        fetchHistoricalData,
        tokenData,
        allCoin,
        currency,
        historiescalData,
        }}>
        {children}
    </SwapTokenContext.Provider>
    )
};

export default SwapTokenContext