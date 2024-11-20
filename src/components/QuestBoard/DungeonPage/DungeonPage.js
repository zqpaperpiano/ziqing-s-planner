import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import DungeonCard from "../DungeonCard/DungeonCard";

const DungeonPage = ({dungeonList, page, dungeonPp}) => {
    const startIndex = (page - 1) * dungeonPp;
    
    useEffect(() => {
        console.log(dungeonPp);
    }, [dungeonPp])

    if(startIndex < 0 || startIndex >= dungeonList.length){
        return <div className="h-full w-3x flex items-center justify-center">
            <p className="text-center">There are no dungeons here for now...</p>
        </div>
    }

    const shownDungeons = dungeonList.slice(startIndex, startIndex + dungeonPp)
    // console.log(shownQuests);

    return(
        <div className={`absolute h-full w-full grid gap-4 ${dungeonPp === 6 ? "grid-cols-3 grid-rows-2" : "grid-cols-3 grid-rows-3"}`}>
            {shownDungeons.map((dungeon, index) => {
                return <DungeonCard key={index} dungeon={dungeon[0]}/>
            })}
        </div>

    );
}

export default DungeonPage;