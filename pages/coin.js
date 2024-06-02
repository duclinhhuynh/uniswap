import React from 'react'
import { LineChart, HeroSection } from '../component/index'
import Style from '../styles/coin.module.css'
import { BiSolidBarChartSquare } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { SiGoogleearth } from "react-icons/si";
const coin = () => {
  return (
    <div className={Style.coin_box}>
      <div className={Style.coin_box_linechart}>
        <LineChart/>
      </div>
      <div className={Style.coin_box_heroSection}>
        <HeroSection className ={Style.coin_box_heroSection_compo}/>
        <div className={Style.coin_box_heroSection_title}>Info</div>
        <div className={Style.coin_box_heroSection_social}>
          <div><BiSolidBarChartSquare/>Etherscan</div>
          <div><SiGoogleearth/>Website</div>
          <div><FaXTwitter/>Twitter</div>
        </div>
        <p>Ethereum is a smart contract platform that enables developers to build tokens and decentralized applications (dapps). ETH is the native currency for the Ethereum platform and also works as the...</p>
        <div>show more</div>
      </div>
    </div>
  )
}

export default coin