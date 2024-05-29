import React, {useRef,useState} from 'react';
import Style from './Nfts.module.css';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";

// Example image import
import image from '../../assets'; // Adjust the path to your image

const Nfts = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [activeEth, setActiveEth] = useState(1);
  const [open1day, setOpen1day] = useState(true);
  const [open1week, setOpen1week] = useState(false);
  const [open1month, setOpen1Month] = useState(false);
  const [openAll, setOpenAll] = useState(false);
  const [openToken, setOpenToken] = useState(true);
  const [allTokenList, setAllTokenList] = useState([
    {
      id: 1,
      img: image.slide1,
      name: "Azuki",
      symbol: "ETH",  
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 2,
      img: image.slide5,
      name: "Mutant Ape Yacht club",
      symbol: "USDT",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 3,
      img: image.slide2,
      name: "Milady Maker",
      symbol: "USDC",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 4,
      img: image.slide3,
      name: "Binance coin",
      symbol: "BNB",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 5,
      img: image.slide4,
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
      img: image.slide5,
      name: "Optimism",
      symbol: "OP",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 1,
      img: image.slide1,
      name: "Azuki",
      symbol: "ETH",  
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 2,
      img: image.slide5,
      name: "Mutant Ape Yacht club",
      symbol: "USDT",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 3,
      img: image.slide2,
      name: "Milady Maker",
      symbol: "USDC",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 4,
      img: image.slide3,
      name: "Binance coin",
      symbol: "BNB",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 5,
      img: image.slide4,
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
      img: image.slide5,
      name: "Optimism",
      symbol: "OP",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
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
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 1,
      img: image.slide1,
      name: "Azuki",
      symbol: "ETH",  
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 2,
      img: image.slide5,
      name: "Mutant Ape Yacht club",
      symbol: "USDT",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 3,
      img: image.slide2,
      name: "Milady Maker",
      symbol: "USDC",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 4,
      img: image.slide3,
      name: "Binance coin",
      symbol: "BNB",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
    {
      id: 5,
      img: image.slide4,
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
      img: image.slide5,
      name: "Optimism",
      symbol: "OP",
      price: "$2.999.9",
      hour: "0.67%",
      day: "0.43%",
      fdv: "$9.9B",
      volume: "$708.7M",
      owner: "4.2k",
    },
  ]); 
  const onHandleEth = () => {
    setActiveEth(1);
  }
  const onHandleUsd = () => {
    setActiveEth(2);
  }
  const onHandleADay = () => {
    setActiveDay(1);
    setOpen1day(true);
    setOpen1week(false)
    setOpen1Month(false)
    setOpenAll(false)
  }
  const onHandle1Week = () => {
    setActiveDay(2);
    setOpen1day(false);
    setOpen1week(true)
    setOpen1Month(false)
    setOpenAll(false)
  }
  const onHandle1Month = () => {
    setActiveDay(3);
    setOpen1day(false);
    setOpen1week(false)
    setOpen1Month(true)
    setOpenAll(false)
  }
  const onHandle1All = ()=> {
    setActiveDay(4)
    setOpen1day(false);
    setOpen1week(false)
    setOpen1Month(false)
    setOpenAll(true)
  }
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slidesData = [
    {
      logo: image.achema,
      image: image.slide5,
      title: "Bored Ape Yacht Club",
      platform: "Uniswap",
      imgPlatform: image.uniswap,
      floorPrice: "13.5 ETH Floor",
      listings: "286 Listings",
      marketplace: "Opensea",
      imgketplace: image.opensea,
      price: "1.5M ETH",
      priceOpensea: "423",
      x2y2: "X2Y2",
      imagex2y2: image.x2y2,
      space: "-",
      x2y2Price: "None",
      LooksRate: "Looks Rate",
      imageLookRate: image.lookrare,
      space: "-",
      LooksRatePrice: "None",
    },
    {
      logo: image.optimism,
      image: image.slide4,
      title: "Kazaki",
      platform: "Uniswap",
      imgPlatform: image.uniswap,
      floorPrice: "5.61 ETH Floor",
      listings: "330 Listings",
      marketplace: "Opensea",
      imgketplace: image.opensea,
      price: "5.61 ETH",
      priceOpensea: "330",
      x2y2: "X2Y2",
      imagex2y2: image.x2y2,
      space: "-",
      x2y2Price: "None",
      LooksRate: "Looks Rate",
      imageLookRate: image.lookrare,
      space: "-",
      LooksRatePrice: "None",
    },
    {
      logo: image.opensea,
      image: image.slide2,
      title: "CryptoPunks",
      platform: "Uniswap",
      imgPlatform: image.uniswap,
      floorPrice: "45.0 ETH Floor",
      listings: "125 Listings",
      marketplace: "Opensea",
      imgketplace: image.opensea,
      price: "4.21 ETH",
      priceOpensea: "423",
      x2y2: "X2Y2",
      imagex2y2: image.x2y2,
      space: "-",
      x2y2Price: "None",
      LooksRate: "Looks Rate",
      imageLookRate: image.lookrare,
      space: "-",
      LooksRatePrice: "None",
    },
    {
      logo: image.slide2,
      image: image.slide3,
      title: "Art Blocks",
      platform: "Uniswap",
      imgPlatform: image.uniswap,
      floorPrice: "45.0 ETH Floor",
      listings: "125 Listings",
      marketplace: "Opensea",
      imgketplace: image.opensea,
      price: "4.21 ETH",
      priceOpensea: "423",
      x2y2: "X2Y2",
      imagex2y2: image.x2y2,
      space: "-",
      x2y2Price: "None",
      LooksRate: "Looks Rate",
      imageLookRate: image.lookrare,
      space: "-",
      LooksRatePrice: "None",
    },
  ];

  return (
    <div className={Style.Nfts}>
      <div className={Style.Nfts_box}>
        <div className={Style.Nfts_box_hero}>
          <div className={Style.Nfts_box_hero_left}>
            Better prices.<br />More listings.
          </div>
            <FaChevronLeft onClick={() => sliderRef.current.slickPrev()} className={Style.slideArrowLeft}/>
            <div className={Style.Nfts_box_hero_right}>
                <Slider {...settings} ref={sliderRef}>
                  {slidesData.map((slide, index) => (
                    <div key={index} className={Style.slide}>
                      <div className={Style.slide_box}>
                        <div className={Style.slideImage_logo}>
                          <Image width={600} height={200} src={slide.image} alt={slide.title} className={Style.slideImage}/>
                          <Image height={100} src={slide.logo} className={Style.slideImage_logo_icon}/>
                          <div className={Style.slideImage_logo_title}>{slide.title} <FaCheckCircle className={Style.slideImage_logo_title_icon}/></div>
                        </div>
                      
                        <div className={Style.slideDetails}>
                          <div className={Style.marketplaces}>
                            <div><Image src={slide.imgPlatform} width={20}/>{slide.platform}</div>
                            <div>{slide.floorPrice}</div>
                            <div>{slide.listings}</div>
                            <div><Image src={slide.imgketplace} width={20}/>{slide.marketplace}</div>
                            <div>{slide.price}</div>
                            <div>{slide.priceOpensea}</div>
                            <div><Image src={slide.imagex2y2} width={20}/>{slide.x2y2}</div>
                            <div>{slide.space}</div>
                            <div>{slide.x2y2Price}</div>
                            <div><Image src={slide.imageLookRate} width={20}/>{slide.LooksRate}</div>
                            <div>{slide.space}</div>
                            <div>{slide.LooksRatePrice}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
            </div>
              <FaChevronRight onClick={() => sliderRef.current.slickNext()} className={Style.slideArrowRight}/>
        </div>
        <div className={Style.Nfts_box_body}>
          <div className={Style.Nfts_box_body_title}>Trending NFT collections</div>
          <div className={Style.Nfts_box_body_trending}>
            <div className={Style.Nfts_box_body_trending_left}>
              <div onClick={() => onHandleADay()} className={`${activeDay === 1 ? Style.activeDay : ""}`}>1D</div>
              <div onClick={() => onHandle1Week()} className={`${activeDay === 2 ? Style.activeDay : ""}`}>1W</div>
              <div onClick={() => onHandle1Month()} className={`${activeDay === 3 ? Style.activeDay : ""}`}>1M</div>
              <div onClick={() => onHandle1All()} className={`${activeDay === 4 ? Style.activeDay : ""}`}>All</div>
            </div>
            <div className={Style.Nfts_box_body_trending_right}>
              <div onClick={() => onHandleEth()} className={`${activeEth === 1 ? Style.activeDay : ""}`}>ETH</div>
              <div onClick={() => onHandleUsd()} className={`${activeEth === 2 ? Style.activeDay : ""}`}>USD</div>
            </div>
          </div>
          {openToken 
          ? // Token
            <>
            <div className={Style.Token_box}>
              <div className={Style.Token_head}>
                <div className={Style.Token_head_box}>
                  <div></div>
                  <div>Collection name</div>
                  <div>Floor</div>
                  <div>Floor change</div>
                  <div>Volume</div>
                  <div>Volume change</div>
                  <div><FaArrowDown/>&nbsp;Items</div>
                  <div>Owners</div>
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
                    <div>{el.owner}</div>
                  </div>
                ))}
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
                  <div>{el.owner}</div>
                </div>
              ))}
            </div>
            </>
            : ""
          }
        </div>
      </div>
    </div>
  );
};

export default Nfts;
