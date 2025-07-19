import type { TrailColorMetric } from "@/types"

export const COMPANY_LIST = [
  { id: "cmp2", label: "Company 1" },
  { id: "cmp1", label: "Company 2" },
  { id: "cmp3", label: "Company 3" },
]

export const HULL_JOBS = [
  { id: "03573a58-6a32-4433-9e1a-9f9d31c71edb", label: "Hull Inspection (HI)" },
  {
    id: "b10dd87b-68b4-496d-9b60-39cf9f03c0bb",
    label: "Propeller Polish (PP)",
  },
  { id: "ee828f1f-f1cd-4962-a980-12ccc4e48e7b", label: "Hull Cleaning (HC)" },
  {
    id: "3a95d310-64bc-4599-8c4d-9304d12bb986",
    label: "Propeller Inspection (PI)",
  },
  { id: "c854b265-067c-4b7a-8d6a-d00f7304297b", label: "Drydock (DD)" },
]

export const TRAIL_COLOR_METRICS: TrailColorMetric[] = [
  "Default",
  "Excess Consumption", 
  "Power",
  "SFOC"
]

export const TRAIL_COLOR_MAP = {
  Default: {
    color: "#0000FF", // Blue
  },
  Power: [
    { min: null, max: 106, color: "#00FF00" }, // Green
    { min: 106, max: 114, color: "#FFAC1C" }, // Orange
    { min: 114, max: null, color: "#FF0000" }, // Red
  ],
  SFOC: [
    { min: null, max: 103, color: "#00FF00" }, // Green
    { min: 103, max: 110, color: "#FFAC1C" }, // Orange
    { min: 110, max: null, color: "#FF0000" }, // Red
  ],
  "Excess Consumption": [
    { min: null, max: 5, color: "#00FF00" }, // Green
    { min: 5, max: 15, color: "#FFAC1C" }, // Orange
    { min: 15, max: null, color: "#FF0000" }, // Red
  ],
} 