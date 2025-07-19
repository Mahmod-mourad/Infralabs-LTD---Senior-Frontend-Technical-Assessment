import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import App from './App.tsx'
import './index.css'

function AppWrapper() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  })

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App onToggleTheme={toggleTheme} />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
) 