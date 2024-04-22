import React, {useState, useContext, useEffect} from 'react'

// INTERNAL IMPORT 
import HeroSection from './component/HeroSection/HeroSection'
const index = () => {
  return (
    <div>
      <HeroSection accounts = "key" tokenData = "Data"/>
    </div>
  )
}

export default index
