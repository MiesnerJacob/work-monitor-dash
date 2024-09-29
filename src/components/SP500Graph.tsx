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

interface SP500Data {
  timestamp: string;
  value: number;
}

function SP500Graph() {
  const [sp500Data, setSP500Data] = useState<SP500Data[]>([]);

  useEffect(() => {
    // Function to fetch S&P 500 data
    const fetchSP500Data = async () => {
      try {
        // In a real application, you would fetch data from an API here
        // For this example, we'll generate mock data
        const mockData: SP500Data[] = Array.from({ length: 20 }, (_, i) => ({
          timestamp: new Date(Date.now() - (19 - i) * 60000).toISOString(),
          value: 4000 + Math.random() * 100,
        }));
        setSP500Data(mockData);
      } catch (error) {
        console.error('Failed to fetch S&P 500 data:', error);
      }
    };

    fetchSP500Data();
    const interval = setInterval(fetchSP500Data, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: sp500Data.map(data => new Date(data.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'S&P 500',
        data: sp500Data.map(data => data.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'S&P 500 Live Graph',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="card bg-base-200 shadow-xl w-full">
      <div className="card-body p-2">
        <h2 className="text-2xl font-bold mb-2 text-center">S&P 500</h2>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default SP500Graph;