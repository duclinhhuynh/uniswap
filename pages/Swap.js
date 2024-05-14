import React, {useState, useContext, useEffect} from 'react'

// INTERNAL IMPORT 
import {HeroSection, Defi, Trust, Connect, Footer} from '../component/index';
import {SwapTokenContext} from '../context/SwapTokenContext';

const Swap = () => {
  const {fetchingData} = useContext(SwapTokenContext)
  return (
    <div>
      <HeroSection accounts = "key" tokenData = "Data"/>
    </div>
  )
}

export default Swap