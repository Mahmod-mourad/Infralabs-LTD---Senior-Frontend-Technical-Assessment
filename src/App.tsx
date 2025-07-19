import { useState, useEffect, useTransition } from 'react'
import { Box, Snackbar, Alert, ThemeProvider, createTheme } from '@mui/material'
import { Header } from '@/components/Header'
import { InfoCard } from '@/components/InfoCard'
import { MapComponent } from '@/components/Map/MapComponent'
import { FilterModal } from '@/components/Modal/FilterModal'
import { fetchFilteredData } from '@/services/api'
import { subYears } from 'date-fns'
import type { FilterFormData, FilterApiResponse } from '@/types'

import { COMPANY_LIST } from '@/constants'

interface AppProps {
  onToggleTheme: () => void
}

// Create dark theme matching the design
const darkTheme = createTheme({
  typography: {
    fontFamily: 'Neutraface2TextGreek, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#0a1929',
      paper: '#132f4c',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b2bac2',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#132f4c',
          border: '1px solid #173a5e',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#132f4c',
        },
      },
    },
  },
})

// Create light theme
const lightTheme = createTheme({
  typography: {
    fontFamily: 'Neutraface2TextGreek, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
})

export default function App({ onToggleTheme }: AppProps) {
  const [isPending, startTransition] = useTransition()
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'info'
  }>({
    open: false,
    message: '',
    severity: 'info'
  })

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(true) // Modal should be open by default
  const [currentFilters, setCurrentFilters] = useState<FilterFormData>(() => ({
    dateFrom: subYears(new Date(), 5), // 5 years ago from today
    dateTo: new Date(), // today
    companyIds: [COMPANY_LIST[0]?.id || ""],
    vesselId: undefined,
    hullJobIds: [],
  }))
  const [apiResponse, setApiResponse] = useState<FilterApiResponse>({
    data: [],
    infoCardData: {
      paint: "N/A",
      hullRoughness: "N/A",
      logFactor: "N/A",
      lastUnderwaterService: "N/A",
    },
    sfocVisible: false,
  })
  const [isLoadingData, setIsLoadingData] = useState(true) // Start with loading true
  const [hasFetchedData, setHasFetchedData] = useState(false)

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' = 'info') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    onToggleTheme()
    // Update body data-theme attribute
    document.body.setAttribute('data-theme', !isDarkMode ? 'light' : 'dark')
  }

  // Set initial theme on mount
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  // Initial data fetch on component mount
  useEffect(() => {
    const initialFetch = async () => {
      setIsLoadingData(true)
      try {
        console.log("Starting initial data fetch...")
        const data = await fetchFilteredData(currentFilters)
        console.log("Initial data received:", data)
        setApiResponse(data)
        setHasFetchedData(true)
        if (data.data.length === 0) {
          showSnackbar('No data found for the initial filters.', 'info')
        } else {
          showSnackbar(`تم تحميل ${data.data.length} نقطة بيانات بنجاح! 🚢`, 'success')
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error)
        showSnackbar('Failed to load initial map data.', 'error')
      } finally {
        setIsLoadingData(false)
      }
    }
    initialFetch()
  }, []) // Only run once on mount

  const handleFilterSubmit = (data: FilterFormData) => {
    console.log("🎯 Form submitted with data:", data)
    setIsFilterModalOpen(false)
    setCurrentFilters(data)
    setIsLoadingData(true)

    startTransition(() => {
      fetchFilteredData(data)
        .then((response) => {
          console.log("✅ Filter response received:", response)
          setApiResponse(response)
          setHasFetchedData(true)
          if (response.data.length === 0) {
            showSnackbar('No data found for the selected filters.', 'info')
          } else {
            showSnackbar(`تم تحديث البيانات بـ ${response.data.length} نقطة! 🎯`, 'success')
          }
        })
        .catch((error) => {
          console.error("❌ Failed to fetch filtered data:", error)
          showSnackbar('Failed to apply filters. Please try again.', 'error')
        })
        .finally(() => {
          setIsLoadingData(false)
        })
    })
  }

  const showNoDataState = hasFetchedData && apiResponse.data.length === 0 && !isLoadingData
  const currentTheme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}>
        <Header onOpenFilterModal={() => setIsFilterModalOpen(true)} onToggleTheme={handleToggleTheme} />
        
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {isLoadingData ? (
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'background.default'
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div className="loading-spinner" />
                <p>Loading map data...</p>
              </Box>
            </Box>
          ) : showNoDataState ? (
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              p: 2,
              bgcolor: 'background.default'
            }}>
              <Box sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}>😞</Box>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                No Data Found
              </h2>
              <p style={{ color: 'text.secondary', textAlign: 'center' }}>
                No data matches your current filter criteria. Try adjusting your filters.
              </p>
            </Box>
          ) : (
            <MapComponent 
              data={apiResponse.data} 
              sfocVisible={apiResponse.sfocVisible} 
            />
          )}
          
          <Box sx={{ 
            width: { xs: '100%', md: 320 }, 
            p: 2.5, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1.5,
            bgcolor: 'background.paper',
            borderTop: { xs: 1, md: 0 },
            borderLeft: { md: 1 },
            borderColor: 'divider',
            overflowY: 'auto',
            flexShrink: 0
          }}>
            <InfoCard 
              title="Paint" 
              value={apiResponse.infoCardData.paint} 
              isLoading={isLoadingData} 
            />
            <InfoCard 
              title="Hull Roughness" 
              value={apiResponse.infoCardData.hullRoughness} 
              isLoading={isLoadingData} 
            />
            <InfoCard 
              title="Log Factor" 
              value={apiResponse.infoCardData.logFactor} 
              isLoading={isLoadingData} 
            />
            <InfoCard
              title="Last Underwater"
              value={apiResponse.infoCardData.lastUnderwaterService}
              isLoading={isLoadingData}
            />
          </Box>
        </Box>

        <FilterModal
          open={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onSubmit={handleFilterSubmit}
          isLoading={isPending || isLoadingData}
          defaultValues={currentFilters}
        />

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  )
} 