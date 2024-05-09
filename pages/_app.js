import React from 'react';
import '../styles/globals.css'; 
import Navbar from '../component/Navbar/Navbar.jsx';
import { SwapTokenContextProvider } from '../context/SwapTokenContext';

const App = ({ Component, pageProps }) => (
  <div>
    <SwapTokenContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </SwapTokenContextProvider>
  </div>
);

export default App;
