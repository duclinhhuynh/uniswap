import React, { useState } from 'react'
import Image from 'next/image';
// INTERNAL IMPORT 
import Style from './HeroSection.module.css'
import images from '../../../assets/index'
import {Token , SearchToken} from "../index";

// REACT ICON
import { IoMdSettings } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
const HeroSection = ({accounts, tokenData}) => {
  // USESTATE 
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokenTwo, setOpenTokenTwo] = useState(false);

  // TOKEN 1 
  const [tokenOne, setTokenOne] = useState({
    name: "",
    image: "",
  });
  const [tokenTwo, setTokenTwo] = useState({
    name: "",
    image: "",
  });
  
  return (
    <div className={Style.HeroSection}>
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
            onClick={() => setOpenSetting(true)}/>
          </div>
        </div>
        {/* BODY  */}
        <div className={Style.HeroSection_box_input_box}>
          <div className={Style.HeroSection_box_input}>
              <div className={Style.HeroSection_box_input_container}>
                <span className={Style.HeroSection_box_input_title}>You pay</span>
                <div className={Style.HeroSection_box_input_body}> 
                  <input type="text" placeholder='0'/>
                  <div className={Style.HeroSection_box_input_body_tokenlist} onClick={() => openToken(true)}>
                    <Image src={images.eth || images.uniswap}
                      width={20}
                      height={20}
                      alt='ether'
                    />
                    {
                      tokenOne.name || "ETH"
                    }
                    <FaAngleDown className={Style.HeroSection_box_input_body_tokenlist_icondown}/>
                  </div>
                </div>
              </div>
            </div>
          <div className={Style.HeroSection_box_input_arrow}>
            <div className={Style.HeroSection_box_input_down}>
                <FaArrowDown/>
            </div>
          </div>
          <div className={Style.HeroSection_box_input}>
            <div className={Style.HeroSection_box_input_container}>
              <span className={Style.HeroSection_box_input_title}>You pay</span>
              <div className={Style.HeroSection_box_input_body}> 
                <input type="text" placeholder='0'/>
                <div className={Style.HeroSection_box_input_body_tokenlist} onClick={() => openToken(true)}>
                  <Image src={images.eth || images.uniswap}
                    width={20}
                    height={20}
                    alt='ether'
                  />
                  {
                    tokenOne.name || "ETH"
                  }
                  <FaAngleDown className={Style.HeroSection_box_input_body_tokenlist_icondown}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        {accounts ? (
            <div className={Style.HeroSection_box_footer}>
              <button className={Style.HeroSection_box_btn}>Connect Wallet</button>
            </div>
        ) : (
            <div className={Style.HeroSection_box_footer}>
              <button className={Style.HeroSection_box_btn}>Connect Wallet</button>
            </div>
        )}
      </div>
        {openSetting && <Token openSetting={openSetting}/>}
        {openToken && (
          <SearchToken 
          openToken = {openToken}
          tokens = {setTokenOne}
          tokenData = {tokenData}
          />
        )}
         {openToken && (
          <SearchToken 
          openToken = {openTokenTwo}
          tokens = {setTokenTwo}
          tokenData = {tokenData}
          />
        )}
    </div>
  )
}

export default HeroSection