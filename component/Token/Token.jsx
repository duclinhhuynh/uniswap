import React, {useContext, useState, useEffect, useRef} from 'react'
import Style from './Token.module.css'
import Image from 'next/image'
import Link from 'next/link'
// internal import
import image from '../../assets'
import NetWork from '../NetWork/NetWork'
// React icon 
import { IoChevronDown } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowTurnUp } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
// swap 
import SwapTokenContext from '../../context/SwapTokenContext'
// chart
import ChartLine from '../Chart/LineChart/ChartLine'
import ChartBar from '../Chart/LineChart/ChartBar'
import ChartArea from '../Chart/LineChart/ChartArea'
const Token = () => {
  const {networkConnect, allCoin, fetchHistoricalData} = useContext(SwapTokenContext)
  //select
  const [netWork, setNetWork] = useState(false);
  const [volume, setVolume] = useState(true);
  const [openToken, setOpenToken] = useState(true);
  const [openPool, setOpenPool] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [active, setActive] = useState(1);
  // select
  //search
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search); 
  const [allTokenList, setAllTokenList] = useState([]); 
  const [copyTokenList, setCopyTokenList] = useState(allCoin);
  // search

  // chart
  const [chartData, setChartData] = useState([]);
  const [charToken, setChartToken] = useState([]);
  const [chartColumn, setChartColumn] = useState([]);
  const [loadingChartData, setLoadingChartData] = useState(true); 
  // chart
  
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(allCoin.length / itemsPerPage);
  // page
  const firstTokenRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  // sort by
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortCriterion, setSortCriterion] = useState('volume'); 
  //
  const [volumeDay, setVolumeDay] = useState([
    '1H Volume'
  ]);  
  const [openVolumeDay, setOpenVolumeDay] = useState(false);
  const [activeVolume, setActiveVolume] = useState(1);

  // volume day
  const handleOpenVolumeDay = () => {
    setOpenVolumeDay(!openVolumeDay);
  }
  const handle1hourVolume = () => {
    setActiveVolume(1);
    setVolumeDay('1H Volume');
  }
  const handle1dayVolume = () => {
    setActiveVolume(2);
    setVolumeDay('1D Volume');
  }
  const handle1weekVolume = () => {
    setActiveVolume(3);
    setVolumeDay('1W Volume');
  }
  const handle1mounthVolume = () => {
    setActiveVolume(4);
    setVolumeDay('1M Volume');
  }
  const handle1yearVolume = () => {
    setActiveVolume(5);
    setVolumeDay('1Y Volume');
  }
 // scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Kiểm tra vị trí cuộn của trang
    if (window.scrollY > 700) { // Chỉ hiển thị nút khi vị trí cuộn vượt qua 200px
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };
  useEffect(() => {
    // Trigger lại handleScroll khi danh sách thay đổi
    handleScroll();
  }, [allTokenList]);

  const scrollToTop = () => {
    // Cuộn đến phần tử el.id đầu tiên khi nút được nhấp
    if (firstTokenRef.current) {
      firstTokenRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // page
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setAllTokenList(allCoin.slice(startIndex, endIndex));
  }, [allCoin, currentPage]);


    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  //page

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
// search

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
// fetch chart data
  useEffect(() => {
    setAllTokenList(allCoin.slice(0, 15)); // Giới hạn chỉ 15 phần tử
  }, [allCoin]);
  useEffect(() => {
    const fetchChartData = async (coinId) => {
      try {
        const historicalData = await fetchHistoricalData(coinId);
        const convertedData = historicalData.prices.map(item => ({
          date: new Date(item[0]).toLocaleDateString(),
          prices: item[1],
        }));
        return {
          coinId,
          data: convertedData,
        };
      } catch (error) {
        console.error('Error fetching historical data:', error);
        return null;
      }
    };

    const fetchDataForBothCoins = async () => {
      try {
        const [tokenV3, tokenV2] = await Promise.all([
          fetchChartData('internet-computer'),
          fetchChartData('uniswap'),
        ]);

        if (tokenV3 && tokenV2) {
          const tokenV3Data = tokenV3.data.reduce((acc, { date, prices }) => {
            if (!acc[date]) {
              acc[date] = { date, TokenV3: prices };
            }
            return acc;
          }, {});

          const tokenV2Data = tokenV2.data.reduce((acc, { date, prices }) => {
            if (acc[date]) {
              acc[date].TokenV2 = prices;
            } else {
              acc[date] = { date, TokenV2: prices };
            }
            return acc;
          }, tokenV3Data);

          const mergedData = Object.values(tokenV2Data);
          setChartColumn(mergedData);

          const mergedTokenData = tokenV3.data.map(({ date, prices }) => ({
            date,
            TokenV3: prices,
            TokenV2: tokenV2.data.find(item => item.date === date)?.prices || prices,
          }));
          setChartToken(mergedTokenData);
        }

        // Gộp dữ liệu cho từng token
        const allChartData = {};
        for (const token of allTokenList) {
          const tokenData = await fetchChartData(token.id);
          if (tokenData) {
            allChartData[token.id] = tokenData.data;
          }
        }
        setChartData(allChartData);

      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoadingChartData(false);
      }
    };

    if (allTokenList && allTokenList.length > 0) {
      fetchDataForBothCoins();
    }
  }, [allTokenList, fetchHistoricalData]);

