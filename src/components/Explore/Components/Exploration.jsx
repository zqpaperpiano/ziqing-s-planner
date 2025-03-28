import React, { useContext, useEffect, useState } from "react";
import ToDoList from "../../ToDoList/ToDoList";
import CountdownClock from "../../CountdownClock/CountdownClock";
import { AuthContext } from "../../../contexts/authContext";
import config from '../../../config/config.json';
import ExplorationEndPage from "./ExplorationEndPage";
import { toast, ToastContainer } from "react-toastify";

const Exploration = ({ details, handleExitExploration }) => {
    const [timer, setTimer] = useState(details.duration * 60);
    const [dungeon, setDungeon] = useState(details.dungeon);
    const [timeLeft, setTimeLeft] = useState(timer);
    const { tokenRefresh } = useContext(AuthContext);
    const [endExploration, setEndExploration] = useState(false);


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
                const toastId = 'explore-toast-error-unauthorized';
                if(!toast.isActive(toastId)){
                    toast.error('An error has occured. Your focus session may not have been recorded. Please try logging out and in again.', {toastId})
                }
            }

            //need to include end screen
        }catch(err){
            const toastId = 'explore-toast-error-server';
            if(!toast.isActive(toastId)){
                toast.error('An error has occured. Your focus session may not have been recorded. Please contact an administrator for help.', toastId)
            }
        }
    }

    useEffect(() => {
        if(timeLeft === 0){
            onExitFocus();
        }
    })

    const onExitFocus = () => {
        setEndExploration(true);
        updateUserFocusTimeStats(false);
        // handleExitExploration();
    }


    return(
        <div className="fixed inset-0 bg-black z-50 flex justify-center items-center font-silkscreen text-white">
            <ToastContainer />
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
            {
                endExploration && <ExplorationEndPage details={details} onExitSumamry={handleExitExploration} timeLeft={timeLeft}/>
            }

        </div>
    )
}

export default Exploration; 