import SettlementPopup from "@components/Popup/settlementPopup";
import { useEffect, useState } from "react";
import { Marker, Tooltip } from "react-leaflet";

export default function Settlements({ ref }) {
    const [state, setState] = useState('');
    const [settlements, setSettlements] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [indexSelected, setIndexSelected] = useState(0);

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
                settlements.map((settlement, i) => {
                    return (
                        <Marker 
                          key={settlement.id} 
                          position={[Number(settlement.latitude), Number(settlement.longitude)]}
                          eventHandlers={{
                            click: () => { 
                                setIndexSelected(i)
                                setPopupOpen(true);
                             }
                          }}
                        >
                            <Tooltip>{settlement.name}</Tooltip>
                            <SettlementPopup settlement={settlements[indexSelected]} open={popupOpen} setOpen={setPopupOpen} />
                        </Marker>
                      )
                })
            )}
            
        </>
    );
}