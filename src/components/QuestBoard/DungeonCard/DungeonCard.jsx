import React, {useState} from "react";
import { Button, CardActions, CardMedia } from "@mui/material";
import defImage from '../../../images/def-quest-image.jpg';

const DungeonCard = ({dungeon}) => {
    const imageSrc = dungeon.dungeonImage || defImage;

    return(
            <div className="h-full bg-gradient-to-b from-[#d6cdd0] to-[#b8a9b1] rounded-lg overflow-hidden">
                
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