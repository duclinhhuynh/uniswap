import React from 'react'
import Style from './App.module.css'
import Image from 'next/image';
// imge
import img from '../../../assets'

// react icon 
import { IoClose } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const App = () => {
  return (
    <div className={Style.App}>
        <div className={Style.App_box}>
            <div className={Style.App_box_close}><IoClose/></div>
            <div className={Style.App_box_header}>
                <div className={Style.App_box_header_title}>
                    <p className={Style.App_box_header_title_title}>Dowload the uniswap app</p>
                    <p className={Style.App_box_header_content}>Scan the QR code with your phone to download the <br/>Uniswap app</p>
                </div>
            </div>
            <div className={Style.App_box_body}>
                <Image className={Style.App_box_body_img} src={img.dowload} width={150} height={150}/>
            </div>
            <div  className={Style.App_box_footer}>
                <div className={Style.App_box_footer_ios}>
                    <FaApple className={Style.App_box_footer_ios_img}/>
                    <div>
                        <div className={Style.App_box_footer_google_name}>Download on the</div>
                        <div className={Style.App_box_footer_google_des}>App Store</div>
                    </div>
                </div>
                <div className={Style.App_box_footer_google}>
                    <FcGoogle className={Style.App_box_footer_google_img}/>
                    <div>
                        <div className={Style.App_box_footer_google_name}>Get it on</div>
                        <div className={Style.App_box_footer_google_des}>Google Play</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App