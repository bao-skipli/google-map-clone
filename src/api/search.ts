import type { Place } from "../type/Place";

interface ResurltResponse {
    features: {
        geometry:{
            coordinates: number[];
        }
        properties: {
            mapbox_id: string;
            full_address: string;
        }
    }[]
}

export const search = async (term: string) => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN

    const res = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${term}&access_token=${token}`
    )

    const data: ResurltResponse = await res.json();

    const places: Place[] = data.features.map((feature) => {
        return {
            id: feature.properties.mapbox_id,
            name: feature.properties.full_address,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
        }
    })
    
    return places;
}