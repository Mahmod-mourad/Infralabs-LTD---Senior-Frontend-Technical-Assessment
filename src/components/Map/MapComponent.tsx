import { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Stroke, Circle, Fill } from 'ol/style'
import Overlay from 'ol/Overlay'
import { TRAIL_COLOR_METRICS } from '@/constants'
import { getTrailColor, createTooltipContent } from '@/utils/map-utils'
import type { TrailColorMetric, DataPoint } from '@/types'

interface MapComponentProps {
  data: DataPoint[]
  sfocVisible: boolean
}

// Helper function to get metric value from DataPoint
const getMetricValue = (dataPoint: DataPoint, metric: TrailColorMetric): number => {
  switch (metric) {
    case "Power":
      return dataPoint.power
    case "SFOC":
      return dataPoint.sfoc
    case "Excess Consumption":
      return dataPoint.consumption
    default:
      return 0
  }
}

export const MapComponent = memo(function MapComponent({ data, sfocVisible }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<Map | null>(null)
  const [trailColorMetric, setTrailColorMetric] = useState<TrailColorMetric>("Default")

  // Memoize the vector source and layer to prevent unnecessary re-creations
  const vectorSource = useMemo(() => new VectorSource(), [])
  const vectorLayer = useMemo(
    () =>
      new VectorLayer({
        source: vectorSource,
      }),
    [vectorSource],
  )

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || !tooltipRef.current) return

    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([46.7, -3.3]), // Centered around the data area
        zoom: 8,
      }),
    })

    setMap(initialMap)

    // Setup tooltip overlay
    const tooltipOverlay = new Overlay({
      element: tooltipRef.current,
      offset: [10, 0],
      positioning: 'bottom-left',
      stopEvent: false,
    })
    initialMap.addOverlay(tooltipOverlay)

    // Handle pointer move for tooltips
    const handlePointerMove = (event: any) => {
      const pixel = initialMap.getEventPixel(event.originalEvent)
      const feature = initialMap.forEachFeatureAtPixel(pixel, (f) => f)

      if (feature && feature.get("type") === "trailPoint") {
        const geometry = feature.getGeometry()
        const dataPoint = feature.get("data") as DataPoint

        if (geometry && dataPoint && geometry instanceof Point) {
          const coordinate = geometry.getCoordinates()
          tooltipOverlay.setPosition(coordinate)
          tooltipRef.current!.innerHTML = createTooltipContent({
            timestamp: dataPoint.timestamp,
            correctedPower: dataPoint.power,
            excessConsumption: dataPoint.consumption,
            logSpeed: dataPoint.logSpeed,
            waveHeight: dataPoint.waveHeight,
            windSpeed: dataPoint.windSpeed,
          })
          tooltipRef.current!.style.display = ""
        }
      } else {
        tooltipRef.current!.style.display = "none"
      }
    }

    initialMap.on("pointermove", handlePointerMove)

    return () => {
      initialMap.setTarget(undefined)
      initialMap.removeOverlay(tooltipOverlay)
    }
  }, [vectorLayer])

  // Function to update map features, memoized with useCallback
  const updateMapFeatures = useCallback(() => {
    if (!map) {
      console.log("🗺️ Map not initialized yet")
      return
    }

    console.log("🔄 Updating map features...")
    vectorSource.clear()

    if (data.length === 0) {
      console.log("❌ No data to display on map")
      return
    }

    console.log(`✅ Updating map with ${data.length} data points`)
    console.log("📍 Sample data point:", data[0])

    // Create line segments for coloring
    let segmentsCreated = 0
    for (let i = 0; i < data.length - 1; i++) {
      const startPoint = data[i]
      const endPoint = data[i + 1]

      // Skip if either point doesn't have valid position data
      if (!startPoint.position || !endPoint.position || startPoint.position.length !== 2 || endPoint.position.length !== 2) {
        console.log(`⚠️ Skipping segment ${i}: invalid position data`, {
          startPosition: startPoint.position,
          endPosition: endPoint.position
        })
        continue
      }

      const segmentCoordinates = [
        fromLonLat(startPoint.position), // position is already [longitude, latitude]
        fromLonLat(endPoint.position),
      ]

      const segmentFeature = new Feature({
        geometry: new LineString(segmentCoordinates),
        type: "trailSegment",
        data: endPoint,
      })

      const segmentColor = getTrailColor(trailColorMetric, getMetricValue(endPoint, trailColorMetric))

      segmentFeature.setStyle(
        new Style({
          stroke: new Stroke({
            color: segmentColor,
            width: 4,
          }),
        }),
      )
      vectorSource.addFeature(segmentFeature)
      segmentsCreated++
    }

    console.log(`🎨 Created ${segmentsCreated} trail segments`)

    // Add points for tooltips (invisible but detectable for hover)
    let pointsCreated = 0
    data.forEach((dataPoint) => {
      if (!dataPoint.position || dataPoint.position.length !== 2) {
        console.log(`⚠️ Skipping point: invalid position data`, dataPoint.position)
        return
      }

      const pointFeature = new Feature({
        geometry: new Point(fromLonLat(dataPoint.position)),
        type: "trailPoint",
        data: dataPoint,
      })
      pointFeature.setStyle(
        new Style({
          image: new Circle({
            radius: 5,
            fill: new Fill({ color: "rgba(0,0,0,0)" }),
            stroke: new Stroke({ color: "rgba(0,0,0,0)", width: 0 }),
          }),
        }),
      )
      vectorSource.addFeature(pointFeature)
      pointsCreated++
    })

    console.log(`📍 Created ${pointsCreated} tooltip points`)

    // Adjust map view to fit all data points
    const allCoordinates = data
      .filter(point => point.position && point.position.length === 2)
      .map(point => fromLonLat(point.position))
    
    if (allCoordinates.length > 0) {
      console.log(`🎯 Fitting map to ${allCoordinates.length} coordinates`)
      const extent = new VectorSource({ features: [new Feature(new LineString(allCoordinates))] }).getExtent()
      map.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 1000 })
    } else {
      console.log("⚠️ No valid coordinates to fit map to")
    }
  }, [map, data, trailColorMetric, vectorSource])

  // Call updateMapFeatures whenever relevant dependencies change
  useEffect(() => {
    updateMapFeatures()
  }, [updateMapFeatures])

  const availableMetrics = useMemo(
    () => TRAIL_COLOR_METRICS.filter((metric) => metric !== "SFOC" || sfocVisible),
    [sfocVisible],
  )

  return (
    <Box sx={{ position: 'relative', flex: 1 }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          zIndex: 50,
          pointerEvents: 'none',
          display: 'none',
        }}
      />
      <Paper
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
          p: 2.5,
          minWidth: 200,
          bgcolor: '#132f4c',
          border: '1px solid #173a5e',
          borderRadius: 2,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel id="trail-coloring-label" sx={{ color: '#b2bac2' }}>Trail Coloring</InputLabel>
          <Select
            labelId="trail-coloring-label"
            value={trailColorMetric}
            label="Trail Coloring"
            onChange={(e) => setTrailColorMetric(e.target.value as TrailColorMetric)}
            sx={{
              color: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#173a5e',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
            }}
          >
            {availableMetrics.map((metric) => (
              <MenuItem key={metric} value={metric} sx={{ color: '#ffffff' }}>
                {metric}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Box>
  )
}) 