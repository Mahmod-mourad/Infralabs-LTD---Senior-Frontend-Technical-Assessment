export interface Company {
  id: string
  name: string
  label?: string
}

export interface Vessel {
  id: string
  name: string
  companyId: string
}

export interface HullJob {
  id: string
  name: string
  label?: string
}

// New data structure based on updated mockData.json
export interface DataPoint {
  timestamp: string // ISO date string
  dataType: string
  shaftPower_: string
  shaftPower: number
  shaftSpeed_: string
  shaftSpeed: number
  draft_: string
  draft: number
  logSpeed_: string
  logSpeed: number
  logFactor: number
  gpsSpeed_: string
  gpsSpeed: number
  gpsSpeedCorDaily: number
  gpsSpeedCorHourly: number
  currentVelocity: number
  currentDirection: number
  currentRelativeDirection: number
  vesselDirection: number
  waveHeight_: string
  waveHeight: number
  waveDirection: number
  waveRelativeDirection_: string
  waveRelativeDirection: number
  windSpeed_: string
  windSpeed: number
  windDirection: number
  windRelativeDirection: number
  powerModel: number
  powerModelFactor: number
  wavePower: number
  windPower: number
  meISOEqMDO_: string
  meISOEqMDO: number
  dfocExpected: number
  dfocExpected_WO: number
  depth: number
  beaufort: number
  spFuelRate: number
  sfocISO: number
  sfocFactor: number
  position: [number, number] // [longitude, latitude]
  power: number
  powerVisible: boolean
  sfoc: number
  sfocVisible: boolean
  sfr1Visible: boolean
  sfr2Visible: boolean
  sfr3Visible: boolean
  sfr4Visible: boolean
  consumption: number
  consVisible: boolean
  consumption_ton: number
  cTonVisible: boolean
  logFactorValue: number
  logFactorVisible: boolean
  hullJobs: any[]
  invisibilityReason: string
}

// Legacy types for backward compatibility
export interface TrailDataPoint {
  timestamp: string
  latitude: number
  longitude: number
  sfoc: number
  power: number
  excessConsumption: number
  logSpeed: number
  waveHeight: number
  windSpeed: number
}

export interface VesselTrail {
  vesselId: string
  trail: TrailDataPoint[]
}

export interface PerformanceInfo {
  correctedPower: number
  excessConsumption: number
  logSpeed: number
  waveHeight: number
  windSpeed: number
}

export interface InfoCardData {
  paint: string
  hullRoughness: string
  logFactor: string
  lastUnderwaterService: string
}

export type TrailColorMetric = "Default" | "Excess Consumption" | "Power" | "SFOC"

// Filter Form Types
export interface FilterFormData {
  dateFrom: Date | undefined
  dateTo: Date | undefined
  companyIds: string[]
  vesselId: string | undefined
  hullJobIds: string[]
}

export interface FilterApiResponse {
  data: DataPoint[]
  infoCardData: InfoCardData
  sfocVisible: boolean
}

// Tooltip Data
export interface TooltipData {
  timestamp: string
  correctedPower: number
  excessConsumption: number
  logSpeed: number
  waveHeight: number
  windSpeed: number
} 