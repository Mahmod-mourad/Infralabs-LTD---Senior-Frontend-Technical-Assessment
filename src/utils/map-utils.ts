import type { TrailColorMetric } from '@/types'

export function getTrailColor(metric: TrailColorMetric, value: number): string {
  switch (metric) {
    case "Power":
      // Power color mapping as per assessment
      if (value < 106) return '#00FF00' // Green
      if (value < 114) return '#FFAC1C' // Orange
      return '#FF0000' // Red
      
    case "SFOC":
      // SFOC color mapping as per assessment
      if (value < 103) return '#00FF00' // Green
      if (value < 110) return '#FFAC1C' // Orange
      return '#FF0000' // Red
      
    case "Excess Consumption":
      // Excess Consumption color mapping as per assessment
      if (value < 5) return '#00FF00' // Green
      if (value < 15) return '#FFAC1C' // Orange
      return '#FF0000' // Red
      
    default:
      // Default blue as per assessment
      return '#0000FF'
  }
}

export function createTooltipContent(data: {
  timestamp: string
  correctedPower: number
  excessConsumption: number
  logSpeed: number
  waveHeight: number
  windSpeed: number
}): string {
  const date = new Date(data.timestamp)
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return `
    <div style="
      background: #132f4c;
      border: 1px solid #173a5e;
      border-radius: 8px;
      padding: 12px;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-width: 200px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    ">
      <div style="
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 8px;
        color: #b2bac2;
        border-bottom: 1px solid #173a5e;
        padding-bottom: 4px;
      ">
        Performance Info
      </div>
      <div style="font-size: 12px; color: #b2bac2; margin-bottom: 8px;">
        ${formattedDate}, ${formattedTime}
      </div>
      <div style="display: grid; gap: 6px; font-size: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="color: #b2bac2;">⚡ Corrected Power:</span>
          <span style="color: #9c27b0; font-weight: 600;">${data.correctedPower.toFixed(2)}%</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="color: #b2bac2;">💧 Excess Consumption:</span>
          <span style="color: #9c27b0; font-weight: 600;">${data.excessConsumption.toFixed(2)}%</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="color: #b2bac2;">🚢 Log Speed:</span>
          <span style="color: #9c27b0; font-weight: 600;">${data.logSpeed.toFixed(2)} knots</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="color: #b2bac2;">🌊 Wave Height:</span>
          <span style="color: #9c27b0; font-weight: 600;">${data.waveHeight.toFixed(2)} m</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="color: #b2bac2;">💨 Wind Speed:</span>
          <span style="color: #9c27b0; font-weight: 600;">${data.windSpeed.toFixed(2)} knots</span>
        </div>
      </div>
    </div>
  `
} 