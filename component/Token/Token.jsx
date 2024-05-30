import React, {useContext, useState, useEffect, useRef} from 'react'
import Style from './Token.module.css'
import Image from 'next/image'
import Link from 'next/link'
// internal import
import image from '../../assets'
import NetWork from '../NetWork/NetWork'
import LineChart from '../LineChart/LineChart'
// React icon 
import { IoChevronDown } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
// swap 
import SwapTokenContext from '../../context/SwapTokenContext'
// chart
import { Chart } from "react-google-charts";
const Token = () => {
  const {ether , currentAccount, networkConnect,connectWallet, tokenData, allCoin, fetchHistoricalData} = useContext(SwapTokenContext)
  const [netWork, setNetWork] = useState(false);
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
  const [volume, setVolume] = useState(true);
  const [openToken, setOpenToken] = useState(true);
  const [openPool, setOpenPool] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [active, setActive] = useState(1);
  useEffect(() => {
    setAllTokenList(allCoin);
  },[allCoin])
  const [allTokenList, setAllTokenList] = useState([]); 
  const [copyTokenList, setCopyTokenList] = useState(allCoin);
  const [data, setData] = useState([['Date', 'prices']]);
  const [chartData, setChartData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  // page
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setAllTokenList(allCoin.slice(startIndex, endIndex));
  }, [allCoin, currentPage]);
    const totalPages = Math.ceil(allCoin.length / itemsPerPage);

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
  const [loadingChartData, setLoadingChartData] = useState(true); // Thêm state mới

  useEffect(() => {
    setAllTokenList(allCoin.slice(0, 15)); // Giới hạn chỉ 15 phần tử
  }, [allCoin]);
  
  useEffect(() => {
    const fetchChartData = async (coinId) => {
      try {
        const historicalData = await fetchHistoricalData(coinId);
        const dataCopy = [['Date', 'prices']];
        historicalData.forEach(item => {
          const date = new Date(item[0]).toLocaleDateString().slice(0, -5);
          dataCopy.push([date, item[1]]);
        });
        setChartData(prevChartData => ({
          ...prevChartData,
          [coinId]: dataCopy
        }));
        console.log("charData",chartData['ethereum'][1]);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoadingChartData(false);
      }
    };
  
    allTokenList.forEach(token => {
      fetchChartData(token.id);
    });
  }, [allTokenList, fetchHistoricalData]);
  
  const renderChartColor = (value, prevValue) => {
    if (value < prevValue) {
      return 'green';
    } else {
      return 'red'; // Nếu không thay đổi
    }
  };
  

  // các hàm xử lý mở/chỉnh sửa token, pool, transaction, network, và volume
  return (
    <>
    <div className={Style.Token}>
      <div className={Style.Token_box}>
        <div className={Style.Token_box_chart}>
          <div className={Style.Token_box_chart_area}>
          <Chart
            width={'600px'}
            height={'400px'}
            chartType="AreaChart"
            data={chartData['ethereum', 'bitcoin']}
            options={{
              title: 'Bitcoin and Ethereum Stacked Area Chart',
              // isStacked: true, // Thiết lập để lồng nhau
              series: {
                0: { 
                  data : chartData['ethereum'],
                  color: 'pink', // Màu cho Bitcoin
                },
                1: { 
                  data : chartData['ethereum'],
                  color: '#5a7dd9', // Màu cho Ethereum
                }
              },
              areaOpacity: 0.3,
              legend: { position: 'top' },
              backgroundColor: 'transparent',
              hAxis: {
                gridlines: {
                  color: 'none'
                },
                baselineColor: 'none',
              },
              vAxis: {
                gridlines: {
                  color: 'none'
                },
                baselineColor: 'none',
                textPosition: 'none'
              },
              chartArea: {
                width: '100%',
                height: '80%',
                backgroundColor: 'transparent'
              },
            }}
          />

          </div>
          <div className={Style.Token_box_chart_column}>
          <Chart
            width={'600px'}
            height={'420px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={chartData['ethereum']}
            options={{
              series: [{
                color: "pink"
              }],
              title: 'Bitcoin and Ethereum Stacked Bar Chart',
              // isStacked: true,
              legend: { position: 'top' },
              backgroundColor: 'transparent',
              hAxis: {
                gridlines: { color: 'none' },
                baselineColor: 'none',
              },
              vAxis: {
                gridlines: { color: 'none' },
                baselineColor: 'none',
                textPosition: 'none'
              },
            }}
            colors= 'pink'
          />
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
                {!loadingChartData && chartData[el.id] && ( // Kiểm tra xem dữ liệu đã tải xong và hợp lệ chưa
                  <Chart
                    chartType="LineChart"
                    width="100px"
                    height="50px"
                    data={chartData[el.id]}
                    options={{
                      title: '',
                      backgroundColor: 'transparent',
                      hAxis: {
                        gridlines: {
                          color: 'none'
                        },
                        baselineColor: 'none',
                        textPosition: 'none'
                      },
                      vAxis: {
                        gridlines: {
                          color: 'none'
                        },
                        baselineColor: 'none',
                        textPosition: 'none'
                      },
                      chartArea: {
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent'
                      },
                      legend: {
                        position: 'none'
                      },
                      colors: [renderChartColor(chartData[el.id][1], chartData[el.id][10])] // So sánh giá trị đầu tiên và cuối cùng để xác định màu sắc
                    }}
                  />
                )}
              </div>
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
                {!loadingChartData && chartData[el.id] && ( // Kiểm tra xem dữ liệu đã tải xong và hợp lệ chưa
                  <Chart
                    chartType="LineChart"
                    width="100px"
                    height="50px"
                    data={chartData[el.id]}
                    options={{
                      title: '',
                      backgroundColor: 'transparent',
                      hAxis: {
                        gridlines: {
                          color: 'none'
                        },
                        baselineColor: 'none',
                        textPosition: 'none'
                      },
                      vAxis: {
                        gridlines: {
                          color: 'none'
                        },
                        baselineColor: 'none',
                        textPosition: 'none'
                      },
                      chartArea: {
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent'
                      },
                      legend: {
                        position: 'none'
                      },
                      colors: [renderChartColor(chartData[el.id][1], chartData[el.id][10])] // So sánh giá trị đầu tiên và cuối cùng để xác định màu sắc
                    }}
                  />
                )}
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
                {!loadingChartData && chartData[el.id] && ( // Kiểm tra xem dữ liệu đã tải xong và hợp lệ chưa
                  <Chart
                    chartType="LineChart"
                    width="100px"
                    height="50px"
                    data={chartData[el.id]}
                    options={{
                      title: '',
                      backgroundColor: 'transparent',
                      hAxis: {
                        gridlines: {
                          color: 'none'
                        },
                        baselineColor: 'none',
                        textPosition: 'none'
                      },
                      vAxis: {
                        gridlines: {
                          color: 'none'
                        },
                        baselineColor: 'none',
                        textPosition: 'none'
                      },
                      chartArea: {
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent'
                      },
                      legend: {
                        position: 'none'
                      },
                      colors: [renderChartColor(chartData[el.id][1], chartData[el.id][10])] // So sánh giá trị đầu tiên và cuối cùng để xác định màu sắc
                    }}
                  />
                )}
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