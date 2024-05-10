import React, {useState} from 'react'
import Image from 'next/image'

//INTERNAL IMPORT
import Style from '../Model.module.css';
import StyleSetting from './Setting.module.css';

//REACT ICON IMPORT 
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaAnglesRight, FaSleigh } from "react-icons/fa6";
import { GoSun } from "react-icons/go";
import { CiDark } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import Model from '../Model';
const Setting = ({setOpenSetting, setOpenModel, openSeting}) => {
    const [activeBtn, setActiveBtn] = useState(1);
    const [Auto, setAuto] = useState(true);
    const [Light, setLight] = useState(false);
    const [Dark, setDark] = useState(false);
    const closeSetting = (event) => {
      event.stopPropagation(); // Ngăn chặn sự kiện click từ lan ra phần tử cha
      setOpenSetting(false); // Đóng modal setting
    };
    const openAuto = () => {
        if(!Auto){
          setAuto(true)
          setLight(false)
          setDark(false)
          setActiveBtn(1)
        }
      };
      const openLight = () => {
        if(!Light){
          setLight(true)
          setAuto(false)
          setDark(false)
          setActiveBtn(2)
        }
      };
      const openDark = () => {
        if(!Dark){
          setDark(true)
          setLight(false)
          setAuto(false)
          setActiveBtn(3)
        }
      };
  return (
    <div className={Style.Model}>
      <div className={Style.Model_close} onClick={() => setOpenModel(false)}><FaAnglesRight/></div>
      <div className={Style.Model_box}>
        <div className={StyleSetting.Setting_box_heading}>
          <div className={StyleSetting.Setting_box_heading_img}>
            <HiOutlineArrowLeft className={StyleSetting.Setting_box_heading_img_icon} onClick={closeSetting}/>
          </div>
          <p className={StyleSetting.Setting_box_heading_title}>Setting</p>
        </div>
        <div className={StyleSetting.Setting_box_body}>
            <p className={StyleSetting.Setting_box_body_title}>
            Preferences
            </p>
            <div className={StyleSetting.Setting_box_body_theme}>
                <p className={StyleSetting.Setting_box_body_theme_name}>
                    theme
                </p>
                <div className={StyleSetting.Setting_box_body_theme_value}>
                    <p onClick={()=> openAuto()} className={`${activeBtn === 1 ? StyleSetting.active : ""}`}>Auto</p>
                    <GoSun onClick={()=> openLight()} className={`${activeBtn === 2 ? StyleSetting.active : ""}`}/>
                    <CiDark onClick={()=> openDark()} className={`${activeBtn === 3 ? StyleSetting.active : ""}`}/>
                </div>
            </div>
            <div className={StyleSetting.Setting_box_body_balance}>
                <p className={StyleSetting.Setting_box_body_balance_title}>Hide small balances</p>
                <label className={StyleSetting.Switch}>
                    <input type="checkbox"/>
                    <span className={StyleSetting.Slider}></span>
                </label>
            </div>
            <div className={StyleSetting.Setting_box_body_unknown}>
                <p className={StyleSetting.Setting_box_body_unknown_title}>Hide unknown tokens & NFTs</p>
                <label className={StyleSetting.Switch}>
                    <input type="checkbox"/>
                    <span className={StyleSetting.Slider}></span>
                </label>
            </div>

            <div className={StyleSetting.Setting_box_body_analytic}>
                <div className={StyleSetting.Setting_box_body_analytic_box}>
                    <p className={StyleSetting.Setting_box_body_unknown_title}>Allow analytics</p>
                    <p className={StyleSetting.Setting_box_body_unknown_content}>We use anonymized data to <br/> enhance your experience with <br/> Uniswap Labs products.</p>
                </div>
                <label className={StyleSetting.Switch}>
                    <input type="checkbox"/>
                    <span className={StyleSetting.Slider}></span>
                </label>
            </div>

            <div className={StyleSetting.Setting_box_body_testnet}>
                <p className={StyleSetting.Setting_box_body_testnet_title}>Show testnets</p>
                <label className={StyleSetting.Switch}>
                    <input type="checkbox"/>
                    <span className={StyleSetting.Slider}></span>
                </label>
            </div>

            <div className={StyleSetting.Setting_box_body_language}>
                <p className={StyleSetting.Setting_box_body_testnet_title}>Language</p>
                <p className={StyleSetting.Setting_box_body_language_value}>English <small><FaChevronRight/> </small></p>
            </div>

            <div className={StyleSetting.Setting_box_body_language}>
                <p className={StyleSetting.Setting_box_body_testnet_title}>Currency</p>
                <p className={StyleSetting.Setting_box_body_language_value}>USD<small><FaChevronRight/> </small></p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Setting