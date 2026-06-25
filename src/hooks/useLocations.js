import { useEffect } from 'react'
import useAppStore from '../store/useAppStore'

export const LOCATIONS = [
  
  {
  id: 1, name: 'Nigeria', category: 'Forest',
  lat: 6.0, lng: 9.2, country: 'Nigeria',
  address:'Cross River State, southeastern Nigeria',
  description: 'Cross River State Forests are in southeastern Nigeria, along the border with Cameroon. They include Cross River National Park, Afi Mountain Wildlife Sanctuary,and multiple forest reserves, covering parts of Boki, Obanliku, and other local government areas.Together, these forests span 0.85 million hectares(8,500 km²) of lowland and montane tropical rainforest, forming part of the Guinean Forests of West Africa Biodiversity Hotspot. The area provides habitat for endangered species such as the Cross River gorilla and serves as the source of important rivers that support local communities and ecosystems. Cross River State’s Pristine Rainforest is one of the world’s 25 biodiversity hotspots and a Centre of endemic species. It holds 0.85 million hectares of tropical high forest, the largest remaining rainforest in West Africa and the largest tract of tropical high forest in Nigeria. The lowland rainforest is rich in wildlife, supporting primates such as galagos, pottos, monkeys of the genera Cercopithecus and Cercocerbus, great apes including chimpanzees and lowland gorillas. Other notable fauna includes forest elephants and buffaloes.',
  image: '/images/Crossriversforest.png',
  highlights: ['Cross River Gorilla', 'Bird watching', 'Rainforest', 'Wildlife'],
  },

  {
  id: 2, name: 'Tanzania', category: 'Lake',
  lat: -2.4167, lng: 36.0667, country: 'Tanzania',
  address: 'Northern Tanzania, near Kenyan border',
  description: 'Lake Natron, a striking and ecologically significant salt and soda ash lake, graces the landscape of Northern Tanzania. Nestled strategically between Longido, Ngorongoro, and Monduli Districts, it lies proximate to the Kenyan border, forming a unique and vital part of the regions natural heritage. This saline expanse characterized by its high alkalinity and mineral content, plays a critical role in supporting diverse avian populations, most notably the Lesser Flamingo and other migratory birds, while also presenting a fascinating, albeit fragile, ecosystem. This site important because East Africa has 1.5-2.5 million lesser flamingos,which constitutes 75% of the global population of the species, and most are hatched at Lake Natron. Lesser Flamingos are listed as Near Threatened on the IUCN Red List. Near Threatened means the species is not currently considered to be facing immediate extinction, but its situation is precarious. Existence of these iconicbird species and the lakes’support to their breeding triggered the lake’s global recognition as an Important Bird Area/Key Biodiversity Area (IBA/KBA). The Lake was also listed as a Ramsar Site, a Wetland of International Importance in 2004 because of its significance to people, nature and climate.',
  image: '/images/LakeNatron.png',
  highlights: ['Lesser Flamingos', 'Ramsar Site', 'Key Biodiversity Area', 'Migratory Birds'],
},

{
    id: 3, name: 'Ghana', category: 'Forest',
    lat: 6.2000, lng: -0.5500, country: 'Ghana',
    address: 'Eastern Region, near Kibi, Ghana',
    description: 'The Atewa Range Forest Reserve is in southeastern Ghana, near the town of Kibi in the Eastern Region. The forest reserve has approximately 17,400 hectares of upland evergreen forest, characterized by steep sided hills with relatively flat summits. It serves as the source of three major rivers: the Ayensu, Birim, and Densu. Atewa Forest is a globally significant biodiversity hotspot, home to rare and endangered species like the endangered White-naped Mangabey and the Critically Endangered Togo slippery frog. It serves as a critical water source for over five million Ghanaians, one million residents in Accra and acts as a carbon sink, contributing to climate change mitigation. It also directly supplies water to numerous communities surrounding the forest, such as Asiakwa, where one pumping station alone serves over 3000 residents. It is also recognized as an Important Bird Area (IBA) due to its exceptional bird diversity. Home to over 100 bird species such as the vulnerable Nimba Flycatcher and the near threatened Green-tailed Bristlebill, Atewa is a sanctuary of irreplaceable avian life. Protecting Atewa means protecting the delicate ecosystems that sustain these unique species and preserving a vital part of Ghana\'s and Africa\'s natural heritage. Conservation efforts include preventing bauxite mining, which threatens biodiversity, water security, and local livelihoods. Environmental groups are advocating for its designation as a national park, promoting eco-tourism and sustainable alternatives. With international support, legal action, and nature based solutions, Atewa remains a key focus for global conservation efforts.',
    image: '/images/Atewa.png',
    highlights: ['Biodiversity Hotspot', 'Important Bird Area', 'Water Source', 'Conservation'],
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
