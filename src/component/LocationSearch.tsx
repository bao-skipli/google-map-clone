import { useState } from "react"
import type { Place } from "../type/Place"
import { search } from "../api/search";

interface LocationSearchProps {
    onPlaceClick: (place: Place) => void;
    selectedId?: string;
}

export default function LocationSearch({ onPlaceClick, selectedId }: LocationSearchProps) {
    const [places, setPlaces] = useState<Place[]>([])
    const [term, setTerm] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await search(term);
        setPlaces(result);
    }

    return <div className="flex h-full flex-col">
        <div className="border-b border-stone-200 px-5 py-5">
            <h1 className="text-lg font-semibold text-stone-900">Location search</h1>
            <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
                <label className="text-sm font-medium text-stone-700" htmlFor="term">
                    Search
                </label>
                <input
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    type="text"
                    id="term"
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                    placeholder="Address or longitude, latitude"
                />
                <button
                    className="cursor-pointer rounded-lg bg-stone-900 px-3 py-2 text-sm font-medium text-white hover:bg-stone-700"
                    type="submit"
                >
                    Search
                </button>
            </form>
        </div>
        <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
            <h2 className="text-sm font-medium text-stone-700">
                {places.length > 0 ? `Found ${places.length}` : "Results"}
            </h2>
            {places.length === 0 ? (
                <p className="mt-3 text-sm text-stone-400">No places yet.</p>
            ) : (
                <div className="mt-3 flex flex-col gap-2 overflow-y-auto">
                    {places.map(place => {
                        const selected = place.id === selectedId
                        return <button
                            key={place.id}
                            type="button"
                            className={`w-full cursor-pointer rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${selected ? "border-indigo-500 bg-indigo-50 text-indigo-950" : "border-stone-200 bg-white text-stone-600 hover:border-stone-400 hover:bg-stone-50 hover:text-stone-900"}`}
                            onClick={() => onPlaceClick(place)}
                        >
                            {place.name}
                        </button>
                    })}
                </div>
            )}
        </div>
    </div>
}