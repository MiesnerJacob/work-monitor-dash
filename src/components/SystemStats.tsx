import React, { useState, useEffect } from 'react';
import { useElectronAPI } from '../hooks/useElectronAPI';
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

interface UsageData {
  timestamp: number;
  usage: number;
}

function SystemStats() {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [gpuUsage, setGpuUsage] = useState(0);
  const [cpuHistory, setCpuHistory] = useState<UsageData[]>([]);
  const [gpuHistory, setGpuHistory] = useState<UsageData[]>([]);
  const electronAPI = useElectronAPI();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await electronAPI.getSystemStats();
        setCpuUsage(stats.cpuUsage);
        setGpuUsage(stats.gpuUsage);

        const now = Date.now();
        setCpuHistory(prev => [...prev, { timestamp: now, usage: stats.cpuUsage }].slice(-20));
        setGpuHistory(prev => [...prev, { timestamp: now, usage: stats.gpuUsage }].slice(-20));
      } catch (error) {
        console.error('Failed to fetch system stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);

    return () => clearInterval(interval);
  }, [electronAPI]);

  const createChartData = (data: UsageData[]) => ({
    labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        data: data.map(d => d.usage),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  });

  const chartOptions = {
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
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        max: 100,
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="card bg-base-200 shadow-xl w-full">
      <div className="card-body p-2">
        <h2 className="text-2xl font-bold mb-2 text-center">System Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xl">CPU Usage: {cpuUsage.toFixed(1)}%</p>
            <div style={{ height: '50px' }}>
              <Line data={createChartData(cpuHistory)} options={chartOptions} />
            </div>
          </div>
          <div>
            <p className="text-xl">GPU Usage: {gpuUsage.toFixed(1)}%</p>
            <div style={{ height: '50px' }}>
              <Line data={createChartData(gpuHistory)} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemStats;