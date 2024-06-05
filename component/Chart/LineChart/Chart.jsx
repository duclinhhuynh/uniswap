import React, { useEffect, useState,useRef} from 'react';
import { useRouter } from 'next/router';
import {LineChart,Line, AreaChart,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Style from './LineChart.module.css'
import StyleWallet from '../../Model/Wallet/Wallet.module.css'

// react icon
import { FaXTwitter } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { BiQrScan } from "react-icons/bi";
import { MdChevronRight } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaChartSimple } from "react-icons/fa6";
import {FiCopy} from 'react-icons/fi';
import { FaRegCheckCircle } from "react-icons/fa";
import { SiGoogleearth } from "react-icons/si";
import { MdOutlineShowChart } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ color: 'green' }}>
        <p className="label" style={{ color: 'green' }}>{`${label} : ${
          new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
          }).format(payload[0].value)
        }`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({data}) => {
  const formatPrice = (value) => {
    return `$${value.toFixed(2)}`; // Thêm kí tự "$" trước giá trị và giới hạn số thập phân đến hai chữ số
  };
  return( 
      <AreaChart width={750} height={400} data={data}>
          <CartesianGrid stroke="#f5f5f5" 
          />
          <XAxis dataKey="date" interval="preserveStart" // sát bên trái 
          axisLine={false} //ẩn trục
          tickLine={false}
          />
          <YAxis dataKey="prices" domain={["auto", "auto"]} orientation="right" label="" tick={{ fontSize: 12 }} tickFormatter={formatPrice}
          axisLine={false}// ẩn trục 
          tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={true} wrapperStyle={{outline: "none"}}/>
          <Legend />
          <Area type="monotone" dataKey="prices" stroke="#677de6" strokeWidth={2} dot={false} fill="#b2bef5"  curve="monotoneX"/>
      </AreaChart>
  )
};
const Chart = () => {
  const router = useRouter();
  const [coinId, setCoinId] = useState('');
  const [data, setData] = useState([]);
  const [activeDay, setActiveDay] = useState(1);
  const [open1day, setOpen1day] = useState(true);
  const [open1week, setOpen1week] = useState(false);
  const [open1month, setOpen1Month] = useState(false);
  const [open1year, setOpen1Year] = useState(false);
  const [openAll, setOpenAll] = useState(false);
  const [currentAccount, setCurrenAccount] = useState('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  const [addressMyWeb, setAddressMyWeb] = useState('https://www.youtube.com/watch?v=5vcB-EUwbJU');
  const [showCheck, setShowCheck] = useState(false);
  const [showCheckShare, setShowCheckShare] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [lineChart, setLineChart] = useState(true);
  const [candlestick, setCandlestick] = useState(false);
  const [changechart, setChangeChart] = useState(false);
  const [changePrice, setChangeChartPrice] = useState(false);
  const [pricecheck, setPricecheck] = useState(true);
  const [volumecheck, setVolumecheck] = useState(false);
  const [tvlcheck, setTvlcheck] = useState(false);
  // check chart
  const handleclickanalyst = () => {
    setChangeChart(!changechart)
    setChangeChartPrice(false)
  }
  const handleclickprice = () => {
    setChangeChartPrice(!changePrice)
    setChangeChart(false)
  }
  const handlelineChart = () => {
    setLineChart(true);
    setCandlestick(false)
  }
  const handlecandlestick = () => {
    setCandlestick(true);
    setLineChart(false)
  }
  const handlePriceCheck = () => {
    setPricecheck(true);
    setVolumecheck(false);
    setTvlcheck(false);
  }
  const handleVolumeCheck = () => {
    setPricecheck(false);
    setVolumecheck(true);
    setTvlcheck(false);
  }
  const handleTvlCheck = () => {
    setPricecheck(false);
    setVolumecheck(false);
    setTvlcheck(true);
  }

  //
  const onHandleADay = () => {
    setActiveDay(1);
    setOpen1day(true);
    setOpen1week(false)
    setOpen1Month(false)
    setOpenAll(false)
    setOpen1Year(false)
  }
  const onHandle1Week = () => {
    setActiveDay(2);
    setOpen1day(false);
    setOpen1week(true)
    setOpen1Month(false)
    setOpenAll(false)
    setOpen1Year(false)
  }
  const onHandle1Month = () => {
    setActiveDay(3);
    setOpen1day(false);
    setOpen1week(false)
    setOpen1Month(true)
    setOpenAll(false)
    setOpen1Year(false)
  }
  const onHandle1All = ()=> {
    setActiveDay(4)
    setOpen1day(false);
    setOpen1week(false)
    setOpen1Month(false)
    setOpenAll(true)
    setOpen1Year(false)
  }
  const onHandle1Year = ()=> {
    setActiveDay(5)
    setOpen1day(false);
    setOpen1week(false)
    setOpen1Month(false)
    setOpenAll(false)
    setOpen1Year(true)
  }
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setCoinId(id);
    }
  }, [router.isReady, router.query]);

  // get api
  useEffect(() => {
    const fetchHistoricalData = async (coinId) => {
      if (!coinId) return;

      const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-qPA1U4MtwyJnE2WUmBzPhaAv' }
      };

      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10`, options)
        .then((res) => res.json())
        .then((json) => json);
        console.log("chartData", response);
        let convertedData = response.prices.map(item => 
          {
            return{
              date: new Date(item[0]).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }),
            prices: item[1],
              prices: item[1],
            }
          }
        ) 
        setData(convertedData);
        console.log("convertedData", convertedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData(coinId);
  }, [coinId]);
  // copy address
  const copyAddress = () => {
    const copyText = document.getElementById("myInput")

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
};
const copyAddressShare = () => {
  const copyText = document.getElementById("myWeb")
  copyText.select();
  navigator.clipboard.writeText(copyText.value);
  
};
  const handleMouseDown = (event) => {
    setShowCheck(true); 
    setTimeout(() => {
      setShowCheck(false);
    }, 700);
  };
  const handleMouseDownShare = (event) => {
    setShowCheckShare(true); 
    setTimeout(() => {
      setShowCheckShare(false);
    }, 700);
  };

  // share on twitter
  const shareOnTwitter = () => {
    const url = 'https://www.youtube.com/watch?v=n0WuQoexCjI&t=24s';
    const text = `This is a post check out the historical data for ${coinId.toUpperCase()} love you!`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
  };
  const handleOpenShare = () => {
    setOpenShare(!openShare)
  }
  // close model
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${Style.chart_network_share}`) && !event.target.closest(`.${Style.chart_network_share_active}`)) {
        setOpenShare(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className={Style.chart}>
      <div className={Style.chart_box}>
        <div className={Style.chart_title_left}>
        <div>Explore<MdChevronRight/></div>
        <div>Tokens<MdChevronRight/></div>
        <div>{coinId.charAt(0).toUpperCase() + coinId.slice(1).toLowerCase()}</div>
        <div>&nbsp;
          <div className={StyleWallet.Model_box_head_address}> 
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
        </div>
        </div>
      <div className={Style.chart_title}>
      <div className={Style.chart_title_left_left}>
        <div>{coinId.toUpperCase()}</div>
        <div>&nbsp;{coinId.toUpperCase()}</div>
      </div>
        <div className={Style.chart_title_right}>
          <div className={Style.chart_network}><a target='_blank' href="https://etherscan.io/"><BiQrScan className={Style.chart_network_icon}/><span className={Style.tooltip}>Explore</span></a></div>
          <div className={Style.chart_network}><a target='_blank' href="https://etherscan.io/"><SiGoogleearth className={Style.chart_network_icon}/><span className={Style.tooltip}>Website</span></a></div>
          <div className={Style.chart_network}><a target='_blank' href="https://etherscan.io/"><FaXTwitter className={Style.chart_network_icon}/><span className={Style.tooltip}>Twitter</span></a></div>
          <div className={`${ openShare ? Style.chart_network_share_active : Style.chart_network}`}
          onClick={handleOpenShare}><FaShare className={Style.chart_network_icon}/>
          {hovering && <span className={Style.tooltip}>Share</span>}
            {
              openShare && 
              <div className={Style.chart_network_share} onClick={e => e.stopPropagation()}
              onMouseEnter={() => setHovering(false)}
              onMouseLeave={() => setHovering(true)}
              >
              <span onClick={() => copyAddressShare()}
                  onMouseDown={handleMouseDownShare}>
                <input type="text" 
                    hidden
                    value={addressMyWeb}
                    id='myWeb'
                />
                {showCheckShare ? <FaRegCheckCircle className={StyleWallet.Model_box_head_address_check}/>
                  : <FiCopy className={StyleWallet.Model_box_head_address_icon}
                  /> 
                }
                  Copy link         
              </span>
              <span onClick={shareOnTwitter}><FaXTwitter/> Share to Twitter</span>
            </div>
            }
          </div>
        </div>
      </div>
      <ChartComponent data = {data}/>
      <div className={Style.chart_box_day_box}>
            <div className={Style.chart_box_day_left}>
              <div onClick={() => onHandleADay()} className={`${activeDay === 1 ? Style.activeDay : ""}`}>1D</div>
              <div onClick={() => onHandle1Week()} className={`${activeDay === 2 ? Style.activeDay : ""}`}>1W</div>
              <div onClick={() => onHandle1Month()} className={`${activeDay === 3 ? Style.activeDay : ""}`}>1M</div>
              <div onClick={() => onHandle1Year()} className={`${activeDay === 5 ? Style.activeDay : ""}`}>1Y</div>
              <div onClick={() => onHandle1All()} className={`${activeDay === 4 ? Style.activeDay : ""}`}>All</div>
            </div>
            <div className={Style.chart_box_day_right}>
              {pricecheck && 
              <div className={Style.chart_box_day_right_analyst} onClick={() => handleclickanalyst()}>
                <div className={Style.chart_box_day_right_analyst_title}>
                  {lineChart ? <><MdOutlineShowChart/></> : <FaChartSimple/> }
                  {changechart ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                </div>
                {changechart &&
                <div className={Style.chart_box_day_right_changechart}>
                    <div onClick={() => handlelineChart()}><MdOutlineShowChart/>Linechart <span>{lineChart && <FaCheck className={Style.chart_box_day_right_changechart_icon}/>}</span></div>
                    <div onClick={() => handlecandlestick()}><FaChartSimple/>Candlestick <span>{candlestick && <FaCheck className={Style.chart_box_day_right_changechart_icon}/>}</span></div>
                </div>  
                }
              </div>}
              <div className={Style.chart_box_day_right_price} onClick={() => handleclickprice()}>
                <div>
                  {pricecheck ? 'Prices' : volumecheck ? 'Volume' : tvlcheck ? 'Tvl' : "Price"} {changePrice ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                </div>
                {changePrice &&
                  <div className={Style.chart_box_day_right_price_item}>
                      <div onClick={handlePriceCheck}>Price {pricecheck &&<FaCheck className={Style.chart_box_day_right_changechart_icon}/>}</div>
                      <div onClick={handleVolumeCheck}>Volume {volumecheck && <FaCheck className={Style.chart_box_day_right_changechart_icon}/>}</div>
                      <div onClick={handleTvlCheck}>TVL {tvlcheck &&<FaCheck className={Style.chart_box_day_right_changechart_icon}/>}</div>
                  </div>  
                }
              </div>
            </div>
      </div>
      <div className={Style.chart_box_market_price}>
          <div className={Style.chart_box_market_price_title}>Stats</div>
          <div className={Style.chart_box_market_price_box}>
            <div>x</div>
            <div>x</div>
            <div>x</div>
            <div>x</div>
          </div>
      </div>
      </div>
    </div>
  );
};

export default Chart;
