import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Grid, FormControl, InputLabel, Select, MenuItem, Chip, Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { COMPANY_LIST, HULL_JOBS } from '@/constants'
import { MOCK_VESSELS } from '@/lib/mock-data'
import type { FilterFormData } from '@/types'

const filterFormSchema = z
  .object({
    dateFrom: z.date().optional(),
    dateTo: z.date().optional(),
    companyIds: z.array(z.string()).default([]),
    vesselId: z.string().optional(),
    hullJobIds: z.array(z.string()).default([]),
  })
  .refine(
    (data) => {
      if (data.dateFrom && data.dateTo && data.dateFrom > data.dateTo) {
        return false
      }
      return true
    },
    {
      message: "Date From cannot be after Date To",
      path: ["dateFrom"],
    },
  )

interface FilterFormProps {
  onSubmit: (data: FilterFormData) => void
  defaultValues: FilterFormData
  isLoading: boolean
}

export const FilterForm: React.FC<FilterFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterFormSchema),
    defaultValues,
  })

  const selectedCompanyIds = watch('companyIds')

  const vesselOptions = React.useMemo(() => {
    if (selectedCompanyIds.length === 0) {
      return []
    }
    return MOCK_VESSELS.filter((vessel) => selectedCompanyIds.includes(vessel.companyId)).map((vessel) => ({
      value: vessel.id,
      label: vessel.name,
    }))
  }, [selectedCompanyIds])

  // Reset vessel when company changes
  React.useEffect(() => {
    const currentVesselId = watch('vesselId')
    if (currentVesselId && !vesselOptions.some((opt) => opt.value === currentVesselId)) {
      setValue('vesselId', undefined)
    }
  }, [selectedCompanyIds, vesselOptions, watch, setValue])

  const handleFormSubmit = (data: FilterFormData) => {
    if (!isLoading) {
      onSubmit(data)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2.5}>
          {/* Date Filters */}
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="dateFrom"
              render={({ field }) => (
                <DatePicker
                  label="Date From"
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dateFrom,
                      helperText: errors.dateFrom?.message,
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#1a3a5a',
                          borderColor: '#173a5e',
                          color: '#ffffff',
                          '&:hover': {
                            borderColor: '#1976d2',
                          },
                          '&.Mui-focused': {
                            borderColor: '#1976d2',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#b2bac2',
                        },
                        '& .MuiInputBase-input': {
                          color: '#ffffff',
                        },
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="dateTo"
              render={({ field }) => (
                <DatePicker
                  label="Date To"
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dateTo,
                      helperText: errors.dateTo?.message,
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#1a3a5a',
                          borderColor: '#173a5e',
                          color: '#ffffff',
                          '&:hover': {
                            borderColor: '#1976d2',
                          },
                          '&.Mui-focused': {
                            borderColor: '#1976d2',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#b2bac2',
                        },
                        '& .MuiInputBase-input': {
                          color: '#ffffff',
                        },
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Company Filter */}
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="companyIds"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.companyIds}>
                  <InputLabel sx={{ color: '#b2bac2' }}>ASGL Company</InputLabel>
                  <Select
                    multiple
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const company = COMPANY_LIST.find(c => c.id === value)
                          return (
                            <Chip 
                              key={value} 
                              label={company?.label || value} 
                              size="small"
                              sx={{
                                bgcolor: '#173a5e',
                                color: '#ffffff',
                                '& .MuiChip-deleteIcon': {
                                  color: '#b2bac2',
                                  '&:hover': {
                                    color: '#ffffff',
                                  },
                                },
                              }}
                            />
                          )
                        })}
                      </Box>
                    )}
                    sx={{
                      bgcolor: '#1a3a5a',
                      borderColor: '#173a5e',
                      color: '#ffffff',
                      '&:hover': {
                        borderColor: '#1976d2',
                      },
                      '&.Mui-focused': {
                        borderColor: '#1976d2',
                      },
                      '& .MuiSelect-icon': {
                        color: '#b2bac2',
                      },
                    }}
                  >
                    {COMPANY_LIST.map((company) => (
                      <MenuItem key={company.id} value={company.id} sx={{ color: '#ffffff' }}>
                        {company.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {/* Vessel Filter */}
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="vesselId"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.vesselId}>
                  <InputLabel sx={{ color: '#b2bac2' }}>Vessel</InputLabel>
                  <Select
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                    disabled={selectedCompanyIds.length === 0}
                    sx={{
                      bgcolor: '#1a3a5a',
                      borderColor: '#173a5e',
                      color: '#ffffff',
                      '&:hover': {
                        borderColor: '#1976d2',
                      },
                      '&.Mui-focused': {
                        borderColor: '#1976d2',
                      },
                      '& .MuiSelect-icon': {
                        color: '#b2bac2',
                      },
                    }}
                  >
                    {vesselOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value} sx={{ color: '#ffffff' }}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {/* Hull Jobs Filter */}
          <Grid item xs={12}>
            <Controller
              control={control}
              name="hullJobIds"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.hullJobIds}>
                  <InputLabel sx={{ color: '#b2bac2' }}>Hull Job(s)</InputLabel>
                  <Select
                    multiple
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const job = HULL_JOBS.find(j => j.id === value)
                          return (
                            <Chip 
                              key={value} 
                              label={job?.label || value} 
                              size="small"
                              sx={{
                                bgcolor: '#173a5e',
                                color: '#ffffff',
                                '& .MuiChip-deleteIcon': {
                                  color: '#b2bac2',
                                  '&:hover': {
                                    color: '#ffffff',
                                  },
                                },
                              }}
                            />
                          )
                        })}
                      </Box>
                    )}
                    sx={{
                      bgcolor: '#1a3a5a',
                      borderColor: '#173a5e',
                      color: '#ffffff',
                      '&:hover': {
                        borderColor: '#1976d2',
                      },
                      '&.Mui-focused': {
                        borderColor: '#1976d2',
                      },
                      '& .MuiSelect-icon': {
                        color: '#b2bac2',
                      },
                    }}
                  >
                    {HULL_JOBS.map((job) => (
                      <MenuItem key={job.id} value={job.id} sx={{ color: '#ffffff' }}>
                        {job.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  )
} 