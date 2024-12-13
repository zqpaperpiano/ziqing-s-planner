import React, {useEffect, useState} from "react";
import { X, Plus } from 'lucide-react'; 
import { Button, TextField } from "@mui/material";
import Checkpoints from "./Checkpoints";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Background from '../../../images/hip-square.webp';


const DungeonDetailInput = ({handleExitAddDungeon, handleIncreaseDungeons, dungeonID }) => {

    const [checkpointList, setCheckpointList] = useState([]);
    const [dungeonDetails, setDungeonDetails] = useState({
                                                [dungeonID]: {
                                                    dungeonName: '',
                                                    dungeonDescription: '',
                                                    dungeonCheckpoints: [],
                                                    completionPercentage: 0,
                                                }
                                            });

    
    //when there is a change in the checkpoint list, change quest details as well
    useEffect(() => {
        const completedCount = checkpointList.reduce((count, checkpoint) => {
            const value = Object.values(checkpoint)[0];
            if(value){
                return count + 1;
            }   
            return count;
        }, 0);
        
        let len = checkpointList.length;
        let completionPercentage = (completedCount / len).toFixed(2);
        if(isNaN(completionPercentage)){
            completionPercentage = 0;
        }

        // console.log('hello: ', completionPercentage);

        setDungeonDetails((prevDeets) => ({
            ...prevDeets, 
            [dungeonID]: {
                ...prevDeets[dungeonID],
                dungeonCheckpoints: checkpointList,
                completionPercentage: completionPercentage
            }
        }))
    }, [checkpointList]);
    
    //initializes a new checkpoint object:false into the checkpoint list
    const handleAddCheckpoints = () => {
        const arrLen = checkpointList.length;
        const checkpoint = "Checkpoint " + (arrLen + 1);
        setCheckpointList((prevList) => [...prevList, { [checkpoint]: false }])
    }

    //takes care of all other aspects when quest details are changed
    const handleDungeonDetailsChange = (e, parameterName) => {
        setDungeonDetails((prevDeets) => ({
            ...prevDeets, 
            [dungeonID]: {
                ...prevDeets[dungeonID],
                [parameterName]: e.target.value
            }
        }))
    }

    //changes name of the checkpoint
    const handleCheckpointNameChange = (value, index) => {
        setCheckpointList((prevList) => {
            const val = Object.values(checkpointList[index]);
            const newCheckpointList = prevList.map((checkpoint, i) => {
                // console.log(i);
                if (i===index){
                    return {[value]: [val]};
                }
                return checkpoint;
            });
            // console.log(newCheckpointList);
            return newCheckpointList;
        });
    }

    const handlePostQuest = () => {
        console.log(dungeonDetails[dungeonID].dungeonName);
        const curr = dungeonDetails[dungeonID];

        // do necessary verification of all inputs first
        if (curr.dungeonName === ''){
            notifyEmptyName();
        }else if(curr.dungeonDescription === ''){
            notifyEmptyDescription();
        }else if(curr.dungeonCheckpoints[0].length === 0){
            notifyEmptyCheckpoint();
        }else{
            handleIncreaseDungeons(dungeonDetails);
            handleExitAddDungeon();
        }
    }

    const handleCompleteCheckpoints = (i, checked) => {

        checkpointList.map((checkpoint) => {
            let arr = Object.entries(checkpoint);
            console.log(arr);
        })

        // const temp = {[checkpointName]: [checked][0]};

        setCheckpointList((prevList) => {
            const newList = prevList.map((checkpoint, index) => {
                if(index === i){
                    let arr = Object.entries(checkpoint);
                    let temp = {[arr[0]] : [checked][0]}
                    return temp;
                }
                return checkpoint;
            })
            return newList;
        })
    }

    const notifyEmptyName = () => toast.error("Please fill in a dungeon name!");
    const notifyEmptyDescription = () => toast.error("Please fill in a description!");
    const notifyEmptyCheckpoint = () => toast.error("Please have at least one checkpoint for your progress!");

    // can just set number of checkpoints and it automatically creates``

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="relative w-3/4 h-5/6 flex items-center justify-center">
                <div className="absolute inset-0">
                    <img src={Background} className="h-full w-full object-cover z-0" />
                </div>
                <Button 
                    onClick={handleExitAddDungeon}
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 2,
                        color: 'black',
                        zIndex: 100,

                        '&:hover':{
                            backgroundColor: 'transparent'
                        }
                    }}
                ><X /></Button>
                <div className="overflow-scroll overflow-x-hidden w-full font-grapeNuts h-full flex items-center justify-evenly flex-col z-50">
                    <div className="h-1/6 flex flex-col justify-around">
                        <h1 className="text-5xl text-center ">Spotted a new Dungeon?</h1>
                        <h3 className="text-center mt-2 text-xl">Please fill in the details below so an adventurer can take on the quest!</h3>
                    </div>
                    <form className="mt-4 h-5/6 w-full flex flex-col items-center">
                        <ToastContainer 
                            autoClose={5000}
                            closeOnClick
                            pauseOnHover
                            pauseOnFocusLoss
                        />
                        <div className="h-5/6 flex flex-col items-center w-5/6 ">
                            <div className="flex items-center h-12 text-xl">
                                <p>Dungeon Name:</p>
                                <TextField variant="standard" 
                                    onChange={(e) => {handleDungeonDetailsChange(e, "dungeonName")}}
                                    size="small"
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            fontFamily: 'PatrickHand',
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                        }
                                    }}
                                />
                            </div>
                            <p className="text-xl">Dungeon Details:</p>
                            <textarea
                                style={{
                                    fontFamily: 'PatrickHand' 
                                }}
                                value={dungeonDetails.dungeonDescription}
                                onChange={(e) => handleDungeonDetailsChange(e, "dungeonDescription")}
                                maxLength={150}
                                rows="5"
                                className="border border-gray-300 rounded p-2 w-1/2 h-2/3"
                                placeholder="A short description of the dungeon to better aid our adventurers... (max 150 chars)"
                                required
                            />
                        </div>
                        <div className="h-1/3 flex flex-col items-center mt-2 w-full">
                            <div className="flex justify-center items-center">
                                <p className="text-xl">Checkpoints </p>
                                <Button onClick={() => {handleAddCheckpoints()}} size="small"><Plus /> Add Checkpoints</Button>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full">
                                <Checkpoints checkpoints={checkpointList} handleCheckpointChange={handleCheckpointNameChange} handleCheckboxChange={handleCompleteCheckpoints}/>  
                            </div>  
                            <Button 
                            sx={{
                                fontFamily: 'GrapeNuts',
                                fontWeight: 'bold',
                                color: 'black',
                                textDecoration: 'underline',
                                '&:hover':{
                                    textDecoration: 'underline',
                                },
                            }}
                            onClick={() => {
                                handlePostQuest()}}>
                                Post Dungeon
                            </Button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default DungeonDetailInput;