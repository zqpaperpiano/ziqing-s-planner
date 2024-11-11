import React, {useState} from "react";
import { Button, CardActions, CardMedia } from "@mui/material";
import defImage from '../../../images/def-quest-image.jpg';

const DungeonCard = ({dungeon}) => {
    const imageSrc = dungeon.dungeonImage || defImage;

    return(
            <div className="h-full bg-white border border-black-200 rounded overflow-hidden">
                <div className="h-1/2 w-full border-b border-black-700">
                    <img className="h-full w-full object-cover" src={imageSrc}/>
                </div>
                <div className="relative h-1/2 w-full flex flex-col items-center mt-2">
                    <h1 className="text-xl font-bold">{dungeon.dungeonName}</h1>
                    <p>{dungeon.dungeonDescription}</p>
                    <p>Completion percentage: {dungeon.completionPercentage * 100}%</p>
                    <div className="absolute flex bottom-2 ">
                        <Button>View Details</Button>
                        <Button>Delete Dungeon</Button>
                    </div>
                </div>
            </div>
    );
}

export default DungeonCard;