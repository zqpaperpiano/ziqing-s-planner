import React, {useState} from "react";
import { Button, CardActions, CardMedia } from "@mui/material";
import defImage from '../../../images/def-quest-image.jpg';

const QuestCard = ({quest}) => {
    // console.log({quest});
    const imageSrc = quest.questImage || defImage;
    // console.log('quest card;', {quest});    

    return(
            <div className="h-full bg-white border border-black-200 rounded overflow-hidden">
                <div className="h-1/2 w-full border-b border-black-700">
                    <img className="h-full w-full object-cover" src={imageSrc}/>
                </div>
                <div className="relative h-1/2 w-full flex flex-col items-center mt-2">
                    <h1 className="text-xl font-bold">{quest.questName}</h1>
                    <p>{quest.questDescription}</p>
                    <p>Completion percentage: {quest.completionPercentage * 100}%</p>
                    <div className="absolute flex bottom-2 ">
                        <Button>View Details</Button>
                        <Button>Delete Quest</Button>
                    </div>
                </div>
            </div>
    );
}

export default QuestCard