import React, { useState,useEffect, useContext} from 'react'
import Image from 'next/image'

// INTERNAL IMPORT 
import Style from './SearchToken.module.css'
import images from '../../assets'
import {SwapTokenContext} from '../../context/SwapTokenContext'

// REACT ICON
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoChevronDown } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import NetWork from '../NetWork/NetWork';
const SearchToken = ({openToken, tokens, setOpenToken}) => {
    const {ether , currentAccount, networkConnect,connectWallet, tokenData} = useContext(SwapTokenContext)
    const [active, setActive] = useState(1);
    const [openNetWork, setOpenNetWork] = useState(false);
    const closeModalToken = () => {
        setOpenToken(false);
    }
    const handleOpenNetwork = () => {
        setOpenNetWork(!openNetWork);
    }
    const coin = [
        {
            img: images.eth,
            name: "ETH"
        },
        {
            img: images.dai,
            name: "DAI"
        },
        {
            img: images.usdc,
            name: "USDC"
        },
        {
            img: images.usdt,
            name: "USDT"
        },
        {
            img: images.wbtc,
            name: "WBTC"
        },
        {
            img: images.weth,
            name: "WETH"
        },

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

    ]
  return (
    <>
    <div className={Style.SearchToken} id='modal' onClick={(e) => 
            {if(e.target.id === "modal"){
            closeModalToken()       
            }
            }}>
        <div className={Style.SearchToken_box}>
            {/* Header */}
            <div className={Style.SearchToken_box_header}>
                <div className={Style.SearchToken_box_header_box} onClick={() => setOpenNetWork(false)}>
                    <div className={Style.SearchToken_box_header_title}>Search a Token</div>
                    <IoMdClose className={Style.SearchToken_box_header_icon} onClick={() => closeModalToken()}/>
                </div>
                <div className={Style.SearchToken_box_header_box}>
                    <div className={Style.SearchToken_box_header_box_search} onClick={() => setOpenNetWork(false)}>
                        <input type="text" placeholder='Search name or paste address'/>
                    </div>
                    <div className={Style.SearchToken_box_header_box_network} onClick={() => handleOpenNetwork()} 
                    >
                        {networkConnect !== 'unknown' ? 
                        <Image className={Style.StyleSearchToken_box_header_box_network_image} src={images.eth} width={20} height={20}/>:
                        <Image className={Style.StyleSearchToken_box_header_box_network_image} src={images.unknown} width={20} height={20}/>
                        }
                        
                        {openNetWork ? <IoIosArrowUp/> : <IoChevronDown className={Style.SearchToken_box_header_box_network_down}/> }
                        {openNetWork && 
                        <NetWork/>}
                    </div>
                </div>
                {/* List token */}
                <div className={Style.SearchToken_box_listToken} onClick={() => setOpenNetWork(false)}>
                    {coin.map((el,i) => (
                        <span key={i + 1}
                            className={active == i + 1 ? `${Style.active}` : ""}
                            onClick={() => (setActive(i + 1), tokens({name:el.img, image: el.name}))}
                        >
                            <Image className={Style.SearchToken_box_listToken_img} src={el.img || images.eth}
                            alt='image'
                            width={30}
                            height={30}
                            />    
                            <p className={Style.SearchToken_box_listToken_name}>{el.name}</p>
                        </span>
                    ))}
                </div>
            </div>
            {/* Body */}
            <div className={Style.SearchToken_box_body} onClick={() => setOpenNetWork(false)}>
                <div className={Style.SearchToken_box_body_title}>
                    Popular tokens
                </div>
                <div className={Style.SearchToken_box_body_list}>
                    {altCoin.map((el,i) => (
                        <div key={i + 1} 
                        className={active == i + 1 ? `${Style.active}` : ""}
                        onClick={() => (setActive(i + 1), tokens({name:el.img, image: el.name}))}
                        >
                            <div className={Style.SearchToken_box_body_list_box}>
                                <Image className={Style.SearchToken_box_body_list_img} src={el.img || images.eth}
                                alt='image'
                                width={36}
                                height={36}
                                />    
                                <div className={Style.SearchToken_box_body_list_name}>
                                    <div>{el.network}</div>
                                    <div className={Style.SearchToken_box_body_list_name_token}>{el.name}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
   
    </>
  )
}

export default SearchToken