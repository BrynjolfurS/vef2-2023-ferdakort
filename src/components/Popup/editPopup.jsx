import * as ReactLeaflet from "react-leaflet";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "@components/Popup/InfoBox.module.scss"
import { useEffect, useState } from "react";

const { Popup } = ReactLeaflet;
const apiURL = process.env.NEXT_PUBLIC_RAILWAY_API_BASE_URL;

export default function EditPopup({ loggedInUser, del, update, entity, entityType, open, setOpen }) {
    function handleClose() {
        setOpen(false);
    }

    const [settlement, setSettlement] = useState({
        id: '',
        name: '',
        description: '',
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

    

    const isSettlement = (entityType === 'settlement');
    const title ='Edit' + (isSettlement) ? 'Edit settlement' : 'Edit attraction';

    const handleInputChange = (e) => {
        const { target } = e;
        const value = target.value;
        const field = target.id;

        if (isSettlement) {
            setSettlement(prevState => ({
                ...prevState,
                ...{[field]: value}
            }));
        } else {
            setAttraction(prevState => ({
                ...prevState,
                ...{[field]: value}
            }));
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (isSettlement) {
            editSettlement(settlement);
        } else {
            editAttraction(attraction);
        }
    }

    async function editSettlement(s) {
        try {
            const response = await fetch(`${apiURL}settlements/${entity.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: s.name ? s.name : entity.name,
                    description: s.description ? s.description : entity.description,
                    longitude: s.longitude ? s.longitude : entity.longitude,
                    latitude: s.latitude ? s.latitude : entity.latitude,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }

            const settlement = await response.json();
            if (settlement) {
                console.log('settlement successfully updated');
                update(settlement);
            }
        } catch (e) {
            console.warn('error editing settlement: ', e);
        }
    }

    async function editAttraction(a) {
        try {
            const response = await fetch(`${apiURL}attractions/${entity.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: a.name ? a.name : entity.name,
                    type: a.type ? a.type : entity.type,
                    description: a.description ? a.description : entity.description,
                    longitude: a.longitude ? a.longitude : entity.longitude,
                    latitude: a.latitude ? a.latitude : entity.latitude,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }

            const attraction = await response.json();
            if (attraction) {
                console.log('attraction successfully updated');
                update(attraction);
            }
        } catch (e) {
            console.warn('error editing attraction: ', e);
        }
    }

    async function deleteEntity(e) {
        const targetUrl = isSettlement ? `${apiURL}settlements/${entity.id}` : `${apiURL}attractions/${entity.id}`;
        try {
            const response = await fetch(targetUrl, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('result not ok');
            }

            const deletedEntityId = await response.json();
            if (deletedEntityId) {
                console.log('Entity successfully deleted');
                handleClose();
                del(deletedEntityId);
            }
        } catch (e) {
            console.warn('unable to delete entity');
        }
    }


    return (
        <>
        <Popup autoPan={false} sx={{ maxWidth: "auto", maxHeight: "auto",}}>
            <Modal
                open={open}
                onClose={handleClose.bind(this)}
                disablePortal
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}          
            >
                <div className={styles.form_container}>
                    <form className={styles.editForm} onSubmit={onSubmitHandler}>
                        <div className={styles.editForm_input}>
                            <label className={styles.editForm_input_label} for="name">Name: {entity.name} </label>
                            <input className={styles.editForm_input_textArea} 
                            id="name" 
                            name="name" 
                            type="text" 
                            value={isSettlement ? settlement.name : attraction.name} 
                            onChange={handleInputChange}
                        />
                        </div>
                        {isSettlement === false &&(
                            <>
                                <div className={styles.editForm_input}>
                                    <label className={styles.editForm_input_label} for="type">Type: {entity.type}</label>
                                    <input className={styles.editForm_input_textArea} id="type" name="type" type="text" value={attraction.type} onChange={handleInputChange}/>
                                </div>
                            </>
                        )}
                        <label className={styles.editForm_input_label} for="description">Description: </label>
                            <p>{entity.description}</p>
                            <div className={styles.editForm_input}>
                            <input className={styles.editForm_input_textArea} id="description" name="description" type="text" value={isSettlement ? settlement.description : attraction.description} onChange={handleInputChange}/>
                        </div>
                        <div className={styles.editForm_input}>
                            <label className={styles.editForm_input_label} for="longitude">Longitude: {entity.longitude}</label>
                            <input className={styles.editForm_input_textArea} id="longitude" name="longitude" type="text" value={isSettlement ? settlement.longitude : attraction.longitude} onChange={handleInputChange}/>
                        </div>
                        <div className={styles.editForm_input}>
                            <label className={styles.editForm_input_label} for="latitude">Latitude: {entity.latitude}</label>
                            <input className={styles.editForm_input_textArea} id="latitude" name="latitude" type="text" value={isSettlement ? settlement.latitude : attraction.latitude} onChange={handleInputChange}/>
                        </div>
                            <button className={styles.editForm_submit_button}>Send</button>
                    </form>
                    <hr className={styles.editForm_divider}/>
                    <div className={styles.editForm_buttonRow}>
                        <button className={styles.editForm_delete_button} onClick={() => deleteEntity() }>Delete</button>
                        <button className={styles.editForm_submit_button} onClick={() => handleClose()}>Close</button>
                    </div>
                </div>
            </Modal>
        </Popup>
        </>
    )
}