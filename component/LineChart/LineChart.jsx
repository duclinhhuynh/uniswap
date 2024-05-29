import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { useRouter } from 'next/router';

const LineChart = () => {
  const router = useRouter();
  const [coinId, setCoinId] = useState('');
  const [data, setData] = useState([['Date', 'prices']]);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setCoinId(id);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const fetchHistoricalData = async (coinId) => {
      if (!coinId) return;
      
      const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-qPA1U4MtwyJnE2WUmBzPhaAv' }
      };

      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10`, options);
        const result = await response.json();
        if (result.prices) {
          const dataCopy = [['Date', 'prices']];
          result.prices.forEach(item => {
            dataCopy.push([new Date(item[0]).toLocaleTimeString(), item[1]]);
          });
          setData(dataCopy);
        }
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData(coinId);
  }, [coinId]);

  return (
    <>
      <h1>Hello: {coinId}</h1>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={{
          title: coinId.toUpperCase(),
        }}
      />
    </>
  );
};

export default LineChart;
