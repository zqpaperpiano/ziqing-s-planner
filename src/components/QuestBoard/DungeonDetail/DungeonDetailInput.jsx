import React, {useEffect, useState} from "react";
import { X, Plus } from 'lucide-react'; 
import { Button, TextField } from "@mui/material";
import Checkpoints from "./Checkpoints";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Background from '../../../images/hip-square.webp';
import { XIcon, CheckIcon } from "raster-react";


const DungeonDetailInput = ({handleExitAddDungeon, handleIncreaseDungeons }) => {

    const [checkpointList, setCheckpointList] = useState([
        {"C1": {
            "checkpointName": "Checkpoint 1",
            "completion": false
        }}
    ]);
    const [dungeonDetails, setDungeonDetails] = useState({
                                                    dungeonName: '',
                                                    dungeonDescription: '',
                                                    dungeonCheckpoints: checkpointList,
                                                    completionProgress: 0,
                                                    dungeonCompleted: false
                                                });


    //when there is a change in the checkpoint list, change quest details as well
    useEffect(() => {
        const completedCount = checkpointList.reduce((count, checkpoint) => {
            const value = Object.values(checkpoint)[0].completion;
            if(value){
                return count + 1;
            }   
            return count;
        }, 0);
        
        let len = checkpointList.length;
        let completionProgress = (completedCount / len).toFixed(4);
        if(isNaN(completionProgress)){
            completionProgress = 0;
        }

        setDungeonDetails((prevDeets) => ({
            ...prevDeets, 
            dungeonCheckpoints: checkpointList,
            completionProgress: completionProgress
        }))
    }, [checkpointList]);

    const checkpointListSubmimssion = (newList) => {
        setCheckpointList(newList);
    }
    

    //takes care of all other aspects when quest details are changed
    const handleDungeonDetailsChange = (e, parameterName) => {
        setDungeonDetails((prevDeets) => ({
            ...prevDeets, 
            [parameterName]: e.target.value
        }))
    }


    const handlePostQuest = () => {
        const curr = dungeonDetails

        // do necessary verification of all inputs first
        if (curr.dungeonName === ''){
            notifyEmptyName();
        }else if(curr.dungeonDescription === ''){
            notifyEmptyDescription();
        }else if(curr.dungeonCheckpoints[0].length === 0){
            notifyEmptyCheckpoint();
        }else{
            handleIncreaseDungeons(dungeonDetails, false);
            handleExitAddDungeon();
        }
    }


    const notifyEmptyName = () => toast.error("Please fill in a dungeon name!");
    const notifyEmptyDescription = () => toast.error("Please fill in a description!");
    const notifyEmptyCheckpoint = () => toast.error("Please have at least one checkpoint for your progress!");

    // can just set number of checkpoints and it automatically creates``

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <ToastContainer autoClose={5000}
                            closeOnClick
                            pauseOnHover
                            pauseOnFocusLoss/>
            <div className="relative w-1/2 h-5/6 flex flex-col bg-bgPink">
                <div className="relative bg-deepPink flex w-full p-2" style={{height: '12%', fontFamily: 'source-code-pro'}}>
                    <p className="text-3xl font-bold">New Dungeon</p>
                    <div className="absolute right-0 h-full top-0 flex items-center w-12  hover:cursor-pointer hover:bg-opacity-30 hover:bg-white">
                        <XIcon onClick={handleExitAddDungeon}  size={50} color="" strokeWidth={0.25} radius={1} />
                    </div>
                    <div className="absolute right-12 w-12 top-0 h-full flex items-center hover:cursor-pointer hover:bg-opacity-30 hover:bg-white">
                        <CheckIcon onClick={handlePostQuest} size={50} color="" strokeWidth={0.25} radius={1} />
                    </div>
                </div>

                <div className="flex w-full py-2 px-4 flex-col overflow-y-auto " style={{height: '88%', fontFamily: 'source-code-pro'}}>
                        <div className="h-fit flex flex-col gap-2 w-full">
                            <p className="text-xl">Dungeon Name: </p>
                            <input onChange={(e) => {handleDungeonDetailsChange(e, 'dungeonName')}} type="text" className="w-full border border-black border-1" />
                        </div>

                        <div className="h-fit flex flex-col gap-2 w-full">
                            <p className="text-xl">Dungeon Description: </p>
                            <textarea onChange={(e) => {handleDungeonDetailsChange(e, 'dungeonDescription')}}  className="w-full border border-black border-1 resize-none" rows={7} />
                        </div>

                        <div className="h-fit flex flex-col gap-2 mt-2">
                            <p className="text-xl">Checkpoints: </p>
                            <Checkpoints theme={'retro'} checkpoints={checkpointList} handleSubmit={checkpointListSubmimssion} />
                        </div>
                </div>
            </div>
        </div>
    );
}

export default DungeonDetailInput;