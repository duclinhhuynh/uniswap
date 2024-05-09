import React from 'react'
import Style from './Footer.module.css'
import { FaDiscord } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={Style.Footer}>
        <div className={Style.Footer_box}>
            <div className={Style.Footer_box_left}>
                <div className={Style.Footer_box_left_title}>
                    <h2>@ 2024</h2>
                    <h2>Uniswap lab</h2>
                </div>
                <div className={Style.Footer_box_left_connect}>
                    <FaDiscord className={Style.Footer_box_left_connect_icon}/>
                    <FaTwitter className={Style.Footer_box_left_connect_icon}/>
                    <FaGithub className={Style.Footer_box_left_connect_icon}/>
                </div>
            </div>
            <div className={Style.Footer_box_right}>
                <div className={Style.Footer_box_right_title}>
                    
                    <strong>App</strong>
                    <div>Swap</div>
                    <div>Token</div>
                    <div>NFTS</div>
                    <div>Pool</div>
                </div>
                <div className={Style.Footer_box_right_title}><strong>Protocol</strong>
                    <div>Govemance</div>
                    <div>Developers</div>
                </div>
                <div className={Style.Footer_box_right_title}><strong>Company</strong>
                    <div>Career</div>
                    <div>Blog</div>
                    <div>Brand Assets</div>
                    <div>Term & <br/>Privacy</div>
                    <div>Trademark Policy</div>
                </div>
                <div className={Style.Footer_box_right_title}><strong>Need help?</strong>
                    <div>Contact us</div>
                    <div>help Center</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer