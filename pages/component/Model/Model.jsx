import React, {useState, useEffect} from 'react'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from './Model.module.css';
import images from '../../../assets/index';

//REACT ICON IMPORT 
import { IoMdClose } from "react-icons/io";

const Model = ({setOpenModel, connectWallet}) => {
  // USE STATE 
  const walletMenu = [
    {
      name: "Uniswap wallet",
      image: images.uniswap
    },
    {
      name: "MetaMask",
      image: images.metamask
    },
    {
      name: "WalletConnect",
      image: images.walletconnect
    },
    {
      name: "Coinbase Wallet",
      image: images.coinbase
    },
  ];
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_heading}>
          <p>Connect a wallet</p>
          <div className={Style.Model_box_heading_img}>
            <IoMdClose onClick={() => setOpenModel(false)}/>
          </div>
        </div>
        <div className={Style.Model_box_wallet}>
          {walletMenu.map((el, i) => (
            <div key={i + 1} onClick={() => connectWallet()}>
               <Image className={Style.Model_box_wallet_img} 
               src={el.image} alt={el.name}/>
               <p>{el.name}</p>
            </div>
          ))}
        </div>
        <p className={Style.Model_box_para}>
        By connecting a wallet, you agree to <br/>
        Uniswap Labs' Terms of Service <br/>
        and consent to its Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default Model