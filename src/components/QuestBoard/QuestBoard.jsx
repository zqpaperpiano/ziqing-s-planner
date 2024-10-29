import React, {useState, useEffect} from "react";
import './QuestBoard.css';
import Button from '@mui/material/Button';
import QuestCard from "./QuestCard/QuestCard";
import QuestDetailInput from "./QuestDetailInput/QuestDetailInput";

const QuestBoard = () => {
    const [currPage, setCurrpage] = useState(1);
    const [totalQuests, setTotalQuests] = useState(0);
    const [onAddQuest, setOnAddQuest] = useState(false);

    //when a new quest is added
    const handleIncreaseQuests = () => {
        setTotalQuests((prevVal) => prevVal + 1);
    }

    //when a quest is completed or deleted
    const handleDecreaseQuests = () => {
        setTotalQuests((prevVal) => Math.max(0, prevVal - 1))
    }

    const handleOnClickAddQuest = () => {
        setOnAddQuest(true);
        
    }

    return(
        <div className="QB-Frame">
            <div className="add-quest">
                
            </div>
            <div className="QBs">
                <QuestCard questName={"AWS Certification"} />

            </div>
            <div className="page-tracker">

            </div>
            <QuestDetailInput />
        </div>
    );
}

export default QuestBoard;