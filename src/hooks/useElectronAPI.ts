import { WeatherData } from '../types/WeatherData';

interface ElectronAPI {
  getSystemStats: () => Promise<{ cpuUsage: number; gpuUsage: number }>;
  getDiskUsage: () => Promise<{ total: number; used: number; free: number }>;
  getWeather: (lat: number, lon: number) => Promise<WeatherData>;
}

const mockElectronAPI: ElectronAPI = {
  getSystemStats: async () => ({ cpuUsage: 50, gpuUsage: 30 }),
  getDiskUsage: async () => ({ total: 1000000000000, used: 500000000000, free: 500000000000 }),
  getWeather: async () => ({
    temperature: 20,
    description: "Sunny",
    icon: "01d",
    city: "Mock City"
  })
};

export function useElectronAPI(): ElectronAPI {
  if (!window.electronAPI) {
    console.warn('Electron API is not available, using mock data');
    return mockElectronAPI;
  }
  return window.electronAPI as ElectronAPI;
}