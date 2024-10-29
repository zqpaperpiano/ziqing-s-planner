import React, {useEffect, useState} from "react";
import { Check, X } from 'lucide-react';
import { Plus } from "lucide-react";
import { Button } from "@mui/material";
import Checkpoints from "./Checkpoints";

const QuestDetailInput = () => {
    const [checkpointList, setCheckpointList] = useState([]);
    const [questDetails, setQuestDetails] = useState({
                                                questName: '',
                                                questImage: '',
                                                questDescription: '',
                                                questCheckpoint: []
                                            });

    console.log(questDetails);

    useEffect(() => {
        setQuestDetails((prevDeets) => ({
            ...prevDeets, questCheckpoint : [checkpointList]
        }))
    }, [checkpointList]);
    
    const handleAddCheckpoints = () => {
        const arrLen = checkpointList.length;
        const checkpoint = "Checkpoint " + (arrLen + 1);
        setCheckpointList((prevList) => [...prevList, { [checkpoint]: false }])
    }

    const handleQuestDetailsChange = (e, parameterName) => {
        setQuestDetails((prevDeets) => ({
            ...prevDeets, [parameterName]: e.target.value
        }))
    }

    const handleCheckpointNameChange = (value, index) => {
        setCheckpointList((prevList) => {
            const newCheckpointList = prevList.map((checkpoint, i) => {
                console.log(i);
                if (i===index){
                    return {[value]: false};
                }
                return checkpoint;
            });
            console.log(newCheckpointList);
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

    

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="relative bg-white w-3/4 h-5/6 flex items-center justify-center">
                <button className="absolute top-6 right-6 "><X /></button>
                <div className="overflow-scroll overflow-x-hidden w-full h-full flex items-center justify-evenly flex-col">
                    <div className="h-1/6 flex flex-col justify-around">
                        <h1 className="text-5xl">Posting a New Quest?</h1>
                        <h3>Please fill in the details below!</h3>
                    </div>
                    <form className="mt-4 h-5/6 w-full flex flex-col items-center">
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
                                <Checkpoints checkpoints={checkpointList} handleCheckpointChange={handleCheckpointNameChange} />  
                            </div>  
                            <Button>Post Quest</Button>
                        </div>
                        

                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default QuestDetailInput;