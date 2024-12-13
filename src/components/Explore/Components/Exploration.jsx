import React, { useEffect, useState } from "react";
import ToDoList from "../../ToDoList/ToDoList";

const Exploration = ({ details }) => {
    const [timer, setTimer] = useState(details.duration);
    const [dungeon, setDungeon] = useState(details.dungeon);

    useEffect(() => {
        console.log(details);
    }, [details])

    return(
        <div className="fixed inset-0 bg-black z-50 flex justify-center items-center font-silkscreen text-white">
            <div className="h-full w-3/4 flex justify-center items-center font-tiny5 text-9xl">
                <p className="tracking-widest">25:00</p>
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

        </div>
    )
}

export default Exploration; 