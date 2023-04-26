import { useEffect, useState } from "react";
import { Marker, Tooltip } from "react-leaflet";
import AttractionPopup from "@components/Popup/attractionPopup";

export default function Attractions() {
    const [state, setState] = useState('');
    const [attractions, setAttractions] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [indexSelected, setIndexSelected] = useState(0);

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
                attractions.map((attraction, i) => {
                    return (
                        <Marker 
                            key={attraction.id} 
                            position={[Number(attraction.latitude), Number(attraction.longitude)]}
                            eventHandlers={{
                                click: () => {
                                setIndexSelected(i)
                                setPopupOpen(true);
                                }
                            }}
                        >
                            <Tooltip>{attraction.name}</Tooltip>
                            <AttractionPopup attraction={attractions[indexSelected]} open={popupOpen} setOpen={setPopupOpen}/>
                        </Marker>
                      )
                })
            )}
        </>
    )
}