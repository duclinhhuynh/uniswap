import React, {useState,useContext} from 'react'
import Style from './Liquidity.module.css'
import Image from 'next/image';
// react icon
import { IoMdSettings } from "react-icons/io";
import { LuArrowLeft } from "react-icons/lu";
import { IoWarning } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

// image
import img from "../../assets"
// CONTEXT 
import { SwapTokenContext} from '../../context/SwapTokenContext';

import  SearchToken  from '../SearchToken/SearchToken';
const Liquidity = () => {
const {singleSwapToken, connectWallet, currentAccount, ether, dai} = useContext(SwapTokenContext);
const [openToken, setOpenToken] = useState(false);
const [edit, setEdit] = useState(true);
const [active, setActive] = useState(3);
const [fee1, setFee1] = useState(false);
const [fee2, setFee2] = useState(false);
const [fee3, setFee3] = useState(true);
const [fee4, setFee4] = useState(false);
const [fee,setFee] = useState(0.30);
const [select,setSelect] = useState(71);
const [activeBtn, setActiveBtn] = useState(1);
const [openbtnA, setopenbtnA] = useState(true);
const [openbtnB, setopenbtnB] = useState(false);

const onHandleActiveBtnA = () => {
    setActiveBtn(1);
    setopenbtnA(true);
    setopenbtnB(false)
}

const onHandleActiveBtnB = () => {
    setopenbtnA(false);
    setopenbtnB(true);
    setActiveBtn(2);
}

const onHandleEdit = () => {
    setEdit(!edit);
}
const handleFee1 = () => {
    setFee1(true);
    setFee2(false);
    setFee3(false);
    setFee4(false);
    setActive(1);
    setFee(0.01);
    setSelect(0);
}
const handleFee2 = () => {
    setFee1(false);
    setFee2(true);
    setFee3(false);
    setFee4(false);
    setActive(2);
    setFee(0.05);
    setSelect(28);
}
const handleFee3 = () => {
    setFee1(false);
    setFee2(false);
    setFee3(true);
    setFee4(false);
    setActive(3);
    setFee(0.03);
    setSelect(71);
}
const handleFee4 = () => {
    setFee1(false);
    setFee2(false);
    setFee3(false);
    setFee4(true);
    setActive(4);
    setFee(1.00);
    setSelect(0);
}

  return (
    <div className={Style.Liquidity}>
        <div className={Style.Liquidity_box}>
            <div className={Style.Liquidity_box_title}>
                <LuArrowLeft className={Style.Liquidity_box_title_left}/>
                <p>Add Liquidity</p>
                <IoMdSettings className={Style.Liquidity_box_title_setting}/>
            </div>
            <div className={Style.Liquidity_box_body}>
                <div className={Style.Liquidity_box_body_box}>
                    <div className={Style.Liquidity_box_body_box_warning}>
                        <div className={Style.Liquidity_box_body_box_warning_img}>
                            <IoWarning className={Style.Liquidity_box_body_box_warning_img_icon}/>
                        </div>
                        <div></div>
                        <div className={Style.Liquidity_box_body_box_warning_des}>
                            <p>Pool out of sync</p>
                            <p>This pool is out of sync with market prices. Adding liquidity at the suggested ratios may result in loss of funds.</p>
                            <a href="">Learn more</a>
                        </div>
                    </div>
                        <div className={Style.Liquidity_box_body_box_select_title}>Select pair</div>
                    <div className={Style.Liquidity_box_body_box_select}>
                        <div className={Style.Liquidity_box_body_box_select_token}>
                            <div className={Style.Liquidity_box_body_box_select_token_A}>
                                <button onClick={() => setOpenToken(true)}>
                                    <span><Image src={img.eth} width={20} height={20} 
                                        className={Style.Liquidity_box_body_box_select_token_A_img}/>
                                        <div className={Style.Liquidity_box_body_box_select_token_A_name}>ETH</div>
                                        <FaChevronDown className={Style.Liquidity_box_body_box_select_token_A_icon}/>
                                    </span>
                                </button>
                            </div>
                            <div className={Style.Liquidity_box_body_box_select_token_B}>
                                <button onClick={() => setOpenToken(true)}>
                                    <span><Image src={img.dai} width={20} height={20} 
                                        className={Style.Liquidity_box_body_box_select_token_A_img}/>
                                        <div className={Style.Liquidity_box_body_box_select_token_B_name}>DAI</div>
                                        <FaChevronDown className={Style.Liquidity_box_body_box_select_token_B_icon}/>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {openToken && (
                        <SearchToken 
                        setOpenToken = {setOpenToken}
                        // tokens = {setTokenOne}
                        // tokenData = {tokenData}
                        openToken={openToken}
                        />
                    )}
                    <div className={Style.Liquidity_box_body_box_fee}>
                        <div className={Style.Liquidity_box_body_box_fee_tier}>
                            <div>{fee}% fee tier</div>
                            <div>{select}% select</div>
                        </div>
                        <button className={Style.Liquidity_box_body_box_fee_tier_edit} onClick={() => onHandleEdit()}>
                            {edit ? "Hide" :"Edit"}
                        </button>
                    </div>
                    {edit ? 
                    <div className={Style.Liquidity_box_body_box_fee_selector}>
                        <div onClick = {() => handleFee1()} className={`${active === 1 ? Style.active : Style.Liquidity_box_body_box_fee_selector_item}`}><span className={Style.Liquidity_box_body_box_fee_selector_item_fee}>0.01% {fee1 && <FaCheckCircle className={Style.fee_icon_check}/>}</span><p className={Style.Liquidity_box_body_box_fee_selector_item_para}>Best for very stable pairs.</p><span className={Style.Liquidity_box_body_box_fee_selector_item_select}>0% select</span></div>
                        <div onClick = {() => handleFee2()} className={`${active === 2 ? Style.active : Style.Liquidity_box_body_box_fee_selector_item}`}><span className={Style.Liquidity_box_body_box_fee_selector_item_fee}>0.05% {fee2 && <FaCheckCircle className={Style.fee_icon_check}/>}</span><p className={Style.Liquidity_box_body_box_fee_selector_item_para}>Best for stable pairs.</p><span className={Style.Liquidity_box_body_box_fee_selector_item_select}>28% select</span></div>
                        <div onClick = {() => handleFee3()} className={`${active === 3 ? Style.active : Style.Liquidity_box_body_box_fee_selector_item}`}><span className={Style.Liquidity_box_body_box_fee_selector_item_fee}>0.30% {fee3 && <FaCheckCircle className={Style.fee_icon_check}/>}</span><p className={Style.Liquidity_box_body_box_fee_selector_item_para}>Best for most pairs.</p><span className={Style.Liquidity_box_body_box_fee_selector_item_select}>71% select</span></div>
                        <div onClick = {() => handleFee4()} className={`${active === 4 ? Style.active : Style.Liquidity_box_body_box_fee_selector_item}`}><span className={Style.Liquidity_box_body_box_fee_selector_item_fee}>1.00% {fee4 && <FaCheckCircle className={Style.fee_icon_check}/>}</span><p className={Style.Liquidity_box_body_box_fee_selector_item_para}>Best for exotic pairs.</p><span className={Style.Liquidity_box_body_box_fee_selector_item_select}>0% select</span></div>
                    </div>
                    : ""}
                    <div className={Style.Liquidity_box_body_box_price_range}>
                        <div className={Style.Liquidity_box_body_box_price_range_title}>
                            <div className={Style.Liquidity_box_body_box_price_range_title_left}>Set price range</div>
                            <div className={Style.Liquidity_box_body_box_price_range_title_right}>
                                <div className={Style.Liquidity_box_body_box_price_range_title_right_title}>Full range</div>
                                <div className={Style.Liquidity_box_body_box_price_range_title_right_swap}>
                                    <div onClick={() => onHandleActiveBtnA()} className={`${activeBtn === 1 ? Style.activeSwap: ""}`}>DAI</div> 
                                    <div onClick={() => onHandleActiveBtnB()} className={`${activeBtn === 2 ? Style.activeSwap: ""}`}>ETH</div> 
                                </div>
                            </div>
                        </div>
                        <div className={Style.Liquidity_box_body_box_price_range_price}>
                            <div className={Style.Liquidity_box_body_box_price_range_price_up}>
                                <div className={Style.Liquidity_box_body_box_price_range_price_up_left}>
                                    <div>Low price</div>    
                                    <input type="text" placeholder='0'/>
                                    <div>{openbtnA ? "ETH per DAI" : "DAI per ETH" }</div>
                                </div>
                                <div className={Style.Liquidity_box_body_box_price_range_price_up_right}>
                                    <FaPlus className={Style.Liquidity_box_body_box_price_range_price_up_right_plus}/>
                                    <FaMinus className={Style.Liquidity_box_body_box_price_range_price_up_right_minus}/>
                                </div>
                            </div>
                            <div className={Style.Liquidity_box_body_box_price_range_price_down}>
                                <div className={Style.Liquidity_box_body_box_price_range_price_up_left}>
                                    <div>High price</div>    
                                    <input type="text" placeholder='0'/>
                                    <div>{openbtnA ? "ETH per DAI" : "DAI per ETH" }</div>
                                </div>
                                <div className={Style.Liquidity_box_body_box_price_range_price_up_right}>
                                    <FaPlus className={Style.Liquidity_box_body_box_price_range_price_up_right_plus}/>
                                    <FaMinus className={Style.Liquidity_box_body_box_price_range_price_up_right_minus}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Style.Liquidity_box_body_box_deposit}>Deposit amounts</div>
                    <div className={Style.Liquidity_box_body_box_deposit}>
                        <div className={Style.Liquidity_box_body_box_deposit_amount}>
                            <div className={Style.Liquidity_box_body_box_deposit_amount_from}>
                                <div className={Style.HeroSection_box_input}>
                                    <div className={Style.HeroSection_box_input_container}>
                                        <div className={Style.HeroSection_box_input_body}> 
                                        <input inputmode="decimal" autocomplete="off" autocorrect="off" minlength="1"
                                        type="text" pattern="^[0-9]*[.,]?[0-9]*$" maxlength="79" spellCheck="false"  placeholder='0' />
                                        <div className={Style.HeroSection_box_input_body_tokenlist} onClick={() => setOpenToken(true)}>                 
                                            <Image src={img.eth || img.uniswap}
                                                width={20}
                                                height={20}
                                                alt='ether'
                                            />
                                            {
                                                "ETH"
                                            }
                                        </div>
                                        </div>
                                        {currentAccount ? <div className={Style.HeroSection_box_input_container_balance}>Balance: {ether ? ether.slice(0,7) : "0"}</div> 
                                        : <div> </div>}  
                                    </div>
                                </div>
                            </div>
                            <div className={Style.Liquidity_box_body_box_deposit_amount_to}>
                            <div className={Style.HeroSection_box_input}>
                                    <div className={Style.HeroSection_box_input_container}>
                                        <div className={Style.HeroSection_box_input_body}> 
                                        <input inputmode="decimal" autocomplete="off" autocorrect="off" minlength="1"
                                        type="text" pattern="^[0-9]*[.,]?[0-9]*$" maxlength="79" spellCheck="false"  placeholder='0' />
                                        <div className={Style.HeroSection_box_input_body_tokenlist} onClick={() => setOpenToken(true)}>                 
                                            <Image src={img.dai || img.uniswap}
                                                width={20}
                                                height={20}
                                                alt='ether'
                                            />
                                            {
                                                "DAI"
                                            }
                                        </div>
                                        </div>
                                        {currentAccount ? <div className={Style.HeroSection_box_input_container_balance}>Balance: {ether ? ether.slice(0,7) : "0"}</div> 
                                        : <div> </div>}  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Style.Liquidity_box_footer}>
                        <button className={Style.Liquidity_box_footer_enter}>Enter an amount</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Liquidity