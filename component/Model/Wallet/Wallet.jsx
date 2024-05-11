import React, { useState } from 'react'
//INTERNAL IMPORT
import Image from 'next/image';
import Style from '../Model.module.css';
import StyleWallet from './Wallet.module.css';
// react icon 
import {FiCopy} from 'react-icons/fi';
import { IoMdSettings } from "react-icons/io";
import { FaAnglesRight } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";

// IMAGE
import images from '../../../assets'
const Wallet = ({setOpenWalet,currentAccount,tokenData}) => {
    const [active, setActive] = useState(1);
    const tokenDataTitle = [
        {
            name: "Tokens"
        },
        {
            name: "NFT"
        },
        {
            name: "Pool"
        },
        {
            name: "Activity"
        }
    ]

    const altCoin = [
        {
            img: images.token1,
            name: "APE",
            network: "ApeCoin"
        },
        {
            img: images.token2,
            name: "ARB",
            network: "Arbitrum"
        },
        {
            img: images.token3,
            name: "ARKM",
            network: "Arkham"
        },
        {
            img: images.token4,
            name: "ARKM",
            network: "Alethea Artificial Liquid Intelligence"
        },
        {
            img: images.token5,
            name: "AUDIO",
            network: "AUDIO "
        },
        {
            img: images.token1,
            name: "APE",
            network: "ApeCoin"
        },
        {
            img: images.token2,
            name: "ARB",
            network: "Arbitrum"
        },
        {
            img: images.token1,
            name: "APE",
            network: "ApeCoin"
        },
        {
            img: images.token2,
            name: "ARB",
            network: "Arbitrum"
        },
        {
            img: images.token3,
            name: "ARKM",
            network: "Arkham"
        },
        {
            img: images.token4,
            name: "ARKM",
            network: "Alethea Artificial Liquid Intelligence"
        },
        {
            img: images.token5,
            name: "AUDIO",
            network: "AUDIO "
        },
        {
            img: images.token1,
            name: "APE",
            network: "ApeCoin"
        },
        {
            img: images.token2,
            name: "ARB",
            network: "Arbitrum"
        },
    ]

    let tokentlist = [];
    for(let i = 0; i < tokenData.length; i++) {
        tokentlist.push(tokenData[i]);
    }
    const sumTokenBalance = (tokenData) => {
        if (!Array.isArray(tokenData) || tokenData.length === 0) {
            return "0.00"; // Trả về "0.00" nếu không có dữ liệu hoặc mảng rỗng
        }
    
        const totalBalance = tokenData.reduce((acc, token) => {
            return acc + parseFloat(token.tokenBalance);
        }, 0);
    
        // Làm tròn tổng balance đến 2 số thập phân và chuyển đổi thành chuỗi
        const roundedTotal = totalBalance.toFixed(2);
    
        return roundedTotal;
    };
    const copyAddress = () => {
        const copyText = document.getElementById("myInput")

        copyText.select();
        navigator.clipboard.writeText(copyText.value);
    };
    const [showCheck, setShowCheck] = useState(false);
    

    const handleMouseDown = () => {
      setShowCheck(true);
      setTimeout(() => {
        setShowCheck(false);
      }, 1200);
    };
   
  return (
   <div className={Style.Model}>
      <div className={Style.Model_close} onClick={() => setOpenWalet(false)}><FaAnglesRight/></div>
      <div className={Style.Model_box}>
        <div className={StyleWallet.Model_box_head}>
            <div className={StyleWallet.Model_box_head_address}> 
                <Image className={StyleWallet.Model_box_head_address_img}
                src={images.uniswap} height={40} width={40}/>
                    <div onClick={() => copyAddress()}
                      onMouseDown={handleMouseDown}
                    >                 
                    <input type="text" 
                        value={currentAccount}
                        id='myInput'
                    />
                    {currentAccount && currentAccount.length > 10
                        ? currentAccount.slice(0, 7) + "..." + currentAccount.slice(-3)
                        : currentAccount}
                    &nbsp;&nbsp;
                    {showCheck ? <FaRegCheckCircle className={StyleWallet.Model_box_head_address_check}/>
                     : <FiCopy className={StyleWallet.Model_box_head_address_icon}
                     /> 
                     }
                    </div>
            </div>
            <div className={StyleWallet.Model_box_head_right}>
                <div>
                    <IoMdSettings className={StyleWallet.Model_box_head_right_setting}/>
                </div>
                <div>
                    <FaPowerOff className={StyleWallet.Model_box_head_right_fi}/>
                </div>
            </div>
        </div>
        <div className={StyleWallet.Model_box_balance}>
            <p>${sumTokenBalance(tokenData)}</p>
        </div>
        <div className={StyleWallet.Model_box_body}>
            <div className={StyleWallet.Model_box_body_buy}>
                <button>
                     <div>
                        <FaWallet className={StyleWallet.Model_box_body_buy_icon}/>
                        Buy
                     </div>
                </button>
            </div>
            <div className={StyleWallet.Model_box_body_view}>
                <button>
                    <div>
                        <IoImagesOutline className={StyleWallet.Model_box_body_view_icon}/>
                        View NFTS
                    </div>
                </button>
            </div>
        </div>
        <div className={StyleWallet.Model_box_body_token}>
                <div className={StyleWallet.Model_box_body_token_title}>
                    {tokenDataTitle.map((el,i) => (
                        <div 
                        key={i + 1}>{el.name}</div>
                    ))}
                </div>
                <div className={StyleWallet.SearchToken_box_body_list}>
                    {tokentlist.map((el,i) => (
                        <div key={i + 1} 
                        className={active == i + 1 ? `${Style.active}` : ""}
                        onClick={() => (setActive(i + 1), tokens({name:el.img, image: el.name}))}
                        >
                            <div className={StyleWallet.SearchToken_box_body_list_box}>
                                <Image className={StyleWallet.SearchToken_box_body_list_img} src={el.img || images.token2}
                                alt='image'
                                width={36}
                                height={36}
                                />    
                                <div className={StyleWallet.SearchToken_box_body_list_name}>
                                    <div>{el.name}</div>
                                    <div className={StyleWallet.SearchToken_box_body_list_name_token}>${el.tokenBalance}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
      </div>
    </div>
    
  )
}

export default Wallet