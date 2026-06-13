import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import useAppStore from '../store/useAppStore'
import useLocations from '../hooks/useLocations'

// Fix leaflet default icon path issue with Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const CATEGORY_COLORS = {
  Park: '#16a34a',
  Museum: '#7c3aed',
  Cafe: '#d97706',
  Restaurant: '#dc2626',
  Shopping: '#0284c7',
  Hotel: '#0891b2',
  Attraction: '#c026d3',
  default: '#0ea5e9',
}

function createCustomIcon(category, isSelected) {
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.default
  const size = isSelected ? 40 : 32
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 40 40">
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.25)"/>
      </filter>
      <circle cx="20" cy="18" r="${isSelected ? 14 : 11}" fill="${color}" filter="url(#shadow)" />
      <circle cx="20" cy="18" r="${isSelected ? 10 : 7}" fill="white" opacity="0.3"/>
      <polygon points="20,${isSelected ? 36 : 30} ${isSelected ? 14 : 16},${isSelected ? 26 : 22} ${isSelected ? 26 : 24},${isSelected ? 26 : 22}" fill="${color}" filter="url(#shadow)"/>
    </svg>`
  return L.divIcon({
    html: svg,
    className: 'custom-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}

function MapController() {
  const map = useMap()
  const { mapCenter, mapZoom } = useAppStore()
  useEffect(() => {
    map.setView(mapCenter, mapZoom, { animate: true })
  }, [mapCenter, mapZoom])
  return null
}

function LocateControl() {
  const map = useMap()
  const locate = () => {
    map.locate({ setView: true, maxZoom: 15 })
    map.once('locationfound', (e) => {
      useAppStore.getState().setMapCenter([e.latlng.lat, e.latlng.lng])
    })
  }
  return (
    <div className="leaflet-bottom leaflet-left" style={{ marginBottom: '80px' }}>
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={locate}
          title="My location"
          className="flex items-center justify-center w-8 h-8 bg-white hover:bg-gray-50 text-gray-700 text-lg"
        >⊕</button>
      </div>
    </div>
  )
}

function SatelliteToggle({ satellite, setSatellite }) {
  return (
    <div className="absolute bottom-4 left-4 z-[1000]">
      <button
        onClick={() => setSatellite(!satellite)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium shadow-sm transition-colors ${satellite ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
      >
        🛰️ Satellite
      </button>
    </div>
  )
}

export default function MapView({ satellite, setSatellite }) {
  const { mapCenter, mapZoom, selectedLocation, setSelectedLocation } = useAppStore()
  const { locations } = useLocations()

  const tileUrl = satellite
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  const tileAttr = satellite
    ? 'Tiles &copy; Esri'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer url={tileUrl} attribution={tileAttr} />
        <ZoomControl position="topleft" />
        <MapController />
        <LocateControl />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={createCustomIcon(loc.category, selectedLocation?.id === loc.id)}
            eventHandlers={{
              click: () => setSelectedLocation(loc),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-medium">{loc.name}</p>
                <p className="text-gray-500 text-xs">{loc.category}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <SatelliteToggle satellite={satellite} setSatellite={setSatellite} />
    </div>
  )
}
