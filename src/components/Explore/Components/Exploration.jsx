import React, { useContext, useEffect, useState } from "react";
import ToDoList from "../../ToDoList/ToDoList";
import CountdownClock from "../../CountdownClock/CountdownClock";
import { AuthContext } from "../../../contexts/authContext";
import config from '../../../config/config.json';

const Exploration = ({ details, handleExitExploration }) => {
    const [timer, setTimer] = useState(details.duration * 60);
    const [dungeon, setDungeon] = useState(details.dungeon);
    const [timeLeft, setTimeLeft] = useState(timer);
    const { tokenRefresh } = useContext(AuthContext);


    const updateUserFocusTimeStats = async(retry) => {
        try{
            const focusTime = timer - timeLeft;

            const updates = {
                timeSpentInFocus: focusTime,
                    noOfCompletedFocusSessions: timeLeft === 0 ? 1 : 0,
                    noOfAbandonedFocusSessions: timeLeft === 0 ? 0 : 1
            }

            const resp = await fetch(`${config.development.apiURL}userStats/update`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    updates: updates
                })
            });

            if(resp.status === 401){
                if(!retry){
                    await tokenRefresh();
                    updateUserFocusTimeStats(true);
                    return;
                }
                throw new Error("Unauthorized");
            }

            //need to include end screen
        }catch(err){
            console.log("an error has occured: ", err);
        }
    }

    useEffect(() => {
        if(timeLeft === 0){
            onExitFocus();
        }
    })

    const onExitFocus = () => {
        console.log('exiting...');
        updateUserFocusTimeStats(false);
        handleExitExploration();
    }


    return(
        <div className="fixed inset-0 bg-black z-50 flex justify-center items-center font-silkscreen text-white">
            <div className="h-full w-3/4 flex justify-center items-center font-tiny5 text-9xl">
                <CountdownClock startTime={timer} setRemainingTime={setTimeLeft} />
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
            onClick={onExitFocus}
            className="absolute top-0 left-2 opacity-20 text-white font-silkscreen hover:cursor-pointer hover:opacity-100">
                Back
            </div>

        </div>
    )
}

export default Exploration; 