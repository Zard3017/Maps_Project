import { useEffect } from 'react'
import useAppStore from '../store/useAppStore'

export const LOCATIONS = [
  { id: 1, name: 'Uhuru Park', category: 'Park', lat: -1.2883, lng: 36.8172, address: 'Nairobi CBD, Kenya', rating: 4.5, reviews: 210, description: 'A large urban park in the heart of Nairobi, great for morning walks, picnics and open-air events.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', highlights: ['Free entry', 'Open air', 'Events', 'Boating'] },
  { id: 2, name: 'Nairobi National Museum', category: 'Museum', lat: -1.2714, lng: 36.8118, address: 'Museum Hill, Nairobi', rating: 4.7, reviews: 340, description: "Kenya's foremost museum with exhibits on natural history, culture, and contemporary art.", image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&q=80', highlights: ['Art gallery', 'History', 'Snake park', 'Garden'] },
  { id: 3, name: 'Karura Forest', category: 'Park', lat: -1.2345, lng: 36.8297, address: 'Limuru Rd, Nairobi', rating: 4.8, reviews: 512, description: 'An urban forest reserve offering cycling trails, waterfalls, caves and picnic spots.', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80', highlights: ['Cycling', 'Waterfall', 'Bird watching', 'Trails'] },
  { id: 4, name: 'Java House Westlands', category: 'Cafe', lat: -1.2677, lng: 36.8066, address: 'Westlands, Nairobi', rating: 4.3, reviews: 187, description: 'Popular Kenyan coffee chain with excellent espresso, all-day breakfast and fast Wi-Fi.', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80', highlights: ['Coffee', 'Wi-Fi', 'Breakfast', 'Outdoor seating'] },
  { id: 5, name: 'Village Market', category: 'Shopping', lat: -1.2286, lng: 36.8076, address: 'Gigiri, Nairobi', rating: 4.4, reviews: 299, description: 'Upscale mall with shops, restaurants, a casino, water park and cultural market stalls.', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80', highlights: ['Mall', 'Restaurants', 'Water park', 'Market'] },
  { id: 6, name: 'Nairobi Railway Museum', category: 'Museum', lat: -1.2982, lng: 36.8228, address: 'Station Rd, Nairobi', rating: 4.1, reviews: 143, description: 'Fascinating outdoor museum preserving the history of the East African Railway.', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80', highlights: ['History', 'Trains', 'Photography', 'Colonial era'] },
  { id: 7, name: 'Carnivore Restaurant', category: 'Restaurant', lat: -1.3226, lng: 36.7991, address: 'Langata Rd, Nairobi', rating: 4.6, reviews: 628, description: 'World-famous Nairobi institution known for exotic grilled meats and a vibrant atmosphere.', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', highlights: ['BBQ', 'Exotic meats', 'Cocktails', 'Live music'] },
  { id: 8, name: 'The Hub Karen', category: 'Shopping', lat: -1.3389, lng: 36.7087, address: 'Karen, Nairobi', rating: 4.5, reviews: 231, description: 'Modern open-air lifestyle mall in Karen with boutiques, restaurants and a cinema.', image: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=600&q=80', highlights: ['Cinema', 'Boutiques', 'Food court', 'Parking'] },
  { id: 9, name: 'Nairobi National Park', category: 'Attraction', lat: -1.3600, lng: 36.8500, address: 'Langata, Nairobi', rating: 4.9, reviews: 1024, description: 'The world\'s only wildlife reserve bordering a capital city. Home to lions, rhinos, giraffes and over 400 bird species.', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80', highlights: ['Safari', 'Wildlife', 'Rhinos', 'Photography'] },
  { id: 10, name: 'David Sheldrick Wildlife Trust', category: 'Attraction', lat: -1.3712, lng: 36.7487, address: 'Mbagathi Rd, Nairobi', rating: 4.8, reviews: 876, description: 'Renowned elephant orphanage where you can watch rescued baby elephants being fed and bathed.', image: 'https://images.unsplash.com/photo-1551206190-4f9d5baf2b3a?w=600&q=80', highlights: ['Elephants', 'Conservation', 'Kids friendly', 'Guided tours'] },
  { id: 11, name: 'Westgate Shopping Mall', category: 'Shopping', lat: -1.2631, lng: 36.8040, address: 'Westlands, Nairobi', rating: 4.2, reviews: 415, description: 'Premium shopping mall in Westlands with international brands, restaurants and a cinema.', image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=600&q=80', highlights: ['International brands', 'Cinema', 'Restaurants', 'Parking'] },
  { id: 12, name: 'Sankara Nairobi', category: 'Hotel', lat: -1.2656, lng: 36.8041, address: 'Westlands, Nairobi', rating: 4.7, reviews: 562, description: 'Contemporary 5-star hotel in Westlands with rooftop pool, multiple restaurants and a spa.', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', highlights: ['Rooftop pool', 'Spa', 'Fine dining', 'City views'] },
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
