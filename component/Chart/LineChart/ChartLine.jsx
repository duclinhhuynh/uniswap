import React from 'react'
import {LineChart, Line, BarChart, Bar ,AreaChart,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';

const ChartLine = ({ data }) => {
  if (!data || data.length === 0) return <div>Loading Chart...</div>;
  return (
    <>
      <LineChart width={200} height={200} data={data}>
        <CartesianGrid stroke=""/>
        <XAxis dataKey="date"hide/>
        <YAxis domain={["auto", "auto"]} hide/>
        <Legend />
        <Line type="monotone" dataKey="prices" stroke="#677de6" strokeWidth={2}  dot={false} fill="#b2bef5"  curve="monotoneX"/>
      </LineChart>
    </>
  );
};

export default ChartLine