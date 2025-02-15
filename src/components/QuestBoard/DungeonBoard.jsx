import React, {useState, useEffect, useContext} from "react";
import Button from '@mui/material/Button';
import DungeonDetailInput from "./DungeonDetail/DungeonDetailInput";
import { DungeonContext } from "./DungeonContext/DungeonContext";
import DungeonPage from "./DungeonPage/DungeonPage";
import { StepBack, StepForward } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router";
import PageTracker from "./PageTracker/PageTracker";
import config from '../../config/config.json';
import { auth } from '../../config/firebase';

const DungeonBoard = () => {
    const {'page-number': page} = useParams();
    const [onClickDelete, setOnClickDelete] = useState(false);
    const [toDel, setToDel] = useState('');
    const [totalDungeons, setTotalDungeons] = useState(0);
    const [onAddDungeon, setOnAddDungeon] = useState(false);
    const {dungeonList, setDungeonList} = useContext(DungeonContext);
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
    const handleIncreaseDungeons = (newDungeon) => {
        auth.currentUser.getIdToken()
        .then(token => {
            fetch(`${config.development.apiURL}dungeon/create-new-dungeon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "dungeon": newDungeon,
                    "userId": auth.currentUser.uid
                })
            })
            .then((resp) => resp.json())
            .then(data => {
                console.log('received data: ', data);
                console.log('data id: ', Object.keys(data));
                
                const dungeonId = Object.keys(data)[0];
                const dungeonData = Object.values(data)[0];
                console.log('other stuff: ', Object.values(data)[0])
                setDungeonList((prevList) => ({
                    ...prevList, // Spread the previous list to keep existing dungeons
                    [dungeonId]: dungeonData // Add the new dungeon with its dungeonId as the key
                }));
            })
            .then(() => {
                console.log('my changed dungeon list: ', dungeonList);
            })
            .catch(err => {
                console.log(err);
            })
        })
    }

    const handleClickAbandon = (dungeonId) => {
        setOnClickDelete(true);
        setToDel(dungeonId);
    }

    const handleDeleteDungeon = () => {
        auth.currentUser.getIdToken()
        .then(token => {
            fetch(`${config.development.apiURL}dungeon/delete-dungeon`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    dungeonId: toDel
                })
            })
                .then(resp => {
                    if(resp.status === 204){
                        setDungeonList(prevDungeonList => {
                            const { [toDel]: _, ...updatedDungeonList } = prevDungeonList;
                            return updatedDungeonList;
                        });
                        setToDel('');
                    }
                })
                .catch(err => {
                    console.log('an error has occured: ', err);
                })
        })
        
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


    return(
        <div className={`h-full w-full flex ${onAddDungeon} ? 'z-0' : 'z-50'`}>
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
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg font-silkscreen">
                        <p>Are you sure you want to delete this dungeon?</p>
                        <Button
                            onClick={() => {
                                handleDeleteDungeon();
                                setOnClickDelete(false);
                            }}
                        >Yes</Button>
                        <Button
                            onClick={() => {
                                setToDel('');
                                setOnClickDelete(false);
                            }}
                        >No</Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default DungeonBoard;