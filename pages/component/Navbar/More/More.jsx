import React from 'react'
import Style from './More.module.css'
import Image from 'next/image'
import img from '../../../../assets'

// react icon
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
const More = () => {
  return (
    <div className={Style.More}>
        <div className={Style.More_box}>
            <div className={Style.More_app}>
                <div className={Style.More_app_title}>App</div>
                <a target="_blank" href='https://vote.uniswapfoundation.org/'>Pool</a>           
                <a target="_blank" href='https://vote.uniswapfoundation.org/'>Vote</a>
                <a target="_blank" href='https://vote.uniswapfoundation.org/'>Analytics</a>
            </div>
            <div className={Style.More_app}>
                <div className={Style.More_app_title}>Company</div>
                <a target="_blank" href='https://vote.uniswapfoundation.org/'>Careers</a>
                <a target="_blank" href='https://vote.uniswapfoundation.org/'>Blog</a>
            </div>
            <div className={Style.More_app}>
                <div className={Style.More_app_title}>Protocol</div>
                <a target="_blank" href='https://vote.uniswapfoundation.org/'>Governance</a>
                <a target="_blank" href='https://vote.uniswapfoundation.org/'>Developers</a>
            </div>
            <div className={Style.More_app}>
                <div className={Style.More_app_title}>Need Help</div>
                <a target="_blank" href='https://vote.uniswapfoundation.org/'>Contact us</a>
                <a target="_blank" href='https://vote.uniswapfoundation.org/'>Help Center</a>
            </div>
            <div className={Style.More_box_sperator}></div>
            <div className={Style.More_dowload}>
                <div className={Style.More_dowload_img}>
                    <Image src={img.uniswap} width={30} height={30}/>
                </div>
                <div className={Style.More_dowload_value}>
                    <a>Download Uniswap</a>
                    <p>Available on IOS and Android</p>
                </div>
            </div>
            <div className={Style.More_box_connect}>
                <div>
                    <FaGithub className={Style.More_box_connect_icon}/>
                </div>
                <div>
                    <FaTwitter className={Style.More_box_connect_icon}/>
                </div>
                <div>
                    <FaDiscord className={Style.More_box_connect_icon}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default More