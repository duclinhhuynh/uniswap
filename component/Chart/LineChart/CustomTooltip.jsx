import React from 'react'
import {LineChart, Line, BarChart, Bar ,AreaChart,Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ payload, label, active, currency = "USD" }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" 
        style={{display: 'flex', flexDirection:"column", alignItems: 'center', backgroundColor: "white", opacity:'.7', borderRadius: "2rem", padding:'0 0.5rem'}}>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{color:entry.color, fontWeight:'800', fontSize: '16px' }}>
              {`${entry.name} : ${ new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: currency,
                  minimumFractionDigits: 2,
                }).format(entry.value)
              }`}
            </p>
          ))}
          <p className="label" style={{color: '#4c82fb'}}>{label}</p>
        </div>
      );
    }
  
    return null;
  };

export default CustomTooltip