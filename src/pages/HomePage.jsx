import { useState } from 'react'
import MapView from '../components/MapView'
import DetailPanel from '../components/DetailPanel'
import useAppStore from '../store/useAppStore'
import useLocations from '../hooks/useLocations'

export default function HomePage() {
  const [satellite, setSatellite] = useState(false)
  const { selectedLocation } = useAppStore()
  const { locations } = useLocations()

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Map — fills remaining space */}
      <div className="flex-1 relative">
        <MapView satellite={satellite} setSatellite={setSatellite} />

        {/* Result count badge */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[999] pointer-events-none">
          <span className="bg-white/95 shadow-sm border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 font-medium">
            {locations.length} {locations.length === 1 ? 'place' : 'places'} found
          </span>
        </div>
      </div>

      {/* Detail panel — slides in when a pin is selected */}
      {selectedLocation && (
        <div className="w-80 shrink-0 h-full">
          <DetailPanel />
        </div>
      )}
    </div>
  )
}
