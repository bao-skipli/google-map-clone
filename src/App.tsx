import { useState } from 'react'
import './App.css'
import LocationSearch from './component/LocationSearch'
import Map from './component/Map'
import type { Place } from './type/Place'

function App() {
  const [place, setPlace] = useState<Place | null>(null);
  return (
    <div className="h-screen w-screen grid grid-cols-[340px_1fr] bg-stone-100">
      <aside className="min-h-0 border-r border-stone-200 bg-white">
        <LocationSearch selectedId={place?.id} onPlaceClick={setPlace} />
      </aside>
      <div className="h-full min-h-0">
        <Map place={place} />
      </div>
    </div>
  )
}

export default App
