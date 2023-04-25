import { Popup } from "react-leaflet"

export default function SettlementBox({ settlement, open, setOpen }) {

    function handleClose() {
        setOpen(false);
    }


    return (
        <>  
        <Popup autoPan={false}>
            
        </Popup>
        </>
    );
}