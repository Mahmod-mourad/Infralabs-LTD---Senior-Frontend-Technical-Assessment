import type { FilterFormData, FilterApiResponse, DataPoint } from "@/types"

export async function fetchFilteredData(filters: FilterFormData): Promise<FilterApiResponse> {
  console.log("🚀 Starting API call with filters:", filters)
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        console.log("📁 Fetching data from /mockData.json...")
        
        // Fetch data from the full mockData.json
        const response = await fetch('/mockData.json')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const mockData = await response.json()
        console.log("✅ Full data loaded successfully")
        console.log("📊 Data structure:", Object.keys(mockData))
        console.log("📈 Raw data length:", mockData.Data?.length || 0)
        
        // Apply filters to the data
        let filteredData = mockData.Data || []
        
        // Date filtering
        if (filters.dateFrom || filters.dateTo) {
          filteredData = filteredData.filter((dataPoint: DataPoint) => {
            const timestamp = new Date(dataPoint.timestamp)
            
            const isDateFromMatch = !filters.dateFrom || timestamp >= filters.dateFrom
            const isDateToMatch = !filters.dateTo || timestamp <= filters.dateTo
            
            return isDateFromMatch && isDateToMatch
          })
        }
        
        // Company filtering (if vessel is selected, filter by vessel's company)
        if (filters.companyIds && filters.companyIds.length > 0) {
          // For now, we'll keep all data since we don't have company info in the data points
          // In a real app, you would filter by company
          console.log("🏢 Company filtering applied:", filters.companyIds)
        }
        
        // Vessel filtering
        if (filters.vesselId) {
          // For now, we'll keep all data since we don't have vessel ID in the data points
          // In a real app, you would filter by vessel ID
          console.log("🚢 Vessel filtering applied:", filters.vesselId)
        }
        
        // Hull jobs filtering
        if (filters.hullJobIds && filters.hullJobIds.length > 0) {
          // For now, we'll keep all data since we don't have hull job info in the data points
          // In a real app, you would filter by hull jobs
          console.log("🔧 Hull jobs filtering applied:", filters.hullJobIds)
        }
        
        console.log("🎯 Filtered data length:", filteredData.length)
        console.log("📍 First data point position:", filteredData[0]?.position)

        // Create info card data from the first data point (if available)
        const firstDataPoint = filteredData[0]
        const infoCardData = {
          paint: "Seaquantum Classic III",
          hullRoughness: "6.2%",
          logFactor: firstDataPoint ? firstDataPoint.logFactorValue.toString() : "0.98",
          lastUnderwaterService: "2024-10-28",
        }

        // Determine if SFOC should be visible based on data
        const sfocVisible = filteredData.some((point: DataPoint) => point.sfocVisible)

        const result = {
          data: filteredData,
          infoCardData,
          sfocVisible,
        }
        
        console.log("🎉 API Response prepared:", {
          dataLength: result.data.length,
          infoCardData: result.infoCardData,
          sfocVisible: result.sfocVisible
        })
        
        resolve(result)
      } catch (error) {
        console.error("❌ Failed to load full data:", error)
        console.error("🔍 Error details:", {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        })
        
        resolve({
          data: [],
          infoCardData: {
            paint: "N/A",
            hullRoughness: "N/A",
            logFactor: "N/A",
            lastUnderwaterService: "N/A",
          },
          sfocVisible: false,
        })
      }
    }, 5000) // Simulate 5-second API call as required
  })
} 