import React, {useEffect, useState} from "react";
import { X, Plus } from 'lucide-react'; 
import { Button } from "@mui/material";
import Checkpoints from "./Checkpoints";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestDetailInput = ({handleExitAddQuest, handleIncreaseQuests }) => {
    const [checkpointList, setCheckpointList] = useState([]);
    const [questDetails, setQuestDetails] = useState({
                                                questName: '',
                                                questImage: '',
                                                questDescription: '',
                                                questCheckpoint: [],
                                                completionPercentage: 0
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

        const completionPercentage = (completedCount / checkpointList.length).toFixed(2);

        setQuestDetails((prevDeets) => ({
            ...prevDeets, 
            questCheckpoint : [checkpointList],
            completionPercentage: [completionPercentage]
        }))
    }, [checkpointList]);

    useEffect(() => {
        console.log(questDetails);
    }, [questDetails]);
    
    //initializes a new checkpoint object:false into the checkpoint list
    const handleAddCheckpoints = () => {
        const arrLen = checkpointList.length;
        const checkpoint = "Checkpoint " + (arrLen + 1);
        setCheckpointList((prevList) => [...prevList, { [checkpoint]: false }])
    }

    //takes care of all other aspects when quest details are changed
    const handleQuestDetailsChange = (e, parameterName) => {
        setQuestDetails((prevDeets) => ({
            ...prevDeets, [parameterName]: e.target.value
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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if(file){
            const imageURL = URL.createObjectURL(file);

            setQuestDetails((prevDeets) => ({
                ...prevDeets, questImage: [imageURL]
            }))
        }
    }

    const handlePostQuest = () => {
        // do necessary verification of all inputs first
        if (questDetails.questName === ''){
            notifyEmptyName();
        }else if(questDetails.questDescription === ''){
            notifyEmptyDescription();
        }else if(questDetails.questCheckpoint[0].length === 0){
            notifyEmptyCheckpoint();
        }else{
            handleIncreaseQuests(questDetails);
            handleExitAddQuest();
        }
    }

    const handleCompleteCheckpoints = (i, checked) => {
        const checkpointName = Object.keys(questDetails.questCheckpoint[0][i]);
        const temp = {[checkpointName]: [checked][0]};

        setCheckpointList((prevList) => {
            const newList = prevList.map((checkpoint, index) => {
                if(index === i){
                    return temp;
                }
                return checkpoint;
            })
            return newList;
        })
    }

    const notifyEmptyName = () => toast.error("Please fill in a quest name!");
    const notifyEmptyDescription = () => toast.error("Please fill in a description!");
    const notifyEmptyCheckpoint = () => toast.error("Please have at least one checkpoint for your progress!");

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="relative bg-white w-3/4 h-5/6 flex items-center justify-center">
                <button onClick={() => {handleExitAddQuest()}} className="absolute top-6 right-6 "><X /></button>
                <div className="overflow-scroll overflow-x-hidden w-full h-full flex items-center justify-evenly flex-col">
                    <div className="h-1/6 flex flex-col justify-around">
                        <h1 className="text-5xl">Posting a New Quest?</h1>
                        <h3>Please fill in the details below!</h3>
                    </div>
                    <form className="mt-4 h-5/6 w-full flex flex-col items-center">
                        <ToastContainer 
                            autoClose={5000}
                            closeOnClick
                            pauseOnHover
                            pauseOnFocusLoss
                        />
                        <div className="h-5/6 flex flex-col items-center w-5/6 ">
                            <p>Quest Name:</p>
                            <input 
                                onChange={(e) => {handleQuestDetailsChange(e, "questName")}}
                                className="border border-gray-300 rounded p-2"
                                type="text" 
                                placeholder="Name of Quest here!" 
                                required 
                            />
                            <p>Quest Poster Image:</p>
                            <div className="flex flex-row justify-center items-center">
                            <input
                                onChange={(e) => {handleQuestDetailsChange(e, "questImage")}}
                                className="border border-gray-300 rounded p-2"
                                type="url"
                                placeholder="Insert a URL"
                            />
                            <p>or</p>
                            <input
                                onChange={(e) => {handleImageUpload(e)}}
                                type="file"
                                accept="image/*"
                            />
                            </div>
                            <p>Quest Details:</p>
                            <textarea
                                value={questDetails.questDescription}
                                onChange={(e) => handleQuestDetailsChange(e, "questDescription")}
                                rows="5"
                                className="border border-gray-300 rounded p-2 w-1/2 h-2/3"
                                placeholder="A short description..."
                                required
                            />
                        </div>
                        <div className="h-1/3 flex flex-col items-center mt-2 w-full">
                            <div className="flex justify-center items-center">
                                <p>Checkpoints </p>
                                <Button onClick={() => {handleAddCheckpoints()}} size="small"><Plus /> Add Checkpoints</Button>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full">
                                <Checkpoints checkpoints={checkpointList} handleCheckpointChange={handleCheckpointNameChange} handleCheckboxChange={handleCompleteCheckpoints}/>  
                            </div>  
                            <Button 
                            onClick={() => {
                                handlePostQuest()}}>
                                Post Quest
                            </Button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default QuestDetailInput;