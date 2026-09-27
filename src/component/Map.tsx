import 'leaflet/dist/leaflet.css'
import type { Place } from "../type/Place"
import { Map as LeafletMap } from 'leaflet'
import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

interface MapProps {
    place: Place | null
}

export default function Map({ place }: MapProps) {
    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        if (mapRef.current && place) {
            mapRef.current.flyTo([place.latitude, place.longitude]);
        }
    }, [place])

    return <MapContainer ref={mapRef} center={[10.7725, 106.6980]} zoom={15} scrollWheelZoom className="h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {place && <Marker position={[place.latitude, place.longitude]} />}
    </MapContainer>
}