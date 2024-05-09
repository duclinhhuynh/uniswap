import React, {useState, useContext, useEffect} from 'react'

// INTERNAL IMPORT 
import {HeroSection, Defi, Trust, Connect, Footer} from '../component/index';
import {SwapTokenContext} from '../context/SwapTokenContext';

const index = () => {
  const {fetchingData} = useContext(SwapTokenContext)
  // useEffect(() => {
  //   fetchingData();
  // },[])
  return (
    <div>
      <HeroSection accounts = "key" tokenData = "Data"/>
      <Defi/>
      <Trust/>
      <Connect/>
      <Footer/>
    </div>
  )
}

export default index
