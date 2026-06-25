import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, Menu, X, Bookmark, MapPin } from 'lucide-react'
import useAppStore from '../store/useAppStore'
import { CATEGORIES } from '../hooks/useLocations'

export default function Navbar() {
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory, showFilters, toggleFilters } = useAppStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [localQ, setLocalQ] = useState(searchQuery)
  const timer = useRef(null)

  const handleSearch = (val) => {
    setLocalQ(val)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setSearchQuery(val), 300)
  }

  return (
    <div className="relative z-[2000]">
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 shrink-0">
            <img
              src="/images/Birdlife-logo.png"
              alt="BirdLife Africa"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Search */}
          <div className="flex-1 relative max-w-xl">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={localQ}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for places, cities, or activities..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
            {localQ && (
              <button onClick={() => { setLocalQ(''); setSearchQuery('') }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filters button */}
          <button
            onClick={toggleFilters}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border transition-colors ${showFilters ? 'bg-sky-50 border-sky-300 text-sky-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:block">Filters</span>
          </button>

          {/* Menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Filter bar */}
        {showFilters && (
          <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide border-t border-gray-100 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${activeCategory === cat
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-sky-300 hover:text-sky-600'}`}
              >
                {cat === 'all' ? 'All places' : cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-[2000] w-48 py-1">
          <Link to="/" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            <MapPin size={15} /> Explore map
          </Link>
          <Link to="/saved" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            <Bookmark size={15} /> Saved places
          </Link>
        </div>
      )}
    </div>
  )
}