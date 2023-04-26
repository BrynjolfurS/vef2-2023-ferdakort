import * as ReactLeaflet from "react-leaflet";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditPopup from "./editPopup";
import { useState } from "react";

const { Popup } = ReactLeaflet;

export default function SettlementPopup({ settlement, open, setOpen }) {
    const [edit, setEdit] = useState(false);

    function handleClose() {
        setOpen(false);
    }

    //@material-ui/core
    return (
        <>
            {edit === true &&(
                <EditPopup entity={settlement} entityType={'settlement'} open={edit} setOpen={setEdit}/>
            )}
            {edit === false &&(
                <Popup autoPan={false} sx={{ maxWidth: "auto",}}>
                    <Modal
                        open={open}
                        onClose={handleClose.bind(this)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        disablePortal
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
                                <Button size="small" color="primary" onClick={() => setEdit(true) }>
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