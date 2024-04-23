import React,{useContext, useEffect, useState, useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
// INTERNAL IMPORT
import Style from './Navbar.module.css'
import image from '../../../assets/index'
import Model from '../Model/Model'
import NetWork from '../NetWork/NetWork'

// REACT ICON
import { CiSearch } from "react-icons/ci";
import { PiCaretDownLight } from "react-icons/pi";
import { FaApple } from "react-icons/fa6";
import { BsGooglePlay } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import HeroSection from '../HeroSection/HeroSection'
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
  const [openNetWork, setOpenNetWork] = useState(false);
  const [accounts, setAccounts] = useState(true);
  const navbarRef = useRef(null);

  const handleOpenNetwork = () => {
    setOpenNetWork((prev) => !prev);
  };

  const handleDocumentClick = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setOpenNetWork(false);
      setOpenModel(false);
      setOpenTokenBox(false);
    }
  };

  const toggleNetwork = () => {
    if (openNetWork) {
      setOpenNetWork(false);
    } else {
      setOpenModel(false);
      setOpenTokenBox(false);
      setOpenNetWork(true);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <div>
        <div ref={navbarRef}  className={Style.Navbar}> 
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
              <div className={Style.Navbar_box_left_menu_mobile}> 
                {MenuItems.map((el, i) => (
                  <Link key={i + 1}
                    href={{pathname: `${el.name}`, query: `${el.link}`}}
                  >
                  <p className={Style.Navbar_box_left_menu_item}>{el.name}</p>
                  </Link>
                ))}
                <p><IoIosArrowUp Navbar_box_left_down/></p>
              </div>
              <div className={Style.Navbar_box_left_down}>
                <IoChevronDown/>
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
                <div className={Style.Navbar_box_right_box_box} onClick={toggleNetwork}>
                    <Image width={20} height={20} src={image.eth} className={Style.Navbar_box_right_box_img}/>
                    <div className={Style.Navbar_box_right_box_icon}>
                      {openNetWork === true ? <IoIosArrowUp /> 
                    : <IoChevronDown />}
                    </div>
                    {/* open network */}
                    {/* important bug */}
                    {openNetWork && 
                    <NetWork setOpenNetWork={setOpenNetWork}/>} 
                </div>
                <div className={Style.Navbar_box_right_getApp}>
                  <p> Get the app</p>
                  <FaApple/>
                  <BsGooglePlay/>
                </div>
              </div>
              {accounts ? (
                  <button onClick={() => setOpenModel(true)}>0x9adsfa2324x</button>
                ) : <button onClick={() => setOpenModel(true)}>Connect</button>
            }
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