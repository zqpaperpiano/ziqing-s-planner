import React, {useState, useEffect} from "react";
import './QuestBoard.css';
import Button from '@mui/material/Button';

const QuestBoard = () => {
    const [currPage, setCurrpage] = useState(1);
    const [totalQuests, setTotalQuests] = useState(0);

    //when a new quest is added
    const handleIncreaseQuests = () => {
        setTotalQuests((prevVal) => prevVal + 1);
    }

    //when a quest is completed or deleted
    const handleDecreaseQuests = () => {
        setTotalQuests((prevVal) => Math.max(0, prevVal - 1))
    }

    return(
        <div className="QB-Frame">
            <div className="add-quest">
                <Button className="add-quest-button">+ Add Quest</Button>
            </div>
            <div className="QBs">
                <div className="QB">

                </div>
                <div className="QB">
                    
                </div>
                <div className="QB">
                    
                </div>
                <div className="QB">
                    
                </div>

            </div>
            <div className="page-tracker">

            </div>

        </div>
    );
}

export default QuestBoard;