import React from "react";
import { useLocation, useParams } from "react-router";
import DungeonCard from "../DungeonCard/DungeonCard";

const DungeonPage = ({dungeonList, page}) => {
    const dungeonsPp = 3;
    const startIndex = (page - 1) * dungeonsPp;

    if(startIndex < 0 || startIndex >= dungeonList.length){
        return <div className="h-full w-3x flex items-center justify-center">
            <p className="text-center">There are no dungeons here for now...</p>
        </div>
    }

    const shownDungeons = dungeonList.slice(startIndex, startIndex + dungeonsPp)
    // console.log(shownQuests);

    return(
        <div className="absolute h-full w-full grid grid-cols-3 gap-4">
            {shownDungeons.map((dungeon, index) => {
                return <DungeonCard key={index} dungeon={dungeon[0]}/>
            })}
        </div>

    );
}

export default DungeonPage;