import React from 'react';
import './App.css';
import Clock from './components/Clock';
import SystemStats from './components/SystemStats';
import DiskUsage from './components/DiskUsage';
import Weather from './components/Weather';
import NextMeetings from './components/NextMeetings';
import StocksGraph from './components/StocksGraph';

function App() {
  console.log('Rendering App component');
  return (
    <div className="App min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col justify-center items-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          <Clock />
          <SystemStats />
          <DiskUsage />
          <Weather />
          <NextMeetings />
          <StocksGraph />
        </div>
      </main>
    </div>
  );
}

export default App;