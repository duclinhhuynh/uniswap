import React from 'react'
import Style from './Connect.module.css'

import { DiAndroid } from "react-icons/di";
import { IoBook } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

const Connect = () => {
  return (
    <div className={Style.Connect}>
        <div className={Style.Connect_box}>
            <div className={Style.Connect_box_title}>
                <h2>Connect with us</h2>
            </div>
            <div className={Style.Connect_box_connect}>
                <div className={Style.Connect_box_connect_help}>
                    <button className={Style.Connect_box_connect_btn}><div><DiAndroid className={Style.Connect_box_connect_btn_hidden}/>&nbsp; Help Center&nbsp;<FaArrowRightLong className={Style.Connect_box_connect_btn_right}/></div></button>
                    <p>Get support</p>
                </div>
                <div className={Style.Connect_box_connect_blog}>
                    <button className={Style.Connect_box_connect_btn}><div><IoBook className={Style.Connect_box_connect_btn_hidden}/>&nbsp; Blog&nbsp;<FaArrowRightLong className={Style.Connect_box_connect_btn_right}/></div> </button>
                    <p>Insights and news from the team</p>
                </div>
                <div className={Style.Connect_box_connect_stay}>
                    <button className={Style.Connect_box_connect_btn}><div><IoIosChatbubbles className={Style.Connect_box_connect_btn_hidden}/>&nbsp;Stay connected&nbsp;<FaArrowRightLong className={Style.Connect_box_connect_btn_right}/></div></button>
                    <p>Follow @Uniswap on X for the latest updates</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Connect