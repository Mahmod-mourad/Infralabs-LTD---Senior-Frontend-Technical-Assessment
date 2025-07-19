import type { Company, Vessel, HullJob, VesselTrail, InfoCardData, TrailDataPoint } from "@/types"

export const MOCK_COMPANIES: Company[] = [
  { id: "cmp2", name: "Company 1" },
  { id: "cmp1", name: "Company 2" },
  { id: "cmp3", name: "Company 3" },
]

export const MOCK_VESSELS: Vessel[] = [
  { id: "vessel1", name: "Vessel Alpha", companyId: "cmp2" },
  { id: "vessel2", name: "Vessel Beta", companyId: "cmp2" },
  { id: "vessel3", name: "Vessel Gamma", companyId: "cmp1" },
  { id: "vessel4", name: "Vessel Delta", companyId: "cmp3" },
]

export const MOCK_HULL_JOBS: HullJob[] = [
  { id: "03573a58-6a32-4433-9e1a-9f9d31c71edb", name: "Hull Inspection (HI)" },
  { id: "b10dd87b-68b4-496d-9b60-39cf9f03c0bb", name: "Propeller Polish (PP)" },
  { id: "ee828f1f-f1cd-4962-a980-12ccc4e48e7b", name: "Hull Cleaning (HC)" },
  { id: "3a95d310-64bc-4599-8c4d-9304d12bb986", name: "Propeller Inspection (PI)" },
  { id: "c854b265-067c-4b7a-8d6a-d00f7304297b", name: "Drydock (DD)" },
]

// Helper to generate a realistic trail segment
const generateTrailSegment = (
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number,
  numPoints: number,
  startDate: Date,
): TrailDataPoint[] => {
  const points: TrailDataPoint[] = []
  for (let i = 0; i < numPoints; i++) {
    const ratio = i / (numPoints - 1)
    const lat = startLat + (endLat - startLat) * ratio
    const lon = startLon + (endLon - startLon) * ratio
    const timestamp = new Date(startDate.getTime() + i * 3600 * 1000).toISOString() // Hourly points

    points.push({
      timestamp,
      latitude: lat,
      longitude: lon,
      sfoc: Number.parseFloat((Math.random() * (0.18 - 0.15) + 0.15).toFixed(3)), // Realistic SFOC
      power: Number.parseFloat((Math.random() * (10000 - 8000) + 8000).toFixed(2)), // Realistic Power
      excessConsumption: Number.parseFloat((Math.random() * (0.1 - 0.02) + 0.02).toFixed(2)), // Realistic Excess Consumption
      logSpeed: Number.parseFloat((Math.random() * (12 - 8) + 8).toFixed(2)), // Realistic Log Speed
      waveHeight: Number.parseFloat((Math.random() * (2.5 - 0.5) + 0.5).toFixed(2)), // Realistic Wave Height
      windSpeed: Number.parseFloat((Math.random() * (15 - 5) + 5).toFixed(2)), // Realistic Wind Speed
    })
  }
  return points
}

export const MOCK_VESSEL_TRAILS: VesselTrail[] = [
  {
    vesselId: "vessel1",
    trail: [
      ...generateTrailSegment(3.139, 101.6869, 3.15, 101.75, 10, new Date("2025-07-10T00:00:00Z")), // Kuala Lumpur to sea
      ...generateTrailSegment(3.15, 101.75, 3.2, 101.85, 15, new Date("2025-07-10T10:00:00Z")),
      ...generateTrailSegment(3.2, 101.85, 3.25, 101.95, 10, new Date("2025-07-11T01:00:00Z")),
      ...generateTrailSegment(3.25, 101.95, 3.3, 102.05, 12, new Date("2025-07-11T11:00:00Z")),
      ...generateTrailSegment(3.3, 102.05, 3.35, 102.15, 8, new Date("2025-07-11T23:00:00Z")),
    ],
  },
  {
    vesselId: "vessel2",
    trail: [
      ...generateTrailSegment(0.5, 100.0, 1.0, 100.5, 20, new Date("2025-07-05T00:00:00Z")),
      ...generateTrailSegment(1.0, 100.5, 1.5, 101.0, 15, new Date("2025-07-05T20:00:00Z")),
    ],
  },
]

export const MOCK_INFO_CARD_DATA: InfoCardData = {
  paint: "Seaquantum Classic III",
  hullRoughness: "6.2%",
  logFactor: "0.98",
  lastUnderwaterService: "2024-10-28",
} 