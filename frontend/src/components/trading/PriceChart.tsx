import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface PriceChartProps {
  symbol: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ symbol }) => {
  const data = [
    { time: '09:30', price: 174.20, volume: 120000 },
    { time: '10:00', price: 174.80, volume: 145000 },
    { time: '10:30', price: 175.10, volume: 132000 },
    { time: '11:00', price: 175.50, volume: 158000 },
    { time: '11:30', price: 175.30, volume: 141000 },
    { time: '12:00', price: 175.45, volume: 167000 },
    { time: '12:30', price: 175.60, volume: 153000 },
    { time: '13:00', price: 175.40, volume: 149000 },
    { time: '13:30', price: 175.50, volume: 162000 },
  ];

  const isPositive = data[data.length - 1].price > data[0].price;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {symbol}
          </h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${data[data.length - 1].price.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-lg font-semibold ${isPositive ? 'text-success-600' : 'text-danger-600'}`}>
            {isPositive ? '+' : ''}{(data[data.length - 1].price - data[0].price).toFixed(2)}
          </p>
          <p className={`text-sm ${isPositive ? 'text-success-600' : 'text-danger-600'}`}>
            {isPositive ? '+' : ''}{(((data[data.length - 1].price - data[0].price) / data[0].price) * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="time" 
            stroke="#9ca3af"
            fontSize={12}
          />
          <YAxis 
            stroke="#9ca3af"
            fontSize={12}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "#22c55e" : "#ef4444"}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">24h High</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            ${Math.max(...data.map(d => d.price)).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">24h Low</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            ${Math.min(...data.map(d => d.price)).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">24h Volume</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {(data.reduce((sum, d) => sum + d.volume, 0) / 1000).toFixed(0)}K
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
