import React, { useState, useEffect } from 'react';
import { useElectronAPI } from '../hooks/useElectronAPI';

function DiskUsage() {
  const [diskUsage, setDiskUsage] = useState({ total: 0, used: 0, free: 0 });
  const electronAPI = useElectronAPI();

  useEffect(() => {
    const fetchDiskUsage = async () => {
      try {
        const usage = await electronAPI.getDiskUsage();
        setDiskUsage(usage);
      } catch (error) {
        console.error('Failed to fetch disk usage:', error);
      }
    };

    fetchDiskUsage();
    const interval = setInterval(fetchDiskUsage, 5000);

    return () => clearInterval(interval);
  }, [electronAPI]);

  const usedPercentage = (diskUsage.used / diskUsage.total) * 100;

  const formatSize = (size: number) => {
    const gb = size / 1024 / 1024 / 1024;
    return gb.toFixed(2);
  };

  return (
    <div className="card bg-base-200 shadow-xl w-full">
      <div className="card-body p-2">
        <h2 className="text-2xl font-bold mb-2 text-center">Disk Usage</h2>
        <div className="text-center">
          <p className="text-3xl font-bold mb-2">
            {formatSize(diskUsage.free)} GB free
          </p>
          <p className="text-xl mb-4">
            out of {formatSize(diskUsage.total)} GB
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 mb-2">
          <div 
            className="bg-blue-600 h-4 rounded-full" 
            style={{ width: `${usedPercentage}%` }}
          ></div>
        </div>
        <p className="text-lg text-center">
          {usedPercentage.toFixed(1)}% Used
        </p>
      </div>
    </div>
  );
}

export default DiskUsage;