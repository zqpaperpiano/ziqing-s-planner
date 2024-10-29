import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, CardMedia } from "@mui/material";

const QuestCard = ({questName}) => {

    const [pictureLink, setPictureLink] = useState("");

    const handleNewPictureLink = ({newPictureLink}) => {
        setPictureLink(newPictureLink);
    }

    return(
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={pictureLink}
                alt="insert picture here"
            />
            <CardContent>
                <h3>Complete {questName}!</h3>
                <p>Progress: </p>
            </CardContent>
            <CardActions>
                <Button size="small">Details</Button>
                <Button size="small">Delete</Button>
            </CardActions>
        </Card>
    );
}

export default QuestCard