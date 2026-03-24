import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Coins, BarChart2, AlertCircle, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface MarketData {
  totalVolume: string;
  totalTrades: number;
  activeTokens: number;
  averagePrice: number;
  lastUpdated: string;
}

const MarketSnapshot: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<{ marketData: MarketData }>('/market/data');
      setMarketData(data.marketData);
    } catch (err) {
      setError('Unable to load market data. Please check that the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Market Snapshot
        </h2>
        <div className="flex items-center justify-center py-10 text-gray-500 dark:text-gray-400">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          Loading market data…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Market Snapshot
        </h2>
        <div className="flex items-center gap-2 rounded-lg bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 p-4 text-danger-700 dark:text-danger-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
        <button
          onClick={fetchMarketData}
          className="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry
        </button>
      </div>
    );
  }

  if (!marketData) return null;

  const formattedDate = new Date(marketData.lastUpdated).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const items = [
    {
      label: 'Active Tokens',
      value: formatNumber(marketData.activeTokens),
      icon: Coins,
      color: 'text-primary-600 dark:text-primary-400',
      bg: 'bg-primary-100 dark:bg-primary-900/30',
    },
    {
      label: 'Total Trades',
      value: formatNumber(marketData.totalTrades),
      icon: BarChart2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      label: 'Total Volume',
      value: formatCurrency(Number(marketData.totalVolume), 0),
      icon: Activity,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-900/30',
    },
    {
      label: 'Avg Price',
      value: formatCurrency(marketData.averagePrice),
      icon: Activity,
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-100 dark:bg-violet-900/30',
    },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Market Snapshot
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Last updated: {formattedDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3"
            >
              <div className={`p-2 rounded-lg ${item.bg}`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketSnapshot;
