import * as ReactLeaflet from "react-leaflet";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const { Popup } = ReactLeaflet;

export default function AttractionPopup({ attraction, open, setOpen }) {

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
        <Popup autoPan={false} sx={{ maxWidth: "auto", }}>
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
                        <Typography 
                            gutterBottom 
                            variant="h5" 
                            component="h2" 
                            color={"#FFFFFF"} 
                            sx={{
                                backgroundColor: '#3E3E3E',
                                padding: '16px',
                            }}
                        >
                            {attraction.name}
                        </Typography>
                        <Typography variant="subtitle1" component="p" sx={{ paddingLeft: '16px',}}>
                            {attraction.type}
                        </Typography>
                        <Typography variant="body2" component="p" sx={{ paddingLeft: '16px',}}>
                            {attraction.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            ADMIN - edit
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </Popup>
        </>
    )
}