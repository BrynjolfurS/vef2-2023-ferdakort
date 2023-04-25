import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

export default function Attractions() {
    const [state, setState] = useState('');
    const [attractions, setAttractions] = useState([]);
    const [markerClicked, setMarkerClicked] = useState(0);

    async function getAllAttractions() {
        setState('loading');

        const response = await fetch(
            `http://localhost:3001/attractions`
        );
        const data = await response.json();
        setAttractions(data);
        if (data) {
            setState('data');
        } else {
            setState('empty');
        }
        return {
            props: {
                data,
            },
        };
    }

    useEffect(() => {
        getAllAttractions();
    }, []);
    return (
        <>
            {state === 'loading' &&(
                <p>Búa til LOADING marker</p>
            )}
            {state === 'empty' &&(
                <p>Búa til failed marker/msg</p>
            )}
            {state === 'data' &&(
                attractions.map((attraction) => {
                    return (
                        <Marker 
                            key={attraction.id} 
                            position={[Number(attraction.latitude), Number(attraction.longitude)]}
                            eventHandlers={{
                                click: () => {
                                setMarkerClicked(attraction.id);
                                }
                            }}
                        >
                        <Popup>
                            <h2>{attraction.name}</h2>
                            <p>{attraction.type}</p>
                            <p>{attraction.description}</p>
                        </Popup>
                        </Marker>
                      )
                })
            )}
        </>
    )
}