import React, {useState, useContext, useEffect} from 'react'

// INTERNAL IMPORT 
import HeroSection from './component/HeroSection/HeroSection'
import Defi from './component/Defi/Defi'
import Title from './component/Title/Title'
import Footer from './component/Footer/Footer'
const index = () => {
  return (
    <div>
      <HeroSection accounts = "key" tokenData = "Data"/>
      <Defi/>
      <Footer/>
    </div>
  )
}

export default index
