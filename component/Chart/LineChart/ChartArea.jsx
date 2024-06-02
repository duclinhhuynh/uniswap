import React from 'react'
import {LineChart, Line, BarChart, Bar ,AreaChart,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';
const ChartArea = ({ data }) => {
  if (!data || data.length === 0) return <div>Loading Chart...</div>;
  return (
    <>
      <AreaChart width={600} height={400} data={data}>
        <CartesianGrid stroke=""/>
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]}hide/>
        <Legend />
        <Tooltip content={<CustomTooltip/>} cursor={true} wrapperStyle={{ outline: 'none' }}/>
        <Area fillOpacity={1} type="monotone" dataKey="TokenV3" stroke="#677de6" strokeWidth={2}  dot={false} fill="#b2bef5"  curve="monotoneX"/>
        <Area fillOpacity={1} type="monotone" dataKey="TokenV2" stroke="#fea8ff" strokeWidth={2} dot={false} fill="#ffefff"  curve="monotoneX"/>
      </AreaChart>
    </>
  );
};

export default ChartArea