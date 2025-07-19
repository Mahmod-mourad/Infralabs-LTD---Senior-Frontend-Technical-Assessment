import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  CircularProgress
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { FilterForm } from '../Forms/FilterForm'
import type { FilterFormData } from '@/types'

interface FilterModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: FilterFormData) => void
  isLoading: boolean
  defaultValues: FilterFormData
}

export const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  onSubmit,
  isLoading,
  defaultValues,
}) => {
  const handleApplyFilters = () => {
    // For now, submit the current default values
    // In a real app, you would get the current form values
    console.log("🚀 Applying filters with:", defaultValues)
    onSubmit(defaultValues)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#132f4c',
          border: '1px solid #173a5e',
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: '#ffffff',
        borderBottom: '1px solid #173a5e',
        pb: 2.5,
        px: 3
      }}>
        <Typography variant="h5" sx={{ color: '#b2bac2', fontWeight: 600 }}>
          Global Filters
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: '#b2bac2',
            '&:hover': {
              color: '#ffffff',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2, px: 3 }}>
        <FilterForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          isLoading={isLoading}
        />
      </DialogContent>

      <DialogActions sx={{ 
        px: 3, 
        py: 2.5,
        borderTop: '1px solid #173a5e',
        gap: 1.5
      }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#b2bac2',
            '&:hover': {
              color: '#ffffff',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleApplyFilters}
          variant="contained"
          disabled={isLoading}
          sx={{
            bgcolor: '#1976d2',
            color: '#ffffff',
            '&:hover': {
              bgcolor: '#1565c0',
            },
            '&:disabled': {
              bgcolor: '#173a5e',
              color: '#666666',
            },
          }}
        >
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} sx={{ color: '#ffffff' }} />
              Loading...
            </Box>
          ) : (
            'APPLY FILTERS'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
} 