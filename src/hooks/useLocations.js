import { useEffect } from 'react'
import useAppStore from '../store/useAppStore'

export const LOCATIONS = [
  
  {
  id: 1, name: 'Nigeria', category: 'Park',
  lat: 6.0, lng: 9.2, country: 'Nigeria',
  address: 'Cross River State, southeastern Nigeria',
  //rating: 4.8, reviews: 214,
  description: 'Cross River State Forests are in southeastern Nigeria, along the border with Cameroon. They include Cross River National Park, Afi Mountain Wildlife Sanctuary,and multiple forest reserves, covering parts of Boki,Obanliku, and other local government areas.Together, these forests span 0.85 million hectares(8,500 km²) of lowland and montane tropicalrainforest, forming part of the Guinean Forests ofWest Africa Biodiversity Hotspot. The area provideshabitat for endangered species such as the Cross River gorilla and serves as the source of important rivers that support local communities andecosystems. ',
  image: '/images/Crossriversforest.png',
  highlights: ['Cross River Gorilla', 'Bird watching', 'Rainforest', 'Wildlife'],
},
]

export const CATEGORIES = ['all', 'Park', 'Museum', 'Cafe', 'Restaurant', 'Shopping', 'Hotel', 'Attraction']

export default function useLocations() {
  const { setLocations, searchQuery, activeCategory } = useAppStore()

  useEffect(() => {
    useAppStore.setState({ locations: LOCATIONS })
  }, [])

  const locations = useAppStore((s) => s.locations) || LOCATIONS

  const filtered = locations.filter((loc) => {
    const matchCat = activeCategory === 'all' || loc.category === activeCategory
    const matchQ = !searchQuery ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchQ
  })

  return { locations: filtered, allLocations: LOCATIONS }
}
