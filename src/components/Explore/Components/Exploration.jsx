import React, { useEffect, useState } from "react";
import ToDoList from "../../ToDoList/ToDoList";
import CountdownClock from "../../CountdownClock/CountdownClock";

const Exploration = ({ details, handleExitExploration }) => {
    const [timer, setTimer] = useState(details.duration * 60);
    const [dungeon, setDungeon] = useState(details.dungeon);


    return(
        <div className="fixed inset-0 bg-black z-50 flex justify-center items-center font-silkscreen text-white">
            <div className="h-full w-3/4 flex justify-center items-center font-tiny5 text-9xl">
                <CountdownClock startTime={timer} />
            </div>
            <div className="h-full w-1/4 flex flex-col ">
                {
                    dungeon &&
                    <div className="h-1/4  w-full flex flex-col items-center justify-center">
                        <p>Current goal: </p>
                        <p>{dungeon.dungeonName}</p>
                    </div>
                }
                <div className={`${dungeon ? 'h-3/4': 'h-full'} w-full flex flex-col items-center justify-center`} >
                    <ToDoList />
                </div>
            </div>
            <div 
            onClick={handleExitExploration}
            className="absolute top-0 left-2 opacity-20 text-white font-silkscreen hover:cursor-pointer hover:opacity-100">
                Back
            </div>

        </div>
    )
}

export default Exploration; 