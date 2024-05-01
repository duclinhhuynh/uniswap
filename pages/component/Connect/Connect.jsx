import React from 'react'
import Style from './Connect.module.css'

import { DiAndroid } from "react-icons/di";
import { IoBook } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";

const Connect = () => {
  return (
    <div className={Style.Connect}>
        <div className={Style.Connect_box}>
            <div className={Style.Connect_box_title}>
                <h2>Connect with us</h2>
            </div>
            <div className={Style.Connect_box_connect}>
                <div className={Style.Connect_box_connect_help}>
                    <button className={Style.Connect_box_connect_btn}><DiAndroid/>Help Center</button>
                    <p>Get support</p>
                </div>
                <div className={Style.Connect_box_connect_blog}>
                    <button className={Style.Connect_box_connect_btn}> <IoBook />Blog</button>
                    <p>Insights and news from the team</p>
                </div>
                <div className={Style.Connect_box_connect_stay}>
                    <button className={Style.Connect_box_connect_btn}> <IoIosChatbubbles /> Stay connected</button>
                    <p>Follow @Uniswap on X for the latest updates</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Connect