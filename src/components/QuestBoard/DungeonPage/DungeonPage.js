import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router";
import DungeonCard from "../DungeonCard/DungeonCard";
import { DungeonContext } from "../DungeonContext/DungeonContext";

const DungeonPage = ({ page, dungeonPp}) => {
    const { dungeonList } = useContext(DungeonContext);
    const startIndex = (page - 1) * dungeonPp;
    let shownDungeons = [];
    let counter = 0;

    Object.entries(dungeonList).map((val) => {
        // console.log('mapping dungoenList: ', val);
        if(counter >= startIndex && counter - startIndex <= dungeonPp){
            shownDungeons.push(val);
        }
        counter++;
    })



    if(startIndex < 0 || startIndex >= Object.keys(dungeonList).length){
        return <div className="h-full w-3x flex items-center justify-center font-silkscreen text-3xl">
            <p className="text-center">There are no dungeons here for now...</p>
        </div>
    }

    return(
        <div className={`absolute h-full w-full grid gap-4 ${dungeonPp === 6 ? "grid-cols-3 grid-rows-2" : "grid-cols-3 grid-rows-3"}`}>
            {shownDungeons.map((dungeon, index) => {
                // console.log(dungeon);   
                return <DungeonCard key={index} dungeon={dungeon[1]}/>
            })}
        </div>

    );
}

export default DungeonPage;