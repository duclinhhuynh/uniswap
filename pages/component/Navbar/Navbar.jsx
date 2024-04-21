import React,{useContext, useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
// INTERNAL IMPORT
import Style from './Navbar.module.css'
import image from '../../../assets/index'

// REACT ICON
import { CiSearch } from "react-icons/ci";
import { PiCaretDownLight } from "react-icons/pi";
import { FaApple } from "react-icons/fa6";
import { BsGooglePlay } from "react-icons/bs";
import Model from '../Model/Model'
const Navbar = () => {
  const MenuItems = [
    {
      name: "Swap",
      link: "/"
    },
    {
      name: "Explore",
      link: "/"
    },
    {
      name: "NFTs",
      link: "/"
    },
    {
      name: "Pool",
      link: "/"
    },
  ];
  const [openModel, setOpenModel] = useState(false);
  const [openTokenBox, setOpenTokenBox] = useState(false);
  return (
    <div>
        <div className={Style.Navbar}>
          <div className={Style.Navbar_box}>
            {/* Navbar left */}
            <div className={Style.Navbar_box_left}>
              {/* Logo Image */}
              <Image className={Style.Navbar_box_left_logo} width={32} alt='logo' height={32} src={image.uniswap}/>
              {/* menu navbar */}
              <div className={Style.Navbar_box_left_menu}> 
                {MenuItems.map((el, i) => (
                  <Link key={i + 1}
                    href={{pathname: `${el.name}`, query: `${el.link}`}}
                  >
                  <p className={Style.Navbar_box_left_menu_item}>{el.name}</p>
                  </Link>
                ))}
              </div>
              <div className={Style.Navbar_box_left_down}>
                <PiCaretDownLight/>
              </div>
            </div>
            {/* Navbar Middle */}
            <div className={Style.Navbar_box_middle}>
              <div className={Style.Navbar_box_middle_search}>
                <div className={Style.Navbar_box_middle_search_img}>
                  <CiSearch className={Style.Navbar_box_middle_search_img_search}/>
                </div>
                <div className={Style.Navbar_box_middle_search_input}>
                  <input type="text" placeholder="Search Token and NFT collections"></input>
                </div>
              </div>
            </div>
            {/* Navbar right */}
            <div className={Style.Navbar_box_right}>
              <div className={Style.Navbar_box_right_box}>
                <div className={Style.Navbar_box_right_box_box}>
                  <div className={Style.Navbar_box_right_box_img}>
                    <Image width={20} height={20} src={image.eth}/>
                  </div>
                  <div className={Style.Navbar_box_right_down}>
                    <PiCaretDownLight/>
                  </div>
                </div>
                <div className={Style.Navbar_box_right_getApp}>
                  <p> Get the app</p>
                  <FaApple/>
                  <BsGooglePlay/>
                </div>
              </div>
              <button onClick={() => setOpenModel(true)}>
                Connect
              </button>
            </div>
            {openModel && (
              <Model setOpenModel={setOpenModel} connectWallet = "connect"/>
            )}
          </div>
        </div>
        {/* Token List  */}
          {openTokenBox && (
            <TokenList tokenDate = "hey" setOpenTokenBox = {setOpenTokenBox}/>  
          )
        }
    </div>
  )
}

export default Navbar