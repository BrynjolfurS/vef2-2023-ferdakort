import * as ReactLeaflet from "react-leaflet";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditPopup from "./editPopup";
import { Backdrop } from "@mui/material/Backdrop";
import { useState } from "react";

const { Popup } = ReactLeaflet;

export default function SettlementPopup({ deleteSettlement, updateSettlement, settlement, open, setOpen, disableEdit }) {
    const [edit, setEdit] = useState(false);
    // const map = ReactLeaflet.useMap();

    function handleClose() {
        setOpen(false);
    }

    function settlementDeleted(myId) {
        handleClose();
        deleteSettlement(myId);
    }

    return (
        <>
            {edit === true &&(
                <>
                <EditPopup del={settlementDeleted} update={updateSettlement} entity={settlement} entityType={'settlement'} open={edit} setOpen={setEdit}/>
                </>
            )}
            {edit === false && open === true &&(
                <Popup autoPan={false} sx={{ maxWidth: "auto",}}>
                    <Modal
                        open={open}
                        onClose={handleClose.bind(this)}
                        disablePortal
                        slots={{backdrop: Backdrop}}
                        slotProps={{backdrop: {
                            timeout: 0,
                            invisible: true
                        }}}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Card sx={{
                            width: 300,
                            maxWidth: 345,
                            backgroundColor: '#E7E7E7',
                            padding: 0,
                            }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" 
                                    color={"#FFFFFF"} 
                                    sx={{
                                        backgroundColor: '#3E3E3E',
                                        padding: '16px',
                                    }}
                                >
                                    {settlement.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" sx={{ paddingLeft: '16px',}}>
                                    Búa til stutt description fyrir byggðir?
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => {
                                    console.log(open);
                                    setEdit(true);
                                }}
                                >
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    </Modal>
                </Popup>
            )}
        </>
    );
}