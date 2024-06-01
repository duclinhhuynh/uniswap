import React, {useEffect, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CustomTooltip from './CustomTooltip';

const ChartLine = ({ data }) => {
  const [lineColor, setLineColor] = useState('#677de6'); // Màu mặc định

  useEffect(() => {
    if (data && data.length > 0) {
      const firstPrice = data[0].prices;
      const lastPrice = data[data.length - 1].prices;
      const color = firstPrice > lastPrice ? 'red' : 'green';
      setLineColor(color);
    }
  }, [data]);
  if (!data || data.length === 0) return <div>Loading Chart...</div>;

  // Chuyển đổi dữ liệu sang định dạng mong muốn (nếu cần)
  // const transformedData = data.map(item => ({
  //   date: new Date(item[0]).toLocaleDateString(),
  //   prices: item[1]
  // }));

  return (
    <LineChart width={100} height={70} data={data}>
      <CartesianGrid stroke="" />
      <XAxis dataKey="date" hide/>
      <YAxis domain={['auto', 'auto']} hide/>
      <Line 
        type="monotone" 
        dataKey="prices" 
        stroke={lineColor} 
        strokeWidth={1} 
        dot={false} 
        fill="#b2bef5" 
        cursor={true}
      />
    </LineChart>
  );
};

export default ChartLine;