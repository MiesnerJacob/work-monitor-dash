import { ElectronAPI } from '../hooks/useElectronAPI';

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}