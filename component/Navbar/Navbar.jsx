import React,{useContext, useEffect, useState, useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
// INTERNAL IMPORT
import Style from './Navbar.module.css'
import image from '../../assets'
import Model from '../Model/Model'
import NetWork from '../NetWork/NetWork'
import Search from './Search/Search'
import More from './More/More'
import App from './App/App'
import TokenList from '../TokenList/TokenList'
import Wallet from '../Model/Wallet/Wallet'

// REACT ICON
import { IoSearchOutline } from "react-icons/io5";
import { PiCaretDownLight } from "react-icons/pi";
import { FaApple } from "react-icons/fa6";
import { BsGooglePlay } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import {SwapTokenContext} from '../../context/SwapTokenContext'


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
    // {
    //   name: "Pools",
    //   link: "/"
    // }
  ];
  const [openModel, setOpenModel] = useState(false);
  const [openWalet, setOpenWalet] = useState(false);
  const [openTokenBox, setOpenTokenBox] = useState(false);
  const [openNetWork, setOpenNetWork] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [openApp, setOpenApp] = useState(false);
  // const [activeBtn, setActiveBtn] = useState(1);
  const [accounts, setAccounts] = useState(true);
  const [isMobile, setIsMobile] = useState(false); 
  const [search, setSearch] = useState(false);
  const [active, setActive] = useState(1);
  const isOpensearchClass = search ? Style.Navbar_box_middle_search_fillter : Style.Navbar_box_middle_search;
  const {ether , currentAccount, networkConnect,connectWallet, tokenData} = useContext(SwapTokenContext)
  const handleOpenSwap = ()=> {
    setActive(1);
  }
  const handleOpenExplore = ()=> {
    setActive(2);
  }
  const handleOpenNFTs = ()=> {
    setActive(3);
  }
  const handleOpenPools = ()=> {
    setActive(4);
  }
  // open App 
  const handleOpenApp = () => {
    setOpenApp(!openApp)
  }
  // open more 
  const handleOpenMore = () => {
    setOpenMore(!openMore);
  }
  // open search
  const openSearch =() => {
    if(!search)
    setSearch(true);
    console.log(tokenData);
    console.log(networkConnect);
  }
  const navbarRef = useRef(null);

  const handleOpenNetwork = () => {
    setOpenNetWork((prev) => !prev);
  };

  const handleDocumentClick = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setOpenNetWork(false);
      setOpenModel(false);
      setOpenTokenBox(false);
      setSearch(false);
      setOpenMore(false);
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
  const toggleNetworkMobile = () => {
    if (openNetWork) {
      setOpenNetWork(false);
      setIsMobile(true);
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
              <Link href={{pathname: `${"/"}`}}>
                <Image className={Style.Navbar_box_left_logo} width={32} alt='logo' height={32} src={image.uniswap}/>
              </Link>
              {/* menu navbar */}
              <div className={Style.Navbar_box_left_menu}> 
                <div className={Style.Navbar_box_left_menu_box}>
                   <Link  
                  href={{pathname: `Swap`, query: `/`}}><p onClick={() => handleOpenSwap()} className={`${active === 1 ? "" : Style.Navbar_box_left_menu_item }`}>Swap</p></Link>
                   <Link  
                  href={{pathname: `Explore`, query: `/`}}><p onClick={() => handleOpenExplore()} className={`${active === 2 ? "" : Style.Navbar_box_left_menu_item }`}>Explore</p></Link>
                   <Link  
                  href={{pathname: `NFTs`, query: `/`}}><p onClick={() => handleOpenNFTs()} className={`${active === 3 ? "" : Style.Navbar_box_left_menu_item }`}>NFTs</p></Link>
                  <Link 
                  href={{pathname: `Pools`, query: `/`}}><p onClick={() => handleOpenPools()} className={`${active === 4 ? Style.Navbar_box_left_menu_box_pool : Style.Navbar_box_left_menu_item }`}>Pools</p></Link>
                </div>
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
              <div className={Style.Navbar_box_left_down} onClick={handleOpenMore}>
                <IoChevronDown/>
                {openMore && <More/>}
              </div>
              {/* mobile */}
              <div className={Style.Navbar_box_right_box_box_mobile} onClick={toggleNetworkMobile}>
                    {networkConnect !== 'unknown' ? 
                    <Image width={20} height={20} src={image.eth} className={Style.Navbar_box_right_box_img}/> : 
                    <Image width={20} height={20} src={image.unknown} className={Style.Navbar_box_right_box_img}/>
                    }
                    <div className={Style.Navbar_box_right_box_icon_mobile}>
                      {openNetWork === true ? <IoIosArrowUp /> 
                    : <IoChevronDown />}
                    </div>
                    {/* open network */}
                    {/* important bug */}
                    {openNetWork && 
                    <NetWork setOpenNetWork={setOpenNetWork} isMobile={isMobile}/>} 
                </div>
            </div>
            {/* Navbar Middle */}
            <div className={Style.Navbar_box_middle}>
              <div className={`${isOpensearchClass}`} onClick={openSearch}>
                <div className={Style.Navbar_box_middle_search_img}>
                  <IoSearchOutline className={Style.Navbar_box_middle_search_img_search}/>
                </div>
                <div className={Style.Navbar_box_middle_search_input}>
                  <input type="text" placeholder="Search Token and NFT collections"></input>
                </div>
                <div className={Style.Navbar_box_middle_search_input_tag}><small>/</small></div>
              </div>
              {search && <Search/>}
            </div>
            {/* Navbar right */}
            <div className={Style.Navbar_box_right}>
              <div className={Style.Navbar_box_right_box}>
                {/* search mobile */}
                <div className={Style.Navbar_box_middle_search_img_mobile} onClick={openSearch}>
                    <IoSearch className={Style.Navbar_box_middle_search_img_search_mobile}/>
                </div>
                <div className={Style.Navbar_box_right_box_box} onClick={toggleNetwork}>
                    {/* {networkConnect} */}
                    {networkConnect !== 'unknown' ? 
                    <Image width={20} height={20} src={image.eth} className={Style.Navbar_box_right_box_img}/> : 
                    <Image width={20} height={20} src={image.unknown} className={Style.Navbar_box_right_box_img}/>
                    }
                    <div className={Style.Navbar_box_right_box_icon}>
                      {openNetWork === true ? <IoIosArrowUp /> 
                    : <IoChevronDown />}
                    </div>
                    {/* open network */}
                    {/* important bug */}
                    {openNetWork && 
                    <NetWork setOpenNetWork={setOpenNetWork}/>} 
                </div>
                <div className={Style.Navbar_box_right_getApp} onClick={handleOpenApp}>
                  <p> Get the app</p>
                  <FaApple/>
                  <BsGooglePlay/>
                  {openApp && <App/>}
                </div>
              </div>
              {currentAccount ? (
                  <button onClick={() => setOpenWalet(true)}>
                  {currentAccount && currentAccount.length > 10 ?
                    currentAccount.slice(0, 7) + "..." + currentAccount.slice(-3) :
                    currentAccount}
                  </button>
                ) : <button onClick={() => setOpenModel(true)}>connect</button>
            }
            </div>  
            {openWalet && (
              <Wallet currentAccount={currentAccount} setOpenWalet={setOpenWalet} tokenData={tokenData}/>
            )}
            {openModel && (
              <Model setOpenModel={setOpenModel} connectWallet = {connectWallet}/>
            )}
          </div>
        </div>
        {/* Token List  */}
          {openTokenBox && (
            <TokenList tokenData = {tokenData} setOpenTokenBox = {setOpenTokenBox}/>  
          )
          }
    </div>
  )
}

export default Navbar