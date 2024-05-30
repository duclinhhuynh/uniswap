import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { useRouter } from 'next/router';

const LineChart = () => {
  const router = useRouter();
  const [coinId, setCoinId] = useState('');
  const [data, setData] = useState([['Date', 'Price']]);

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
          const dataCopy = [['Date', 'Price']];
          result.prices.forEach(item => {
            // dataCopy.push([new Date(item[0]).toLocaleDateString(), item[1]]);
            const date = new Date(item[0]);
            const formattedDate = `${(date.getDate() + 1).toString().padStart(2, '0')}//${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            dataCopy.push([formattedDate, item[1]]);
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
      <Chart
        chartType="AreaChart"
        width="800px"
        height="400px"
        data={data}
        options={{
          chartArea: {
            width: '80%',
            height: '80%',
          },
          title: coinId.toUpperCase(),
          legend: 'none',
          hAxis: {
            // title: 'Date',
            format: 'dd/mm', 
            gridlines: { count: 10 }
          },
          vAxis: {
            // title: 'Price',
          },
          series: {
            0: { 
              color: '#5a7dd9',
            } // Set the line color to blue
          },
          areaOpacity: 0.3, // Set the opacity of the area below the line
          isStacked: true, // Stack the areas
        }}
      />
    </>
  );
};

export default LineChart;
