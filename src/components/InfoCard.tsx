import React from 'react'
import { Card, CardContent, Typography, Skeleton, useTheme } from '@mui/material'

interface InfoCardProps {
  title: string      // عنوان البطاقة (Paint, Hull Roughness, etc.)
  value: string      // القيمة (Seaquantum Classic III, 6.2%, etc.)
  isLoading?: boolean // حالة التحميل
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, value, isLoading = false }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Card 
      sx={{ 
        bgcolor: isDark ? '#132f4c' : '#ffffff',
        border: `1px solid ${isDark ? '#173a5e' : '#e0e0e0'}`,
        borderRadius: 2,
        '&:hover': {
          bgcolor: isDark ? '#1a3a5a' : '#f5f5f5',
          borderColor: isDark ? '#1976d2' : '#1976d2',
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontSize: '0.875rem',
            fontWeight: 500,
            mb: 1.5,
            color: isDark ? '#b2bac2' : '#666666'
          }}
        >
          {title}
        </Typography>
        {isLoading ? (
          <Skeleton 
            variant="text" 
            width="60%" 
            height={24}
            sx={{ bgcolor: isDark ? '#173a5e' : '#e0e0e0' }}
          />
        ) : (
          <Typography 
            variant="body1" 
            component="div"
            sx={{ 
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#9c27b0',
              fontFamily: 'monospace'
            }}
          >
            {value}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
} 