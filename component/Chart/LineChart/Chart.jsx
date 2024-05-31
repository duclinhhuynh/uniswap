import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {LineChart,Line, AreaChart,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Style from './LineChart.module.css'

function CustomTooltip({ payload, label, active, currency = "usd" }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip"  style={{ color: 'green' }}>
        <p className="label">{`${label} : ${
          new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 2,
          }).format(payload[0].value)
        }`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({data}) => {
  return(
      <AreaChart width={800} height={400} data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis dataKey="prices" domain={["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} cursor={true} wrapperStyle={{outline: "none"}}/>
          <Legend />
          <Area type="monotone" dataKey="prices" stroke="#677de6" strokeWidth={2} dot={false} fill="#b2bef5"  curve="monotoneX"/>
      </AreaChart>
  )
};

const Chart = () => {
  const router = useRouter();
  const [coinId, setCoinId] = useState('');
  const [data, setData] = useState([]);

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
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10`, options)
        .then((res) => res.json())
        .then((json) => json);
        console.log("chartData", response);
        
        let convertedData = response.prices.map(item => 
          {
            return{
              date: new Date(item[0]).toLocaleDateString(),
              prices: item[1],
            }
          }
        ) 
        setData(convertedData);
        console.log("convertedData", convertedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData(coinId);
  }, [coinId]);

  return (
    <div className={Style.chart}>
      <ChartComponent data = {data}/>
    </div>
  );
};

export default Chart;
