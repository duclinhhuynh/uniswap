import React, { useState, useEffect, useContext} from 'react'
import Image from 'next/image';
// INTERNAL IMPORT 
import Style from './HeroSection.module.css'
import images from '../../assets'
import Toggle from '../Toggle/Toggle';
import Token from '../Token/Token';
import SearchToken from '../SearchToken/SearchToken';

// REACT ICON
import { IoMdSettings } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import NetWork from '../NetWork/NetWork';
// CONTEXT 
import { SwapTokenContext} from '../../context/SwapTokenContext';
import { swapUpdatePrice } from '../../Utils/swapUpdatePrice';
const HeroSection = ({}) => {
  // USESTATE 
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokenTwo, setOpenTokenTwo] = useState(false);
  const [tokenSwapOutPut, setTokenSwapOutPut] = useState(0);
  const [poolMessage, setpoolMessage] = useState('');
  const [search, setSearch] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);

  const {singleSwapToken, connectWallet, currentAccount, ether, dai, tokenData, getPrice} = useContext(SwapTokenContext);
  const zindex =  openToken||openTokenTwo ? Style.HeroSection_new : Style.HeroSection;
  const openSettingModal = () => {
    console.log("tokenOne",tokenOne);
    console.log("tokenTwo",tokenTwo);
    console.log("dai",dai.slice(0.7));
    if(!openSetting){
      setOpenSetting(true);
    }
    else {
      setOpenSetting(false);
    }
  }
  // TOKEN 1 
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: ""
  });
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
    symbol: "",
    tokenBalance: "",
    tokenAddress: ""
  });

  const callOutPut = async(value) => {
    try {
      const yourAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
      const deadline = 10;
      const slippageAmount  = 25;
      const data = await swapUpdatePrice(
        value,
        slippageAmount,
        deadline,
        yourAccount
      );
      console.log(data);
      setTokenSwapOutPut(data[1])
      setSearch(false)
      const poolAddress = "0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8"
      const poolData = await getPrice(value, poolAddress);
      const message = `${value} ${poolData[2]} = ${poolData[0]} ${poolData[1]}`
      console.log("message", message);
      setpoolMessage(message)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`${zindex}`}>
      <div className={Style.HeroSection_box}>
        {/* Header */}
        <div className={Style.HeroSection_box_heading}>
          <div className={Style.HeroSection_box_heading_tab}>
            <p>Swap</p>
            <p>Limit</p>
            <p>Send</p>
            <p>Buy</p>
          </div>
          <div className={Style.HeroSection_box_heading_img}>
            <IoMdSettings className={Style.HeroSection_box_heading_img_icon}
            onClick={() => openSettingModal()}/>
          </div>
          {openSetting && (
            <Toggle setOpenSetting= {setOpenSetting}/>
          )}
        </div>
        {/* BODY  */}
        <div className={Style.HeroSection_box_input_box}>
          <div className={Style.HeroSection_box_input}>
              <div className={Style.HeroSection_box_input_container}>
                <span className={Style.HeroSection_box_input_title}>You pay</span>
                <div className={Style.HeroSection_box_input_body}> 
                  <input inputmode="decimal" autocomplete="off" autocorrect="off" minlength="1"
                  type="text" pattern="^[0-9]*[.,]?[0-9]*$" maxlength="79" spellCheck="false"  placeholder='0' 
                  onChange={(e) => 
                    (callOutPut(e.target.value), 
                    setSwapAmount(e.target.value), 
                    setSearch(true))}
                  />
                  <div className={Style.HeroSection_box_input_body_tokenlist} onClick={() => setOpenToken(true)}>                 
                      <Image src={images.eth || images.uniswap}
                        width={20}
                        height={20}
                        alt='ether'
                      />
                      {
                        tokenOne.symbol || "ETH"
                      }
                      <FaAngleDown className={Style.HeroSection_box_input_body_tokenlist_icondown} />                
                  </div>
                </div>
                {currentAccount ? <div className={Style.HeroSection_box_input_container_balance}>Balance: {tokenOne.tokenBalance !== '' ? tokenOne.tokenBalance.slice(0,7) : ether.slice(0,7)}</div> 
                : <div> </div>}  
                {search ? (poolMessage) : ""}
              </div>
          </div>
          <div className={Style.HeroSection_box_input_arrow}>
            <div className={Style.HeroSection_box_input_down}>
                <FaArrowDown/>
            </div>
          </div>
          <div className={Style.HeroSection_box_input}>
            <div className={Style.HeroSection_box_input_container}>
              <span className={Style.HeroSection_box_input_title}>You receive</span>
              <div className={Style.HeroSection_box_input_body}> 
                {search ? <Image className={Style.HeroSection_box_input_body_img} src={images.giphy}/> : tokenSwapOutPut }
                {/* (<input inputmode="decimal" autocomplete="off" autocorrect="off" minlength="1"
                  type="text" pattern="^[0-9]*[.,]?[0-9]*$" maxlength="79" spellCheck="false"  placeholder='0'  onChange={setSwapAmount}/>) */}
                <div className={Style.HeroSection_box_input_body_tokenlist} onClick={() => setOpenTokenTwo(true)}>
                  <Image src={images.uniswap || images.uniswap}
                    width={20}
                    height={20}
                    alt='ether'
                  />
                  {
                    tokenTwo.symbol || "UNI"
                  }
                  <FaAngleDown className={Style.HeroSection_box_input_body_tokenlist_icondown}/>
                </div>
              </div>
              {currentAccount ? <div className={Style.HeroSection_box_input_container_balance}>Balance: {tokenTwo.tokenBalance !== '' ? tokenTwo.tokenBalance.slice(0, 7) : dai.slice(0,7)}</div> 
              : <div> </div>}
            </div>
          </div>
        </div>
        {/* Footer */}
        {currentAccount ? (
            <div className={Style.HeroSection_box_footer} onClick={() => singleSwapToken({
              token1: tokenOne,
              token2: tokenTwo,
              swapAmount,
            })}>
              <button className={Style.HeroSection_box_btn}>Swap</button>
            </div>
        ) : (
            <div className={Style.HeroSection_box_footer} onClick={() => connectWallet()}>
              <button className={Style.HeroSection_box_btn}>Connect Wallet</button>
            </div>
        )}
      </div>
        {openToken && (
          <SearchToken 
          setOpenToken = {setOpenToken}
          tokens = {setTokenOne}
          tokenData = {tokenData}
          openToken={openToken}
          />
        )}
  
         {openTokenTwo && (
          <SearchToken 
          setOpenToken = {setOpenTokenTwo}
          tokens = {setTokenTwo}
          tokenData = {tokenData}
          openTokenTwo = {openTokenTwo}
          />
        )}
    </div>
  )
}

export default HeroSection;