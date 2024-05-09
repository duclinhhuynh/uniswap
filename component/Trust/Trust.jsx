import React from 'react'
import Style from './Trust.module.css'
// react icon
import { FaCircleArrowRight } from "react-icons/fa6";

const Trust = () => {
  return (
    <div className={Style.Trust}>
        <div className={Style.Trust_box}>
            <div className={Style.Trust_box_left}>
            <div className={Style.Trust_box_left_title}>Trusted by millions</div>
                <div className={Style.Trust_box_left_des}>
                    <p>Uniswap products are powered by the Uniswap Protocol. The<br/>protocol is the largest onchain marketplace, with billions of<br/> dollars in weekly volume across thousands of tokens on<br/> Ethereum and 7+ additional chains.</p>
                    <button>Learn more &nbsp;<FaCircleArrowRight/></button>
                </div>
            </div>
            <div className={Style.Trust_box_right}>
                    <div className={Style.Trust_box_right_all_item}>
                        <h3>All time volume</h3>
                        <div>$2.0T</div>
                    </div>
                    <div className={Style.Trust_box_right_all_item}>
                        <h3>All time swappers</h3>
                        <div>$16.6M</div>
                    </div>
                    <div className={Style.Trust_box_right_all_item}>
                        <h3>All time LP fees</h3>
                        <div>$3.4B</div>
                    </div>
                    <div className={Style.Trust_box_right_all_item}>
                        <h3>24H volume</h3>
                        <div>$1.5B</div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Trust