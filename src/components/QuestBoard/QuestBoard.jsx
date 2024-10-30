import React, {useState, useEffect} from "react";
import './QuestBoard.css';
import Button from '@mui/material/Button';
import QuestCard from "./QuestCard/QuestCard";
import QuestDetailInput from "./QuestDetailInput/QuestDetailInput";

const QuestBoard = () => {
    const [currPage, setCurrpage] = useState(1);
    const [totalQuests, setTotalQuests] = useState(0);
    const [onAddQuest, setOnAddQuest] = useState(false);
    const [questList, setQuestList] = useState([]);

    console.log(totalQuests);

    //when a new quest is added
    const handleIncreaseQuests = (newQuest) => {
        setQuestList((prevList) => [
            ...prevList, [newQuest]
        ])
        setTotalQuests((prevVal) => prevVal + 1);
    }

    //when a quest is completed or deleted
    const handleDecreaseQuests = () => {
        setTotalQuests((prevVal) => Math.max(0, prevVal - 1))
    }

    const handleOnClickAddQuest = () => {
        setOnAddQuest(true);
    }

    const handleExitAddQuest = () => {
        setOnAddQuest(false);
    }

    const handleCompletedCheckpoint = (obj, i) => {
        setQuestList((prevList) => {
            const newList = prevList.map((checkpoint, index) => {
                if(index === i){
                    return obj;
                }
                return checkpoint;
            })

            return newList;
        })
    }

    return(
        <div className="h-full w-full ">
            <div className="relative h-10p w-95p mx-auto">
                <Button 
                className="absolute  w-auto left-0"
                onClick={handleOnClickAddQuest}>Add Quest</Button>
            </div>
            <div className="h-85p w-95p mx-auto grid grid-cols-3 gap-4">
                {questList.map((quest, index) => (
                    <QuestCard key={index} quest={quest[0]} />
                ))}

            </div>
            <div className="page-tracker">

            </div>
            { onAddQuest &&
                <QuestDetailInput handleExitAddQuest={handleExitAddQuest} handleIncreaseQuests={handleIncreaseQuests}/>
            }
        </div>
    );
}

export default QuestBoard;