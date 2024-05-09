import React from 'react'
import Style from './Defi.module.css'
import Image from 'next/image';
import img from '../../assets'
//react icon 
import { FaDisplay } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
const Defi = () => {
  return (
    <div className={Style.Defi}>
        <h2 className={Style.Defi_title}>Go direct to DeFi</h2>
        <div className={Style.Defi_box}>
            <div className={Style.Defi_box_platform}>
                <div className={Style.Defi_box_webapp}>
                    <div className={Style.Defi_box_webapp_header}>
                        <button><FaDisplay/>Web app</button>
                        <p>Swapping made simple.<br/> Access thousands of tokens<br/> on 8+ chains.</p>
                    </div>
                    <div className={Style.Defi_box_webapp_body}>
                        <div className={Style.Defi_box_webapp_body_item}>
                            <Image className={Style.Defi_box_webapp_body_item_img} src={img.eth} width={30} height={30}/>
                            <div className={Style.Defi_box_webapp_body_name}>
                                <div className={Style.Defi_box_webapp_body_network}>Etherum</div>
                                <div className={Style.Defi_box_webapp_body_coin}>ETH</div>
                            </div>
                            <div className={Style.Defi_box_webapp_body_price}>$3,2123,234</div>
                            <div className={Style.Defi_box_webapp_body_trade}><FaCaretDown/>2.60%</div>
                        </div>
                        <div className={Style.Defi_box_webapp_body_item}>
                            <Image className={Style.Defi_box_webapp_body_item_img} src={img.usdc} width={30} height={30}/>
                            <div className={Style.Defi_box_webapp_body_name}>
                                <div className={Style.Defi_box_webapp_body_network}>Etherum</div>
                                <div className={Style.Defi_box_webapp_body_coin}>ETH</div>
                            </div>
                            <div className={Style.Defi_box_webapp_body_price}>$1.0</div>
                            <div className={Style.Defi_box_webapp_body_trade}><FaCaretDown/>2.60%</div>
                        </div>
                        <div className={Style.Defi_box_webapp_body_item}>
                            <Image className={Style.Defi_box_webapp_body_item_img} src={img.uniswap} width={30} height={30}/>
                            <div className={Style.Defi_box_webapp_body_name}>
                                <div className={Style.Defi_box_webapp_body_network}>Etherum</div>
                                <div className={Style.Defi_box_webapp_body_coin}>ETH</div>
                            </div>
                            <div className={Style.Defi_box_webapp_body_price}>$6.9</div>
                            <div className={Style.Defi_box_webapp_body_trade}><FaCaretDown />2.60%</div>
                        </div>
                        <div className={Style.Defi_box_webapp_body_item}>
                            <Image className={Style.Defi_box_webapp_body_item_img} src={img.dai} width={30} height={30}/>
                            <div className={Style.Defi_box_webapp_body_name}>
                                <div className={Style.Defi_box_webapp_body_network}>Etherum</div>
                                <div className={Style.Defi_box_webapp_body_coin}>ETH</div>
                            </div>
                            <div className={Style.Defi_box_webapp_body_price}>$3,2123,234</div>
                            <div className={Style.Defi_box_webapp_body_trade}><FaCaretDown />2.60%</div>
                        </div>
                    </div>
                </div>
                <div className={`${Style.Defi_box_wallet}`}>
                    <div className={Style.Defi_box_webapp_header}>
                        <button className={Style.Defi_box_wallet_button}><FaDisplay/>Uniswap wallet</button>
                        <p>The wallet built for swapping.<br/> Available on iOS and Android.</p>
                    </div>
                    <div className={Style.Defi_box_webapp_body}>
                       <canvas/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Defi