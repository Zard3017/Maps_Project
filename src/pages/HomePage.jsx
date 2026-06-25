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
    <div className="relative flex w-full h-full overflow-hidden">
      <div className="flex-1 relative">
        <MapView satellite={satellite} setSatellite={setSatellite} />

        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[999] pointer-events-none">
          <span className="bg-white/95 shadow-sm border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 font-medium">
            {locations.length} {locations.length === 1 ? 'place' : 'places'} found
          </span>
        </div>
      </div>

      {/* DESKTOP: side panel */}
      {selectedLocation && (
        <div className="hidden md:block w-80 shrink-0 h-full">
          <DetailPanel />
        </div>
      )}

      {/* MOBILE: bottom sheet */}
      {selectedLocation && (
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-[1000] max-h-[70vh] overflow-y-auto rounded-t-2xl shadow-2xl">
          <DetailPanel />
        </div>
      )}
    </div>
  )
}