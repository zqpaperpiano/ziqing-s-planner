import React, {useState, useEffect, useContext} from "react";
import Button from '@mui/material/Button';
import DungeonDetailInput from "./DungeonDetail/DungeonDetailInput";
import { DungeonContext } from "./DungeonContext/DungeonContext";
import DungeonPage from "./DungeonPage/DungeonPage";
import { StepBack, StepForward } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router";
import PageTracker from "./PageTracker/PageTracker";

const DungeonBoard = () => {
    const {'page-number': page} = useParams();
    const [totalDungeons, setTotalDungeons] = useState(0);
    const [onAddDungeon, setOnAddDungeon] = useState(false);
    const {dungeonList, setDungeonList} = useContext(DungeonContext);
    const [nextDungeonID, setNextDungeonID] = useState(dungeonList.length);
    const [maxPages, setMaxPages] = useState(1);
    const [dungeonPp, setDungeonPp] = useState(3);

    const navigate = useNavigate();

    useEffect(() => {
        const updateDungeonPp = () => {
            if(window.innerWidth < 640){
                setDungeonPp(9);
            }else{
                setDungeonPp(6);
            }
        };

        updateDungeonPp();

        window.addEventListener("resize", updateDungeonPp);
    })

    useEffect(() => {
        const numDungeons = dungeonList.length;
        setTotalDungeons(numDungeons)
    }, [dungeonList])


    // useEffect(() => {
    //     console.log(dungeonList)
    // }, [dungeonList])

    useEffect(() => {
        const length = Object.keys(dungeonList).length;
        let nextVal = parseInt(Object.keys(dungeonList)[length - 1]) + 1;
        if(isNaN(nextVal)) nextVal = 1;
        setNextDungeonID(nextVal);
    }, [dungeonList]);

    useEffect(() => {
        const newMax = Math.ceil(totalDungeons / 3);
        if(newMax !== maxPages){
            //ensure that there is always a minimum maxPage value of 1
            setMaxPages(Math.max(newMax, 1));
        }
    }, [totalDungeons])

    //when a new quest is added
    const handleIncreaseDungeons = (newDungeon) => {
        const dungeonArr = Object.entries(newDungeon);
        const keys = dungeonArr[0][0];
        const temp = dungeonArr[0][1];
        setDungeonList((prevList) => ({
            ...prevList,
            [keys]: temp
        })
        )
    }

    const handleRemoveDungeons = (dungeonID) => {
       setDungeonList((prevList) => {
        const { [dungeonID]: _ , ...newData} = prevList;
        return newData;
       })
    }

    const handleOnClickAddDungeons = () => {
        setOnAddDungeon(true);
    }

    const handleExitAddDungeon = () => {
        setOnAddDungeon(false);
    }

    const handleClickNext = () => {
        const maxPage = Math.ceil(totalDungeons / 3);
        const newPage = parseInt(page) + 1
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
        <div className={`h-full w-full flex ${onAddDungeon} ? 'z-10' : 'z-50'`}>
            <ToastContainer />
            <div className="flex items-center justify-center mx-auto">
                <Button
                onClick={() => {handleClickBack()}}
                ><StepBack /></Button>
            </div>
            <div className="h-full w-85p mx-auto flex flex-col">
                <div className="relative h-10p w-full mx-auto mt-1">
                    <Button 
                    sx={{
                        fontFamily: 'GrapeNuts',
                        color: 'black'
                    }}
                    className="absolute  w-auto left-0"
                    onClick={handleOnClickAddDungeons}>Post a Dungeon</Button>
                </div>
                <div className="relative h-85p w-full grid grid-cols-3 gap-4 p-2 overflow-hidden">
                    <DungeonPage dungeonList={dungeonList} page={page} dungeonPp={dungeonPp} handleRemoveDungeon={handleRemoveDungeons}/>

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
            { onAddDungeon &&
                <DungeonDetailInput
                    handleExitAddDungeon={handleExitAddDungeon}
                    handleIncreaseDungeons={handleIncreaseDungeons}
                    dungeonID={nextDungeonID}
                />
            }
        </div>
    );
}

export default DungeonBoard;