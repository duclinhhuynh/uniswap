import React, {useContext} from 'react'
import Image from 'next/image'
// INTERNAL IMPORT
import Style from './NetWork.module.css'
import images from '../../assets'

//REACT ICON
import { IoMdCheckmark } from "react-icons/io";

const NetWork = ({isMobile}) => {
  // setIsMobile = useContext(setIsMobile);
  const closeNetWork = () =>  {
    setOpenNetWork(false);
  }
  const isMobileClass = isMobile ? Style.mobile_Network : Style.NetWork;
  const NetWork = [
    {
        img: images.eth,
        name: "Etherum",
        icon: <IoMdCheckmark/>
    },
    {
        img: images.token2,
        name: "Arbitrum"
    },
    {
        img: images.optimism,
        name: "Optimism"
    },
    {
        img: images.polygon,
        name: "Polygon"
    },
    {
        img: images.base,
        name: "Base"
    },
    {
        img: images.bnb,
        name: "Bnb Chain"
    },
    {
      img: images.achema,
      name: "Avalanche"
    },
    {
        img: images.celo,
        name: "Celo"
    },
    {
        img: images.token5,
        name: "Wth"
    },

  ]
  return (
    <div className={`${isMobileClass}`}>
        <div>
          {NetWork.map((el, i) => (
            <div className={Style.NetWork_box_item} key={i + 1}>
              <Image
                  className={Style.NetWork_box_item_img}
                  src={el.img} // Thay thế "example" bằng tên file hình ảnh thích hợp từ assets của bạn
                  alt="Network Image"
                  width={20}
                  height={20}
              />  
              <div className={Style.NetWork_box_item_name}>{el.name}</div>
              <div>{el.icon}</div>
          </div>
          ))}
            
        </div>
    </div>
  )
}

export default NetWork