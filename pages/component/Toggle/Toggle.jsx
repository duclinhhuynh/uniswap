import React, {useState, useEffect} from 'react'

//INTERNAL IMPORT 
import Style from './Toggle.module.css'

// REACT ICON 
import { AiFillThunderbolt } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";
const Toggle = ({setOpenSetting}) => {
    const [showValue, setShowValue] = useState(false);
    const [showMinutes, setShowMinutes] = useState(false);

    const toggleValue = () => {
        if(!showValue){
            setShowValue(true);
        }
        else{
            setShowValue(false)
        }
    };
    const toggleMinutes = () => {
        if(!showMinutes){
            setShowMinutes(true);
        }
        else{
            setShowMinutes(false)
        }
    };
  return (
    <div className={Style.Toggle}>
        <div className={Style.Toggle_head}>
            <div className={Style.Toggle_head_title}><AiFillThunderbolt/>UniswapX</div>
            <div className={Style.Toggle_head_content}>
                <p className={Style.Toggle_head_content_para}>When available, aggregates<br/> 
                liquidity sources for better<br/>  
                prices and gas free swaps.<br/>
                <a href="#" className={Style.Toggle_head_content_para_detail}>Learn more</a></p>
                <div className={Style.Toggle_head_content_switch}>
                    <label className={Style.Switch}>
                        <input type="checkbox"/>
                        <span className={Style.Slider}></span>
                    </label>
                </div>
            </div>
        </div>
        <div className={Style.Toggle_body}>
            <div className={Style.Toggle_body_slippage}>
                <div className={Style.Toggle_body_slippage_title}>Max, slippage &nbsp;<RxQuestionMarkCircled/></div>
                <div className={Style.Toggle_body_slippage_value} onClick={toggleValue}>Auto {showValue ? <IoIosArrowUp/> : <IoIosArrowDown/>}</div>
            </div>
           {showValue && 
           ( <div className={Style.Toggle_body_slippage_value_row}>
                <div className={Style.Toggle_body_slippage_value_name}>
                    <div>Auto</div>
                    <div>Custom</div>
                </div>
                <div className={Style.Toggle_body_slippage_value_input}>
                    <input type= 'number' step="0.5" placeholder="0.5" max="10" />
                    <div>%</div>
                </div>
            </div>
           )}
            <div className={Style.Toggle_body_slippage}>
                <div className={Style.Toggle_body_slippage_title}>Transaction deadline &nbsp;<RxQuestionMarkCircled/></div>
                <div className={Style.Toggle_body_slippage_value} onClick={toggleMinutes}>10m {showMinutes ? <IoIosArrowUp/> : <IoIosArrowDown/>}</div>
            </div>
            {showMinutes && (
            <div className={Style.Toggle_body_slippage_value_row}>
                <div className={Style.Toggle_body_slippage_value_input}>
                    <input type='number' placeholder='10'/>
                    <div>minutes</div>
                </div>
            </div>  
            )}
        </div>
    </div>
  )
}

export default Toggle