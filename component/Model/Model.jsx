import React, {useState, useEffect} from 'react'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from './Model.module.css';
import images from '../../assets';
import Setting from './Setting/Setting';

//REACT ICON IMPORT 
import { IoMdSettings } from "react-icons/io";
import { FaAnglesRight } from "react-icons/fa6";


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
  const [setting, setOpenSetting] = useState(false);
  const openSeting = () => {
    setOpenSetting(true);
  }
  return (
    <>
    <div className={Style.Model}>
      <div className={Style.Model_close} onClick={() => setOpenModel(false)}><FaAnglesRight/></div>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_heading}>
          <p>Connect a wallet</p>
          <div className={Style.Model_box_heading_img}>
            <IoMdSettings className={Style.Model_box_heading_img_icon} onClick={() => openSeting()}/>
          </div>
          {setting && (
              <Setting 
              openSeting = {openSeting}
              setOpenSetting={setOpenSetting} 
              setOpenModel ={setOpenModel}/>
            )}
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
        {!setting && (
        <p className={Style.Model_box_para}>
        By connecting a wallet, you agree to <br/>
        Uniswap Labs' Terms of Service <br/>
        and consent to its Privacy Policy.
        </p>)}
      </div>
    </div>
    </>
  )
}

export default Model