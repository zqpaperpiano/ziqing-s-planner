import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, CardMedia } from "@mui/material";

const QuestCard = ({quest}) => {
    console.log('quest card;', {quest});

    return(
            <div className="bg-white border border-black-200 rounded">
                <div className="h-1/2 w-full border-b border-black-700">
                </div>
            </div>
    );
}

export default QuestCard