import React, {useState, useEffect, useContext} from "react";
import Button from '@mui/material/Button';
import DungeonDetailInput from "./DungeonDetail/DungeonDetailInput";
import { DungeonContext } from "../../contexts/DungeonContext";
import DungeonPage from "./DungeonPage/DungeonPage";
import { StepBack, StepForward } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router";
import PageTracker from "./PageTracker/PageTracker";
import config from '../../config/config.json';
import { auth } from '../../config/firebase';
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { AuthContext } from "../../contexts/authContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const DungeonBoard = () => {
    const {'page-number': page} = useParams();
    const [onClickDelete, setOnClickDelete] = useState(false);
    const [toDel, setToDel] = useState('');
    const [totalDungeons, setTotalDungeons] = useState(0);
    const [onAddDungeon, setOnAddDungeon] = useState(false);
    const {dungeonList, setDungeonList} = useContext(DungeonContext);
    const [maxPages, setMaxPages] = useState(1);
    const [dungeonPp, setDungeonPp] = useState(3);
    const { tokenRefresh, logOut } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

        useEffect(() =>{
            let timeoutId;
    
            if(loading){
                timeoutId = setTimeout(() => {
                    toast.error('An error has occured. Please try logging in again.');
                    logOut();
                }, 60000)
            }
    
            return () => {
                if(timeoutId){
                    clearTimeout(timeoutId);
                }
            }
        }, [loading])

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
        const numDungeons = Object.keys(dungeonList).length;
        setTotalDungeons(numDungeons)
    }, [dungeonList])


    useEffect(() => {
        const newMax = Math.ceil(totalDungeons / dungeonPp);
        if(newMax !== maxPages){
            //ensure that there is always a minimum maxPage value of 1
            setMaxPages(Math.max(newMax, 1));
        }
    }, [totalDungeons])

    //when a new quest is added
    const handleIncreaseDungeons = async (newDungeon, retry) => {
        try{
            setLoading(true);
            const resp =  await fetch(`${config.development.apiURL}dungeon/create-new-dungeon`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "dungeon": newDungeon,
                    "userId": auth.currentUser.uid
                })
            });

            if(resp.status === 401){
                if(!retry){
                    await tokenRefresh();
                    handleIncreaseDungeons(newDungeon, true);
                    return;
                }else{
                    setLoading(false);
                    toast.error('An error has occured. Please try re-logging into your account. ')
                }
            }

            if(resp.ok){
                const data = await resp.json();
                const dungeonId = Object.keys(data)[0];
                const dungeonData = Object.values(data)[0];
                setDungeonList((prevList) => ({
                    ...prevList,
                    [dungeonId]: dungeonData
                }));
                setLoading(false);
            }
        }catch(err){
            setLoading(false);
            toast.error('An error has occured. Please try again later.')
        }
    }

    const handleClickAbandon = (dungeonId) => {
        setOnClickDelete(true);
        setToDel(dungeonId);
    }

    const handleDeleteDungeon = async (retry) => {
        try{
            setLoading(true);
            const resp = await fetch(`${config.development.apiURL}dungeon/delete-dungeon`, {
                method: 'DELETE',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dungeonId: toDel
                })
            });

            if(resp.status === 401){
                if(!retry){
                    await tokenRefresh();
                    handleDeleteDungeon(true);
                    return;
                }else{
                    toast.error('An error has occured. Please try re-logging into your account again. ')
                }
            }

            if(resp.ok){
                setDungeonList(prevDungeonList => {
                    const { [toDel]: _, ...updatedDungeonList } = prevDungeonList;
                    return updatedDungeonList;
                });
                setLoading(false);
                setToDel('');
            }
        }catch(err){
            setLoading(false);
            toast.error('An error has occured. Please try again later.');
        }
    }

    const handleOnClickAddDungeons = () => {
        setOnAddDungeon(true);
    }

    const handleExitAddDungeon = () => {
        setOnAddDungeon(false);
    }

    const handleClickNext = () => {
        const newPage = parseInt(page) + 1
        if(newPage <= maxPages){
            navigate(`/dungeon-board/${newPage}`);
        }else{
            toast.error('There is no next page!');
        }
    }

    const handleClickBack = () => {
        const newPage = page - 1;
        if(newPage >= 1){
            navigate(`/dungeon-board/${newPage}`)
        }else{
            toast.error('There is no previous page!');
        }
    }

    const undoDelete = () => {
        setToDel('');
        setOnClickDelete(false);
    }

    const confirmDelete = () => {
        handleDeleteDungeon(false);
        setOnClickDelete(false);
    }


    return(
        <div className={`h-full w-full flex ${onAddDungeon} ? 'z-0' : 'z-50'`}>
            {loading && <LoadingScreen />}
            <ToastContainer />
            <div className="flex items-center justify-center mx-auto">
                <Button
                onClick={() => {handleClickBack()}}
                ><StepBack /></Button>
            </div>
            <div className="h-full w-85p mx-auto flex flex-col">
                <div className="relative h-10p w-full mx-auto mt-4">
                    <button 
                    style={{
                        fontFamily: 'silkscreen',
                        color: 'black'
                    }}
                    className="absolute  w-auto left-0 border border-deepPink py-1 px-2 rounded-md bg-deepPink hover:bg-turqoiseGreen hover:border-turqoiseGreen"
                    onClick={handleOnClickAddDungeons}>Post a Dungeon</button>
                </div>
                <div className={`relative h-85p w-full grid grid-cols-3 gap-4 p-2 overflow-hidden ${onAddDungeon ? 'z-0' : 'z-50'}`}>
                    <DungeonPage dungeonList={dungeonList} page={page} dungeonPp={dungeonPp} handleRemoveDungeon={handleClickAbandon} />

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
                />
            }
            {
                onClickDelete &&
                <DeleteConfirmation event={"Delete this dungeon"} onClickDelete={confirmDelete} onClickUndo={undoDelete}/>
            }
        </div>
    );
}

export default DungeonBoard;