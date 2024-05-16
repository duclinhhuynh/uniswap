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
import { FaArrowDown } from "react-icons/fa6";
// swap 
import SwapTokenContext from '../../context/SwapTokenContext'
const Token = () => {

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
  const [openToken, setOpenToken] = useState(true);
  const [openPool, setOpenPool] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [active, setActive] = useState(1);
  // search
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
    const timer = setTimeout(() => setSearch(searchItem), 500);
    return () => clearTimeout(timer);
  }, [searchItem]);
  useEffect(() => {
    if(search) {
      onHandSearch(search);
    }else {
      onClearSearch();
    }
  }, [search])
///

// select
const handleOpenToken = () => {
  setOpenToken(true);
  setOpenPool(false);
  setOpenTransaction(false)
  setActive(1);
}
const handleOpenPool = () => {
  setOpenToken(false);
  setOpenPool(true);
  setOpenTransaction(false)
  setActive(2);
}

const handleOpenTransaction = () => {
  setOpenToken(false);
  setOpenPool(false);
  setOpenTransaction(true)
  setActive(3);
}
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
                <div onClick={() => handleOpenToken()} className={`${active === 1 ? Style.active : ""}`}>Tokens</div>
                <div onClick={() => handleOpenPool()} className={`${active === 2 ? Style.active : ""}`}>Pools</div>
                <div onClick={() => handleOpenTransaction()} className={`${active === 3 ? Style.active : ""}`}>Transactions</div>
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
        <div>
          {openToken 
          ? // Token
            <>
              <div className={Style.Token_head}>
                <div className={Style.Token_head_box}>
                  <div>#</div>
                  <div>TokenName</div>
                  <div>Price</div>
                  <div>1 hour</div>
                  <div>1 day</div>
                  <div>FDV</div>
                  <div><FaArrowDown/>&nbsp;Volume</div>
                  <div></div>
                </div>
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
            </>
            :// Pool
            openPool
            ?  <>
            <div className={Style.Token_head}>
              <div className={Style.Token_head_box}>
                <div>#</div>
                <div>Pool</div>
                <div>Transactions</div>
                <div><FaArrowDown/>&nbsp;TVL</div>
                <div>1 day volume</div>
                <div>FDV</div>
                <div>7 day volume</div>
                <div>1 day APR</div>
              </div>
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
            </>
            :
            // Transaction
            openTransaction
            ?
            <>
            <div className={Style.Token_head}>
              <div className={Style.Token_head_box}>
                <div><FaArrowDown/>&nbsp;Time</div>
                <div>Type</div>
                <div>USD</div>
                <div>Token amount</div>
                <div>Token amount</div>
                <div>Walet</div>
              </div>
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
            </>
            : ""
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default Token