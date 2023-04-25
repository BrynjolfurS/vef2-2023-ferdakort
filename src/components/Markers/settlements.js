import SettlementBox from "@components/InfoBox/settlementBox";
import { useEffect, useState } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";

export default function Settlements() {
    const [state, setState] = useState('');
    const [settlements, setSettlements] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);

    async function getAllSettlements() {
        setState('loading');

        const response = await fetch(
            `http://localhost:3001/settlements`
        );
        const data = await response.json();
        setSettlements(data);
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
        getAllSettlements();
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
                settlements.map((settlement) => {
                    return (
                        <Marker 
                          key={settlement.id} 
                          position={[Number(settlement.latitude), Number(settlement.longitude)]}
                          eventHandlers={{
                            click: () => { 

                                setPopupOpen(true);
                             }
                          }}
                        >
                        <Tooltip>{settlement.name}</Tooltip>
                        </Marker>
                      )
                })
            )}
            <SettlementBox settlement={settlements[4]} open={popupOpen} setOpen={setPopupOpen}/>
        </>
    )
}
// settlements.map((settlement) => {
//     {console.log([settlement.latitude, settlement.longitude])}
//     <Marker position={[settlement.latitude, settlement.longitude]}></Marker>
// })