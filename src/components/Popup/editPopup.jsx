import * as ReactLeaflet from "react-leaflet";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const { Popup } = ReactLeaflet;

export default function EditPopup({ entity, entityType, open, setOpen }) {
    const [settlement, setSettlement] = useState({
        id: '',
        name: '',
        longitude: '',
        latitude: ''
    });
    const [attraction, setAttraction] = useState({
        id: '',
        name: '',
        type: '',
        description: '',
        longitude: '',
        latitude: ''
    });

    function handleClose() {
        setOpen(false);
    }

    const isSettlement = (entityType === 'settlement');
    const title ='Edit' + (isSettlement) ? 'Edit settlement' : 'Edit attraction';

    const onSubmitHandler = (e) => {
        e.preventDefault();
        editEntity(isSettlement ? settlement : attraction);
    }

    async function editEntity(entity) {

    }


    return (
        <>
        <Popup autoPan={false} sx={{ maxWidth: "auto", maxHeight: "auto",}}>
            <Dialog
                open={open}
                onClose={handleClose.bind(this)}
                disablePortal
                sx={{
                    width: 350,
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
            >
                <DialogTitle>{title}</DialogTitle>
                <TextField 
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={(isSettlement) ? settlement.name : attraction.name}
                />
                { isSettlement === false &&(
                    <>
                        <TextField 
                            id="type"
                            label="Type of attraction"
                            type="text"
                            value={attraction.type}
                        />
                        <TextField 
                            id="description"
                            label="Description"
                            type="text"
                            value={attraction.description}
                        />
                    </>
                )}
                <TextField 
                    id="longitude"
                    label="Longitude"
                    type="text"
                    value={(isSettlement) ? settlement.longitude : attraction.longitude}
                />
                <TextField 
                    id="latitude"
                    label="Latitude"
                    type="text"
                    value={(isSettlement) ? settlement.latitude : attraction.latitude}
                />
            </Dialog>
        </Popup>
        </>
    )
}