import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material'
import { FilterList, Brightness4, Brightness7 } from '@mui/icons-material'

interface HeaderProps {
  onOpenFilterModal: () => void
  onToggleTheme: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenFilterModal, onToggleTheme }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: isDark ? '#132f4c' : '#ffffff',
        borderBottom: `1px solid ${isDark ? '#173a5e' : '#e0e0e0'}`,
        boxShadow: 'none'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            color: isDark ? '#ffffff' : '#333333',
            fontWeight: 600
          }}
        >
          Vessel Tracking System
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={onOpenFilterModal}
            sx={{
              color: isDark ? '#ffffff' : '#333333',
              borderColor: isDark ? '#173a5e' : '#e0e0e0',
              '&:hover': {
                borderColor: '#1976d2',
                bgcolor: isDark ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)',
              },
            }}
          >
            Global Filters
          </Button>
          
          <Button
            variant="outlined"
            onClick={onToggleTheme}
            sx={{
              color: isDark ? '#ffffff' : '#333333',
              borderColor: isDark ? '#173a5e' : '#e0e0e0',
              minWidth: 'auto',
              px: 2,
              '&:hover': {
                borderColor: '#1976d2',
                bgcolor: isDark ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)',
              },
            }}
          >
            {isDark ? <Brightness7 /> : <Brightness4 />}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
} 