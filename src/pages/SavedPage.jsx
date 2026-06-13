import { MapPin, Star, Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import useAppStore from '../store/useAppStore'
import useLocations from '../hooks/useLocations'

export default function SavedPage() {
  const { savedIds, toggleSaved, setSelectedLocation } = useAppStore()
  const { allLocations } = useLocations()

  const saved = allLocations.filter((l) => savedIds.includes(l.id))

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Bookmark size={28} className="text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">No saved places yet</h2>
        <p className="text-gray-500 text-sm mt-1 max-w-xs">
          Tap the save button on any place to bookmark it here for easy access later.
        </p>
        <Link to="/" className="mt-4 px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 transition-colors">
          Explore the map
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">Saved places ({saved.length})</h1>
      <div className="space-y-3">
        {saved.map((loc) => (
          <div key={loc.id} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4">
            {loc.image && (
              <img src={loc.image} alt={loc.name}
                className="w-20 h-20 rounded-lg object-cover shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{loc.name}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <MapPin size={11} /> {loc.address}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-xs text-gray-600">{loc.rating} · {loc.category}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{loc.description}</p>
            </div>
            <div className="flex flex-col justify-between items-end shrink-0">
              <button onClick={() => toggleSaved(loc.id)} className="text-sky-500 hover:text-sky-600">
                <Bookmark size={16} className="fill-sky-500" />
              </button>
              <Link to="/" onClick={() => setSelectedLocation(loc)}
                className="text-xs text-sky-500 hover:underline">View on map</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
