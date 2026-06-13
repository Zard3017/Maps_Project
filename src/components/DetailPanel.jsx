import { X, MapPin, Star, Phone, Globe, Bookmark, Share2, Navigation, ExternalLink } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const CATEGORY_COLORS = {
  Park: 'bg-green-100 text-green-700',
  Museum: 'bg-purple-100 text-purple-700',
  Cafe: 'bg-amber-100 text-amber-700',
  Restaurant: 'bg-red-100 text-red-700',
  Shopping: 'bg-blue-100 text-blue-700',
  Hotel: 'bg-cyan-100 text-cyan-700',
  Attraction: 'bg-fuchsia-100 text-fuchsia-700',
  default: 'bg-sky-100 text-sky-700',
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
      <span className="text-sm font-medium text-gray-900 ml-1">{rating}</span>
    </div>
  )
}

export default function DetailPanel() {
  const { selectedLocation, clearSelectedLocation, savedIds, toggleSaved, setMapCenter, setMapZoom } = useAppStore()

  if (!selectedLocation) return null

  const loc = selectedLocation
  const isSaved = savedIds.includes(loc.id)
  const catColor = CATEGORY_COLORS[loc.category] || CATEGORY_COLORS.default

  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`, '_blank')
  }

  const handleShare = () => {
    const url = `${window.location.origin}?place=${loc.id}`
    if (navigator.share) {
      navigator.share({ title: loc.name, text: loc.description, url })
    } else {
      navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
  }

  const handleFlyTo = () => {
    setMapCenter([loc.lat, loc.lng])
    setMapZoom(16)
  }

  return (
    <div className="detail-panel w-full h-full bg-white flex flex-col overflow-hidden border-l border-gray-200">
      {/* Image */}
      <div className="relative h-48 shrink-0 bg-gray-100">
        {loc.image ? (
          <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">🗺️</div>
        )}
        <button
          onClick={clearSelectedLocation}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white shadow-sm"
        >
          <X size={16} />
        </button>
        <span className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${catColor}`}>
          {loc.category}
        </span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <h2 className="text-lg font-semibold text-gray-900 leading-snug">{loc.name}</h2>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
            <MapPin size={13} />
            <span>{loc.address}</span>
            <button onClick={handleFlyTo} className="ml-1 text-sky-500 hover:text-sky-600">
              <ExternalLink size={11} />
            </button>
          </div>

          <div className="mt-2">
            <StarRating rating={loc.rating} />
            <span className="text-xs text-gray-400 mt-0.5 block">({loc.reviews} reviews)</span>
          </div>

          {/* Description */}
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">{loc.description}</p>

          {/* Contact */}
          {(loc.phone || loc.website) && (
            <div className="mt-3 space-y-1">
              {loc.phone && (
                <a href={`tel:${loc.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-sky-600">
                  <Phone size={13} /> {loc.phone}
                </a>
              )}
              {loc.website && (
                <a href={loc.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-sky-500 hover:text-sky-600">
                  <Globe size={13} /> Visit website
                </a>
              )}
            </div>
          )}

          {/* Highlights */}
          {loc.highlights?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Highlights</p>
              <div className="grid grid-cols-2 gap-2">
                {loc.highlights.map((h) => (
                  <div key={h} className="bg-gray-50 border border-gray-100 rounded-lg p-2.5 text-xs text-gray-700 text-center font-medium">
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-100 space-y-2 shrink-0">
        <button
          onClick={handleGetDirections}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Navigation size={15} /> Get directions
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => toggleSaved(loc.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 border text-sm font-medium rounded-lg transition-colors ${isSaved ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            <Bookmark size={14} className={isSaved ? 'fill-sky-500' : ''} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>
    </div>
  )
}
