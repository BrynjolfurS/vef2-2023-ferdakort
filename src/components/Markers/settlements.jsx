import SettlementPopup from "@components/Popup/settlementPopup";
import { useEffect, useState } from "react";
import { Marker, Tooltip } from "react-leaflet";

const apiURL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;

export default function Settlements({ ref }) {
    const [state, setState] = useState('');
    const [settlements, setSettlements] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [indexSelected, setIndexSelected] = useState(0);

    async function getAllSettlements() {
        setState('loading');

        const response = await fetch(
            `${apiURL}settlements`
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

    function updateSettlement(modifiedSettlement) {
        const setToReplaceIndex = settlements.findIndex((e) => e.id === modifiedSettlement[0].id);
        const newSettlements = settlements.slice();
        newSettlements[setToReplaceIndex] = modifiedSettlement[0];
        setSettlements(newSettlements);
    }

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
                            <SettlementPopup updateSettlement={updateSettlement} settlement={settlements[indexSelected]} open={popupOpen} setOpen={setPopupOpen} disableEdit={false} />
                        </Marker>
                      )
                })
            )}
            
        </>
    );
}