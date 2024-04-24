import React from 'react'
import Image from 'next/image';

//INTERNAL IMPORT
import Style from './Search.module.css'
import images from '../../../../assets'
// REACT ICON 
import { BsClock } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
const Search = () => {
  return (
    <div className={Style.Search}>
      <div className={Style.Search_box}>
          <div className={Style.Search_box_search}>
              <div className={Style.Search_box_search_img}>
                  <CiSearch className={Style.Search_box_search_img_search}/>
              </div>
              <div className={Style.Search_box_search_input}>
                <input type="text" placeholder="Search "></input>
              </div>
          </div>
          {/* recent  */}
          <div className={Style.Search_box_recent_search}>
            <div className={Style.Search_box_recent_search_title}>
              <BsClock/> Recent searches
            </div>
            <div className={Style.Search_box_recent_search_item}>
              <div className={Style.Search_box_recent_search_item_box}>
                <div className={Style.Search_box_recent_search_item_img}>
                  <Image src={images.popular} className={Style.Search_box_recent_search_item_img_img}/>
                </div>
                <div className={Style.Search_box_recent_search_item_role}>
                  <div className={Style.Search_box_recent_search_item_role_name}>linh1862002gmail.com <FaCheckCircle/></div>
                  <div className={Style.Search_box_recent_search_item_role_storage}>9,2342 items</div>
                </div>
              </div>
              <div className={Style.Search_box_recent_search_item_price}>
                <div className={Style.Search_box_recent_search_item_price_token}>0.004 ETH</div>
                <div className={Style.Search_box_recent_search_item_price_floor}>Floor</div>
              </div>
            </div>
          </div>
          <div className={Style.Search_box_popularToken}>
            <div className={Style.Search_box_popularToken_title}><IoIosTrendingUp/>Popular tokens</div>
            <div className={Style.Search_box_recent_search_item}>
              <div className={Style.Search_box_recent_search_item_box}>
                <div className={Style.Search_box_recent_search_item_img}>
                  <Image src={images.eth} className={Style.Search_box_recent_search_item_img_img}/>
                </div>
                <div className={Style.Search_box_recent_search_item_role}>
                  <div className={Style.Search_box_recent_search_item_role_name}>Etherrum</div>
                  <div className={Style.Search_box_recent_search_item_role_storage}>ETH</div>
                </div>
              </div>
              <div className={Style.Search_box_recent_search_item_price}>
                <div className={Style.Search_box_recent_search_item_price_token}>$3,123,34</div>
                <div className={Style.Search_box_recent_search_item_price_floor}><FaCaretDown/> 1.17%</div>
              </div>
            </div>
            <div className={Style.Search_box_recent_search_item}>
              <div className={Style.Search_box_recent_search_item_box}>
                <div className={Style.Search_box_recent_search_item_img}>
                  <Image src={images.usdc} className={Style.Search_box_recent_search_item_img_img}/>
                </div>
                <div className={Style.Search_box_recent_search_item_role}>
                  <div className={Style.Search_box_recent_search_item_role_name}>USDCoin</div>
                  <div className={Style.Search_box_recent_search_item_role_storage}>USDC</div>
                </div>
              </div>
              <div className={Style.Search_box_recent_search_item_price}>
                <div className={Style.Search_box_recent_search_item_price_token}>$1.00</div>
                <div className={Style.Search_box_recent_search_item_price_floor}><FaCaretDown/> 1.17%</div>
              </div>
            </div>
            <div className={Style.Search_box_recent_search_item}>
              <div className={Style.Search_box_recent_search_item_box}>
                <div className={Style.Search_box_recent_search_item_img}>
                  <Image src={images.usdt} className={Style.Search_box_recent_search_item_img_img}/>
                </div>
                <div className={Style.Search_box_recent_search_item_role}>
                  <div className={Style.Search_box_recent_search_item_role_name}>Tether USD</div>
                  <div className={Style.Search_box_recent_search_item_role_storage}>USDT</div>
                </div>
              </div>
              <div className={Style.Search_box_recent_search_item_price}>
                <div className={Style.Search_box_recent_search_item_price_token}>$1.00</div>
                <div className={Style.Search_box_recent_search_item_price_floor}><FaCaretDown/> 1.17%</div>
              </div>
            </div>
          </div>
          <div className={Style.Search_box_popularCollection}>
            <div className={Style.Search_box_popularToken_title}><IoIosTrendingUp/>Popular NFT collections</div>
            <div className={Style.Search_box_recent_search_item}>
              <div className={Style.Search_box_recent_search_item_box}>
                <div className={Style.Search_box_recent_search_item_img}>
                  <Image src={images.eth} className={Style.Search_box_recent_search_item_img_img}/>
                </div>
                <div className={Style.Search_box_recent_search_item_role}>
                  <div className={Style.Search_box_recent_search_item_role_name}>Pudgy Penguins <FaCheckCircle/></div>
                  <div className={Style.Search_box_recent_search_item_role_storage}>ETH</div>
                </div>
              </div>
              <div className={Style.Search_box_recent_search_item_price}>
                <div className={Style.Search_box_recent_search_item_price_token}>11.5 ETH</div>
                <div className={Style.Search_box_recent_search_item_price_floor}>Floor</div>
              </div>
            </div>
            <div className={Style.Search_box_recent_search_item}>
              <div className={Style.Search_box_recent_search_item_box}>
                <div className={Style.Search_box_recent_search_item_img}>
                  <Image src={images.popular} className={Style.Search_box_recent_search_item_img_img}/>
                </div>
                <div className={Style.Search_box_recent_search_item_role}>
                  <div className={Style.Search_box_recent_search_item_role_name}>linh1862002gmail <FaCheckCircle/></div>
                  <div className={Style.Search_box_recent_search_item_role_storage}>USDC</div>
                </div>
              </div>
              <div className={Style.Search_box_recent_search_item_price}>
                <div className={Style.Search_box_recent_search_item_price_token}>0.635 ETH</div>
                <div className={Style.Search_box_recent_search_item_price_floor}>Floor</div>
              </div>
            </div>
            
          </div>
      </div>
    </div>
  )
}

export default Search