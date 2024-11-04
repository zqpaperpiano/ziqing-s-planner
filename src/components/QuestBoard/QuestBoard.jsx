import React, {useState, useEffect, useContext} from "react";
import Button from '@mui/material/Button';
import QuestDetailInput from "./QuestDetailInput/QuestDetailInput";
import { QuestContext } from "./QuestContext/QuestContext";
import QuestPage from "./QuestPage/QuestPage";
import { StepBack, StepForward } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router";
import PageTracker from "./PageTracker/PageTracker";

const QuestBoard = () => {
    const {'page-number': page} = useParams();
    const [totalQuests, setTotalQuests] = useState(0);
    const [onAddQuest, setOnAddQuest] = useState(false);
    const {questList, setQuestList} = useContext(QuestContext);
    const [shownQuests, setShownQuests] = useState([]);
    const [nextQuestID, setNextQuestID] = useState(questList.length);
    const [maxPages, setMaxPages] = useState(1);
    const questPerPage = 3;

    const navigate = useNavigate();

    useEffect(() => {
        setNextQuestID((prevID) => {return prevID + 1});
    }, [questList]);

    useEffect(() => {
        const newMax = Math.ceil(totalQuests / 3);
        if(newMax !== maxPages){
            //ensure that there is always a minimum maxPage value of 1
            setMaxPages(Math.max(newMax, 1));
        }
    }, [totalQuests])

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

    const handleClickNext = () => {
        const maxPage = Math.ceil(totalQuests / 3);
        const newPage = parseInt(page) + 1
        console.log(maxPage);
        if(newPage <= maxPage){
            navigate(`/quest-board/quest-page/${newPage}`);
        }else{
            toast.error('There is no next page!');
        }
    }

    const handleClickBack = () => {
        const newPage = page - 1;
        if(newPage >= 1){
            navigate(`/quest-board/quest-page/${newPage}`)
        }else{
            toast.error('There is no previous page!');
        }
    }


    return(
        <div className="h-full w-full flex">
            <div className="flex items-center justify-center mx-auto">
                <Button
                onClick={() => {handleClickBack()}}
                ><StepBack /></Button>
            </div>
            <div className="h-full w-85p mx-auto flex flex-col">
                <div className="relative h-10p w-full mx-auto">
                    <Button 
                    className="absolute  w-auto left-0"
                    onClick={handleOnClickAddQuest}>Add Quest</Button>
                </div>
                <div className="relative h-85p w-full grid grid-cols-3 gap-4 p-2 overflow-hidden">
                    <QuestPage questList={questList} page={page}/>

                </div>
                <div className="h-5p w-full mb-0.5">
                    <PageTracker maxPages={maxPages} currPage={page}/>
                </div>
            </div>
            <div className="flex items-center justify-center mx-auto">
                <Button
                onClick={() => {handleClickNext()}}
                ><StepForward /></Button>
            </div>
            <ToastContainer />
            { onAddQuest &&
                <QuestDetailInput 
                    handleExitAddQuest={handleExitAddQuest} 
                    handleIncreaseQuests={handleIncreaseQuests} 
                    questID={nextQuestID}
                />
            }
        </div>
    );
}

export default QuestBoard;