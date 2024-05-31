import React from 'react'
import {LineChart, Line, BarChart, Bar ,AreaChart,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
const ChartBar = ({ data }) => {
  if (!data || data.length === 0) return <div>Loading Chart...</div>;

  return (
    <>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid stroke=""/>
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} hide />
        <Legend />
        <Tooltip content={<CustomTooltip />} cursor={true} wrapperStyle={{ outline: 'none' }} />
        <Bar dataKey="TokenV3" barSize={20} fill="rgb(252 114 255)" />
        <Bar dataKey="TokenV2" barSize={20} fill="#4c82fb" />
      </BarChart>
    </>
  );
};

export default ChartBar