//  sort by price
const sortTokens = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const sortedTokens = [...allTokenList]
    .slice(startIndex, endIndex)
    .sort((a, b) => {
    if (sortCriterion === 'volume') {
      if (sortOrder === 'asc') {
        return a.total_volume - b.total_volume;
      } else {
        return b.total_volume - a.total_volume;
      }
    } else if (sortCriterion === 'price') {
      if (sortOrder === 'asc') {
        return a.current_price - b.current_price;
      } else {
        return b.current_price - a.current_price;
      }
    } else if (sortCriterion === 'day') {
      if (sortOrder === 'asc') {
        return Math.abs(a.day_change) - Math.abs(b.day_change);
      } else {
        return Math.abs(b.day_change) - Math.abs(a.day_change);
      }
    } 
    else if (sortCriterion === 'hour') {
      if (sortOrder === 'asc') {
        return a.hour_change - b.hour_change;
      } else {
        return b.hour_change - a.hour_change;
      }
    }    else if (sortCriterion === 'FDV') {
      if (sortOrder === 'asc') {
        return a.day_FDV - b.day_FDV;
      } else {
        return b.day_FDV - a.day_FDV;
      }
    }
    return 0;
  });
  setAllTokenList(sortedTokens);
  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
};
  return (
    <>
    <div className={Style.Token} ref={firstTokenRef} >
      <div className={Style.Token_box}>
        <div className={Style.Token_box_chart}>
          <div className={Style.Token_box_chart_area}>
          <ChartArea data={charToken}/>
          </div>
          <div className={Style.Token_box_chart_column}>
          <ChartBar data={chartColumn}/>
          </div>
        </div>
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
            <div className={`${ openVolumeDay ?  Style.Token_title_right_volume_active : Style.Token_title_right_volume}`} onClick={() => handleOpenVolumeDay()}>
              <div className={Style.Token_title_right_volume_box_value}>{volumeDay}
                {openVolumeDay && 
                  <div className={Style.Token_title_right_volume_box}>
                    <div onClick={()=>handle1hourVolume()}>1H Volume {activeVolume === 1 ? <FaCheck className={Style.active_volume_check}/> : ""}</div>
                    <div onClick={()=>handle1dayVolume()}>1D Volume {activeVolume === 2 ? <FaCheck className={Style.active_volume_check}/> : ""}</div>
                    <div onClick={()=>handle1weekVolume()}>1W Volume {activeVolume === 3 ? <FaCheck className={Style.active_volume_check}/> : ""}</div>
                    <div onClick={()=>handle1mounthVolume()}>1M Volume {activeVolume === 4 ? <FaCheck className={Style.active_volume_check}/> : ""}</div>
                    <div onClick={()=>handle1yearVolume()}>1Y Volume {activeVolume === 5 ? <FaCheck className={Style.active_volume_check}/> : ""}</div>
                  </div>
                } 
              </div>
              {openVolumeDay ? <IoIosArrowUp/> : <IoChevronDown/> }
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
                  <div>Token Name</div>
                  <div className={Style.Token_head_box_price} 
                  onClick={()=> { 
                    setSortCriterion('price');
                    sortTokens();
                    }}> {sortCriterion === 'price' && (sortOrder === 'asc' ? <FaArrowDown /> : <FaArrowUp />)}&nbsp;Price </div>
                  <div className={Style.Token_head_box_price} 
                  onClick={()=> { 
                    setSortCriterion('hour');
                    sortTokens();
                    }}> {sortCriterion === 'hour' && (sortOrder === 'asc' ? <FaArrowDown /> : <FaArrowUp />)}&nbsp;1 hour</div>
                  <div className={Style.Token_head_box_price} 
                  onClick={()=> { 
                    setSortCriterion('day');
                    sortTokens();
                    }}>{sortCriterion === 'day' && (sortOrder === 'asc' ? <FaArrowDown /> : <FaArrowUp />)}&nbsp;1 day</div>
                  <div className={Style.Token_head_box_price}  
                  onClick={()=> { 
                    setSortCriterion('FDV');
                    sortTokens();
                    }}>{sortCriterion === 'FDV' && (sortOrder === 'asc' ? <FaArrowDown /> : <FaArrowUp />)}&nbsp;FDV</div>
                  <div className={Style.Token_head_box_price}  
                  onClick={() => {
                    setSortCriterion('volume');
                    sortTokens();
                  }}>{sortCriterion === 'volume' && (sortOrder === 'asc' ? <FaArrowDown /> : <FaArrowUp />)}&nbsp;Volume</div>
                  <div>last 10 day</div>
                </div>
              </div>
              <div className={Style.Token_body} >
              {allTokenList.map((el, i) => (
              <div key={el.id}
              className={Style.Token_body_flex}
              // ref={(element) => (tokenRefs.current[i] = element)}
              >
              <Link  href={{ pathname: '/coin/', query: { id: el.id } }} className={Style.Token_body_el}>
                <div>{el.market_cap_rank}</div>
                <div> 
                  <img src={el.image} width={30} height={30} className={Style.Token_body_el_img}/>
                  <small>{el.id}</small>
                  <small>{el.symbol}</small>
                </div>
                <div>${el.current_price}</div>
                <div className={el.market_cap_change_percentage_24h > 0 ? Style.green : Style.red}>{el.market_cap_change_percentage_24h > 0 ? <FaCaretUp/> : <FaCaretDown/>} {Math.floor(el.market_cap_change_percentage_24h*100)/100 < 0 ? Math.floor(el.market_cap_change_percentage_24h*100)/100*-1 : Math.floor(el.market_cap_change_percentage_24h*100)/100}</div>
                <div className={el.price_change_24h > 0 ? Style.green : Style.red}>{el.price_change_24h > 0 ? <FaCaretUp/> : <FaCaretDown/>}{Math.floor(el.price_change_24h*100)/100 < 0 ? Math.floor(el.price_change_24h*100)/100*-1 : Math.floor(el.price_change_24h*100)/100}</div>
                <div>{el.total_supply ? el.total_supply.toString().slice(0,11) : ''}</div>
                <div>{Math.floor(el.fully_diluted_valuation ? el.fully_diluted_valuation.toString().slice(0,2) : '')} B</div>
              </Link>
              <div className={Style.Token_body_el_chart}>
                {!loadingChartData && chartData[el.id] &&( 
                  <ChartLine data={chartData[el.id]} />
                )}
              </div>
              </div>
              ))}
              <div className={Style.Scroll} >
              {showScrollButton &&
               <button
                  className={`${Style.scroll_to_top_button} ${showScrollButton ? Style.show : Style.hide}`}
                  onClick={scrollToTop} // Cuộn đến phần tử đầu tiên
                >
                  <span><FaArrowTurnUp/>  Return to top </span>
                </button>
              }
              </div>
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
              <div key={el.id} className={Style.Token_body_flex}>
              <Link  href={{ pathname: '/coin/', query: { id: el.id } }} className={Style.Token_body_el}>
                <div>{el.market_cap_rank}</div>
                <div> 
                  <img src={el.image} width={30} height={30} className={Style.Token_body_el_img}/>
                  <small>{el.id}</small>
                  <small>{el.symbol}</small>
                </div>
                <div>${el.current_price}</div>
                <div className={el.market_cap_change_percentage_24h > 0 ? Style.green : Style.red}>{el.market_cap_change_percentage_24h > 0 ? <FaCaretUp/> : <FaCaretDown/>} {Math.floor(el.market_cap_change_percentage_24h*100)/100 < 0 ? Math.floor(el.market_cap_change_percentage_24h*100)/100*-1 : Math.floor(el.market_cap_change_percentage_24h*100)/100}</div>
                <div className={el.price_change_24h > 0 ? Style.green : Style.red}>{el.price_change_24h > 0 ? <FaCaretUp/> : <FaCaretDown/>}{Math.floor(el.price_change_24h*100)/100 < 0 ? Math.floor(el.price_change_24h*100)/100*-1 : Math.floor(el.price_change_24h*100)/100}</div>
                <div>{el.total_supply ? el.total_supply.toString().slice(0,11) : ''}</div>
                <div>{Math.floor(el.fully_diluted_valuation ? el.fully_diluted_valuation.toString().slice(0,2) : '')} B</div>
              </Link>
              <div className={Style.Token_body_el_chart}>
                
              </div>
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
              <div key={el.id} className={Style.Token_body_flex}>
              <Link  href={{ pathname: '/coin/', query: { id: el.id } }} className={Style.Token_body_el}>
                <div>{el.market_cap_rank}</div>
                <div> 
                  <img src={el.image} width={30} height={30} className={Style.Token_body_el_img}/>
                  <small>{el.id}</small>
                  <small>{el.symbol}</small>
                </div>
                <div>${el.current_price}</div>
                <div className={el.market_cap_change_percentage_24h > 0 ? Style.green : Style.red}>{el.market_cap_change_percentage_24h > 0 ? <FaCaretUp/> : <FaCaretDown/>} {Math.floor(el.market_cap_change_percentage_24h*100)/100 < 0 ? Math.floor(el.market_cap_change_percentage_24h*100)/100*-1 : Math.floor(el.market_cap_change_percentage_24h*100)/100}</div>
                <div className={el.price_change_24h > 0 ? Style.green : Style.red}>{el.price_change_24h > 0 ? <FaCaretUp/> : <FaCaretDown/>}{Math.floor(el.price_change_24h*100)/100 < 0 ? Math.floor(el.price_change_24h*100)/100*-1 : Math.floor(el.price_change_24h*100)/100}</div>
                <div>{el.total_supply ? el.total_supply.toString().slice(0,11) : ''}</div>
                <div>{Math.floor(el.fully_diluted_valuation ? el.fully_diluted_valuation.toString().slice(0,2) : '')} B</div>
              </Link>
              <div className={Style.Token_body_el_chart}>
              </div>
              </div>
              ))}
              </div>
            </>
            : ""
          }
        </div>
        <div className={Style.Token_box_pagination}>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <FaArrowLeftLong/>
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <FaArrowRightLong/>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Token