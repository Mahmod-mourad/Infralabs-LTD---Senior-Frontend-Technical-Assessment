# Vessel Tracking Application

A React-based vessel tracking application built with Vite, Material UI, and OpenLayers.

## 🚀 Features

- **Interactive Map**: Real-time vessel trail visualization using OpenLayers
- **Data Filtering**: Advanced filtering by date, company, and vessel
- **Trail Coloring**: Multiple color schemes based on different metrics (Power, SFOC, Consumption)
- **Info Cards**: Display vessel information including paint, hull roughness, log factor, and service history
- **Responsive Design**: Works on desktop and mobile devices
- **Theme Toggle**: Light and dark theme support
- **Mock Data**: Comprehensive vessel data for testing

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Material UI (MUI)** for UI components and theming
- **OpenLayers** for interactive map rendering
- **React Hook Form** with Zod validation
- **Date-fns** for date manipulation

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Senior-Front-End-Task-
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Forms/          # Form components
│   ├── Map/            # Map-related components
│   ├── Modal/          # Modal components
│   └── ui/             # Reusable UI components
├── constants/          # Application constants
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## 🗺️ Map Features

- **Vessel Trail Visualization**: Displays vessel movement over time
- **Interactive Tooltips**: Hover over trail points to see detailed information
- **Trail Coloring**: Choose from different color schemes:
  - Default: Standard trail coloring
  - Power: Color based on power consumption
  - SFOC: Color based on specific fuel oil consumption
  - Excess Consumption: Color based on consumption metrics

## 📊 Data Structure

The application uses a comprehensive data structure that includes:

- **Position Data**: GPS coordinates for vessel tracking
- **Performance Metrics**: Power, speed, fuel consumption
- **Environmental Data**: Wave height, wind speed, direction
- **Vessel Information**: Paint type, hull condition, service history

## 🎨 UI Components

- **Header**: Navigation and theme toggle
- **Info Cards**: Display vessel information
- **Filter Modal**: Advanced filtering options
- **Map Component**: Interactive vessel trail visualization
- **Loading States**: Smooth loading animations

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Production Build

The project has been successfully built for production:

```bash
npm run build
```

**Build Results:**
- **Total Size:** ~997 kB
- **Gzipped Size:** ~295 kB
- **Build Time:** 16.75 seconds
- **Files Generated:**
  - `dist/index.html` (0.48 kB)
  - `dist/assets/index-DKjBDLLP.css` (2.14 kB)
  - `dist/assets/index-C4I7mp3t.js` (994.99 kB)

The production build is ready for deployment on any hosting platform.

### Data Source

The application uses mock data stored in `public/mockData.json`. This file contains:
- Vessel trail data with timestamps
- Performance metrics
- Environmental conditions
- Vessel information

## 🚢 Usage

1. **View Vessel Trail**: The map automatically displays the vessel trail when data is loaded
2. **Apply Filters**: Click "Global Filters" to open the filter modal
3. **Change Trail Colors**: Use the dropdown in the top-right corner of the map
4. **View Details**: Hover over trail points to see detailed information
5. **Toggle Theme**: Use the theme toggle button in the header

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎯 Key Features

- **Real-time Data**: Simulated real-time vessel tracking
- **Advanced Filtering**: Filter by date range, company, and vessel
- **Interactive Map**: Zoom, pan, and explore vessel trails
- **Performance Metrics**: View detailed performance data
- **Modern UI**: Clean, intuitive interface with Material Design

## 🔄 Data Updates

The application simulates API calls with a 5-second delay to demonstrate loading states and user feedback.

## 📄 License

This project is part of a technical assessment and is for demonstration purposes.