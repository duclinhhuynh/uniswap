import React, {useState, useContext, useEffect} from 'react'

// INTERNAL IMPORT 
import HeroSection from './component/HeroSection/HeroSection'
import Defi from './component/Defi/Defi'
import Title from './component/Title/Title'
const index = () => {
  return (
    <div>
      <HeroSection accounts = "key" tokenData = "Data"/>
      <Defi/>
    </div>
  )
}

export default index
