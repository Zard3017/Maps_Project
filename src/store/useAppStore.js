import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set) => ({
      // Map
      mapCenter: [-1.2921, 36.8219],
      mapZoom: 13,
      setMapCenter: (center) => set({ mapCenter: center }),
      setMapZoom: (zoom) => set({ mapZoom: zoom }),

      // Locations (static data loaded once)
      locations: [],
      setLocations: (locations) => set({ locations }),

      // Selected pin → opens detail panel
      selectedLocation: null,
      setSelectedLocation: (location) => set({ selectedLocation: location }),
      clearSelectedLocation: () => set({ selectedLocation: null }),

      // Search & filters
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      activeCategory: 'all',
      setActiveCategory: (cat) => set({ activeCategory: cat }),
      showFilters: false,
      toggleFilters: () => set((s) => ({ showFilters: !s.showFilters })),

      // Saved places — persisted to localStorage
      savedIds: [],
      toggleSaved: (id) =>
        set((s) => ({
          savedIds: s.savedIds.includes(id)
            ? s.savedIds.filter((i) => i !== id)
            : [...s.savedIds, id],
        })),
    }),
    {
      name: 'explore-app-storage',
      partialize: (s) => ({ savedIds: s.savedIds }),
    }
  )
)

export default useAppStore
