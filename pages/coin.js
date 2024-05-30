import React from 'react'
import { LineChart, HeroSection } from '../component/index'
import Style from '../styles/coin.module.css'
const coin = () => {
  return (
    <div className={Style.coin_box}>
      <div className={Style.coin_box_linechart}>
        <LineChart/>
      </div>
      <div className={Style.coin_box_heroSection}>
        <HeroSection/>
      </div>
    </div>
  )
}

export default coin