# Work Monitor Dashboard

The Work Monitor Dashboard is a customizable desktop application built using Electron.js, React, Tailwind CSS, and DaisyUI. It provides real-time monitoring of important system stats, integrates with your Google Calendar, displays a digital clock, and counts down to your next scheduled meeting. It also offers customizable display options to keep you informed and productive at a glance.

## Key Features

### 1. Digital Clock
- Displays the current time in a digital clock format.
- Automatically updates every second.

### 2. Countdown to Next Meeting
- Calculates the time remaining until your next scheduled Google Calendar meeting.
- Provides a countdown in hours, minutes, and seconds until the meeting starts.

### 3. Google Calendar Integration
- Displays your upcoming Google Calendar meetings.
- Provides clickable links to launch Google Hangouts or Meet directly from the dashboard.
- Shows event titles, times, and links to the video meetings.

### 4. System Monitoring
- **CPU Usage**: Tracks and displays real-time CPU utilization.
- **Disk Usage**: Displays available and used disk space in real-time.
- **Network Speed**: Monitors and displays your current download and upload speeds.
- **Battery Life**: Shows your current battery percentage and estimated time remaining.

> Note: Since you're using a MacBook Pro, this dashboard does not display Nvidia GPU utilization.

### 5. Weather Information
- Provides real-time weather updates for your specified location.
- Displays the current temperature and weather conditions (e.g., sunny, cloudy, etc.).

### 6. S&P 500 Stock Chart
- Real-time stock data fetched using the Alpha Vantage API.
- Displays the most recent S&P 500 stock prices in a visually appealing line chart.

### 7. Custom Image Display
- Displays a custom image of your choice to personalize the dashboard.

## Tech Stack

### Electron.js
Electron powers the desktop environment, allowing the app to run across different platforms (Windows, macOS, Linux) with native capabilities.

### React.js
The frontend UI is built using React, enabling a highly dynamic and component-based architecture for easier scaling and maintenance.

### Tailwind CSS & DaisyUI
- Tailwind CSS is used for styling, providing a responsive and modern design with utility-first CSS classes.
- DaisyUI extends Tailwind with additional pre-built components for a beautiful and consistent UI experience.

### Node.js & Google API
- The app uses the Google Calendar API to fetch events and display them in the dashboard.
- Real-time system stats and weather information are fetched using Node.js system commands and external APIs (e.g., OpenWeatherMap).