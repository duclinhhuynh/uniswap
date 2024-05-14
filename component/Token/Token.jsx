import React, {useContext, useState, useEffect, useRef} from 'react'
import Style from './Token.module.css'
import Image from 'next/image'
// internal import
import image from '../../assets'
import NetWork from '../NetWork/NetWork'
// React icon 
import { IoChevronDown } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
// swap 
import SwapTokenContext from '../../context/SwapTokenContext'
const Token = () => {
  const titleLeft = [
    {name :"Token"},
    {name :"Pools"},
    {name: "Transactions"}
  ]

  const [allTokenList, setAllTokenList] = useState([
    {
      id: 1,
      img: image.eth,
      name: "Ethereum",
      symbol: "ETH",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M"
    },
    {
      id: 2,
      img: image.usdt,
      name: "Tether Coin",
      symbol: "USDT",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M"
    },
    {
      id: 3,
      img: image.usdc,
      name: "USDC Coin",
      symbol: "USDC",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M"
    },
    {
      id: 4,
      img: image.bnb,
      name: "Binance coin",
      symbol: "BNB",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M"
    },
    {
      id: 5,
      img: image.dai,
      name: "Dai coin",
      symbol: "DAI",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M"
    },
    {
      id: 6,
      img: image.optimism,
      name: "Optimism",
      symbol: "OP",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M"
    },
    {
      id: 7,
      img: image.bnb,
      name: "Binance coin",
      symbol: "BNB",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M"
    },
    {
      id: 8,
      img: image.dai,
      name: "Dai coin",
      symbol: "DAI",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M"
    },
    {
      id: 9,
      img: image.optimism,
      name: "Optimism",
      symbol: "OP",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M"
    },

  ]); 
  const {ether , currentAccount, networkConnect,connectWallet, tokenData} = useContext(SwapTokenContext)
  const [netWork, setNetWork] = useState(false);
  const [copyTokenList, setCopyTokenList] = useState(allTokenList);
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
  const [volume, setVolume] = useState(true);
  const onHandSearch = (value) => {
    const filteredTokens = allTokenList.filter(({name})=> 
      name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredTokens.length === 0) {
      setAllTokenList(copyTokenList)
    } else {
      setAllTokenList(filteredTokens)
    }
  }
  const onClearSearch = () => {
    if(allTokenList.length && copyTokenList.length){
      setAllTokenList(copyTokenList);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);
  useEffect(() => {
    if(search) {
      onHandSearch(search);
    }else {
      onClearSearch();
    }
  }, [search])

  const handleOpenNetwork = () => {
    setNetWork(!netWork);
  }
  const handleOpenVolume = () => {
    setVolume(!volume)
  }
  return (
    <>
    <div className={Style.Token}>
      <div className={Style.Token_box}>
        <div className={Style.Token_title}>
          <div className={Style.Token_title_left}>
            <div className={Style.Token_title_left_token}>
              {titleLeft.map((el, i) => (
                <div>{el.name}</div>
              ))}
            </div>
          </div>
          <div className={Style.Token_title_right}>
            <div className={Style.Token_title_right_box} onClick={() => handleOpenNetwork()}>
              {networkConnect !== 'unknown' ? 
                <Image width={20} height={20} src={image.eth} className={Style.Navbar_box_right_box_img}/> : 
                <Image width={20} height={20} src={image.unknown} className={Style.Navbar_box_right_box_img}/>
              }
              {netWork ? <IoIosArrowUp/> : <IoChevronDown/> }
              {netWork && 
              <NetWork/>}
            </div>
            <div className={Style.Token_title_right_volume} onClick={() => handleOpenVolume()}>
              <div>1D Volume</div>
              {volume ? <IoIosArrowUp/> : <IoChevronDown/> }
            </div>
            <div className={Style.Token_title_right_search}>
              <CiSearch className={Style.Token_title_right_search_icon}/>
              <input type="text" placeholder='Search Token'
                onChange={(e) => setSearchItem(e.target.value)}
                value = {searchItem}
              />
            </div>
          </div>
        </div>
        <table>
        </table>
        <div className={Style.Token_head}>
          <div>#</div>
          <div>TokenName</div>
          <div>Price</div>
          <div>1 hour</div>
          <div>1 day</div>
          <div>FDV</div>
          <div>Volume</div>
          <div></div>
        </div>
        <div className={Style.Token_body}>
          {allTokenList.map((el, i) => (
            <div className={Style.Token_body_el}>
              <div>{el.id}</div>
              <div> 
                <Image src={el.img} width={30} height={30} className={Style.Token_body_el_img}/>
                <small>{el.name}</small>
                <small>{el.symbol}</small>
              </div>
              <div>{el.price}</div>
              <div>{el.hour}</div>
              <div>{el.day}</div>
              <div>{el.fdv}</div>
              <div>{el.volume}</div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Token