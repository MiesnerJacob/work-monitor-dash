import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockData {
  timestamp: string;
  sp500: number;
  nvidia: number;
  btc: number;
}

type StockType = 'sp500' | 'nvidia' | 'btc';

function StocksGraph() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockType>('sp500');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // In a real application, you would fetch data from an API here
        // For this example, we'll generate mock data
        const mockData: StockData[] = Array.from({ length: 20 }, (_, i) => ({
          timestamp: new Date(Date.now() - (19 - i) * 60000).toISOString(),
          sp500: 4000 + Math.random() * 100,
          nvidia: 400 + Math.random() * 20,
          btc: 30000 + Math.random() * 1000,
        }));
        setStockData(mockData);
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: stockData.map(data => new Date(data.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: selectedStock === 'sp500' ? 'S&P 500' : selectedStock === 'nvidia' ? 'NVIDIA' : 'Bitcoin',
        data: stockData.map(data => data[selectedStock]),
        borderColor: selectedStock === 'sp500' ? 'rgb(75, 192, 192)' : selectedStock === 'nvidia' ? 'rgb(255, 99, 132)' : 'rgb(255, 205, 86)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const getLatestData = () => stockData[stockData.length - 1] || { sp500: 0, nvidia: 0, btc: 0 };
  const getPreviousData = () => stockData[stockData.length - 2] || { sp500: 0, nvidia: 0, btc: 0 };

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(2);
  };

  const latestData = getLatestData();
  const previousData = getPreviousData();

  const handleStockChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStock(event.target.value as StockType);
  };

  const formatPrice = (price: number, isBTC: boolean = false) => {
    return isBTC
      ? `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `$${price.toFixed(2)}`;
  };

  const renderStockInfo = (stockType: StockType, name: string) => {
    const change = Number(calculateChange(latestData[stockType], previousData[stockType]));
    const changeColor = change >= 0 ? 'text-green-500' : 'text-red-500';
    const isBTC = stockType === 'btc';
    return (
      <div className="text-sm">
        <span className="font-bold">{name}: </span>
        <span>{formatPrice(latestData[stockType], isBTC)} </span>
        <span className={changeColor}>
          ({change >= 0 ? '+' : ''}{change}%)
        </span>
      </div>
    );
  };

  return (
    <div className="card bg-base-200 shadow-xl w-full">
      <div className="card-body p-2">
        <h2 className="text-2xl font-bold mb-2 text-center">Stocks</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="grid grid-cols-3 gap-2 w-full">
            {renderStockInfo('sp500', 'S&P 500')}
            {renderStockInfo('nvidia', 'NVIDIA')}
            {renderStockInfo('btc', 'Bitcoin')}
          </div>
        </div>
        <select 
          value={selectedStock} 
          onChange={handleStockChange}
          className="select select-bordered w-full max-w-xs mb-4"
        >
          <option value="sp500">S&P 500</option>
          <option value="nvidia">NVIDIA</option>
          <option value="btc">Bitcoin</option>
        </select>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default StocksGraph;