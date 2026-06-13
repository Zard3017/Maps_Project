import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SavedPage from './pages/SavedPage'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
      </div>
    </div>
  )
}
