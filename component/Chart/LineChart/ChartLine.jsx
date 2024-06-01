import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';

const ChartLine = ({ data }) => {
  if (!data || data.length === 0) return <div>Loading Chart...</div>;

  // Chuyển đổi dữ liệu sang định dạng mong muốn (nếu cần)
  // const transformedData = data.map(item => ({
  //   date: new Date(item[0]).toLocaleDateString(),
  //   prices: item[1]
  // }));

  return (
    <LineChart width={100} height={100} data={data}>
      <CartesianGrid stroke="" />
      <XAxis dataKey="date" hide/>
      <YAxis domain={['auto', 'auto']} hide/>
      <Line 
        type="monotone" 
        dataKey="prices" 
        stroke="#677de6" 
        strokeWidth={2} 
        dot={false} 
        fill="#b2bef5" 
      />
    </LineChart>
  );
};

export default ChartLine;