import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { DungeonContext } from "../DungeonContext/DungeonContext";
import { CircularProgress, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import Checkpoints from "./Checkpoints";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { ToastContainer, toast } from "react-toastify";
import config from "../../../config/config.json";
import { auth } from "../../../config/firebase";

const DungeonDetailCard = () => {
    const { dungeonID } = useParams();
    const { dungeonList, setDungeonList } = useContext(DungeonContext);
    const [dungeon, setDungeon] = useState(dungeonList[dungeonID]);
    const {'page-number': page} = useParams();
    const [editName, setEditName] = useState(false);    
    const [editDescription, setEditDescription] = useState(false);
    const [hasNotif, setHasNotif] = useState(false);
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const navigate = useNavigate(); 

    //auto focus onto input box for dungeonName
    useEffect(() => {
        if(editName) nameRef.current.focus();
    }, [editName])

    //auto focus onto input box for description
    useEffect(() => {
        if(editDescription) descriptionRef.current.focus();
    }, [editDescription])

    //auto updae completion percentages
    useEffect(() => {
        if(!dungeon?.dungeonCheckpoints) return;

        const numItems = dungeon.dungeonCheckpoints.length;
        let numCompleted = 0;
        const list = dungeon.dungeonCheckpoints;

        Object.values(list).map((itm) => {
            Object.values(itm).map((cpt) => {
                if(cpt.completion){
                    numCompleted++;
                }
            })
        })

        const newPercetage = (numCompleted / numItems).toFixed(4);
        if(newPercetage !== dungeon.completionPercetage){
            setDungeon((prevDungeon) => ({
                ...prevDungeon,
                completionPercentage: newPercetage
            }));
        }
    
    }, [dungeon.dungeonCheckpoints])


    const handleNewCheckpointList = (newList) => {
        setDungeon((prev) => ({
            ...prev,
            dungeonCheckpoints: newList
        }));
    }

    const handleClickEditName = () => {
        setEditName(true);
    }

    const callSuccessNotif = (param) => {
        setHasNotif(true);
        setTimeout(() => {
            setHasNotif(false);
        }, 2500)
        toast.success(`New dungeon ${param} successfully saved!`,{
            position: "bottom-center",
            autoClose: 1000,
            closeOnClick: true,
        })
    }

    const callNoSaveNotif = () => {
        setHasNotif(true);
        setTimeout(() => {
            setHasNotif(false);
        }, 2500)
        toast.info(`No changes were saved`,{
            position: "bottom-center",
            autoClose: 1000,
            closeOnClick: true,
        })
    }

    const exitEditMode = (param, result) => {
        if(param === 'name'){
            setEditName(false);
        }else{
            setEditDescription(false);
        }
    }

    const handleChange = (e, param) => {
        setDungeon((dun) => ({
            ...dun,
            [param]: e.target.value
        })) 
    }

    const handleClickEditDescription = () => {
        setEditDescription(true);
    }

    const handleSubmitChanges = () => {
        // setDungeonList((prevList) => ({
        //     ...prevList,
        //     [dungeonID]: dungeon
        // }));
        console.log('clicked');
        auth.currentUser.getIdToken().then(token => {fetch(`${config.development.apiURL}dungeon/update-dungeon-details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                dungeonId: dungeonID,
                dungeonName: dungeon.dungeonName,
                dungeonDescription: dungeon.dungeonDescription,
                dungeonCheckpoints: dungeon.dungeonCheckpoints,
                completionPercentage: dungeon.completionPercentage,
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log('received: ', data)
        })
        .catch(err => {
            console.log('An error has occured. Please try again later.');
        })
    })
        // navigate(`/dungeon-board/${page}`)
    }

    const exitDetailCard = () => {
        callNoSaveNotif();
        navigate(`/dungeon-board/${page}`);
    }

    return(
        <motion.div 
        initial={{ opacity: 0, rotateY: 90}}
        animate={{ opacity: 1, rotateY: 180}}
        transition={{duration: 0.3}}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            {
                !dungeon ? 
                <CircularProgress /> :
                <div className={`h-4/5 w-3/4 relative transform rotate-y-180 pt-8 bg-gradient-to-b from-[#d6cdd0] to-[#b8a9b1] rounded-lg overflow-x-hidden ${hasNotif ? 'overflow-y-hidden': 'overflow-y-auto}'}`}>
                    <ToastContainer />
                    <div className=" h-full w-full flex items-center justify-center font silkscreen">
                    <Button
                        onClick={exitDetailCard}
                        sx={{
                            position: 'absolute',
                            right:0,
                            top: 0,
                            color: 'black'
                        }}>X</Button>
                        <div className="h-full w-1/2 flex flex-col items-center justify-center">
                            <div className="h-1/3 w-full flex items-center justify-center">
                                <div className="w-full flex justify-center items-center text-center ">
                                    {
                                        editName ?
                                        <input 
                                            ref={nameRef}
                                            onChange={(e) => {handleChange(e, "dungeonName")}}
                                            className="h-8 w-4/5 border-none rounded-lg font-silkscreen p-1 text-center"
                                            value={dungeon.dungeonName}
                                            onKeyDown={(e) => {
                                                if(e.key === 'Enter'){
                                                    exitEditMode('name', true);
                                                }
                                            }}
                                            onBlur={() => {exitEditMode('name', false)}}
                                            type="text"
                                        /> :
                                        <div className="h-full w-full flex items-end justify-center">
                                            <p className="text-5xl">{dungeon.dungeonName}</p>
                                            <BorderColorIcon 
                                            onClick={handleClickEditName}
                                            sx={{
                                                height: '15px',
                                                width: '15px',
                                                '&:hover': {
                                                    cursor: "pointer",
                                                    color: "gray"
                                                }
                                            }}
                                            size="small"/>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="h-2/3 w-full flex flex-col items-center px-2">
                                <div className="h-16 w-2/3 flex items-center justify-center">
                                    <p className="text-xl">Description</p>
                                    <BorderColorIcon 
                                        onClick={handleClickEditDescription}
                                        sx={{
                                        height: '13px',
                                        width: '13px',
                                        '&:hover':{
                                            color: 'gray',
                                            cursor: 'pointer'
                                        }
                                    }}/>
                                </div>
                                <div className="flex-1 w-4/5">
                                {
                                    editDescription ?
                                    <TextField
                                        inputRef={descriptionRef}
                                        variant="outlined" 
                                        multiline
                                        fullWidth
                                        maxRows={4}
                                        value={dungeon.dungeonDescription}
                                        onChange={(e) => {handleChange(e, "dungeonDescription")}}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: 'white',
                                            },
                                            '& .MuiInputBase-input': {
                                                fontFamily: 'silkscreen',
                                                textAlign: 'center'
                                            }
                                        }}
                                        onKeyDown={(e) => {if(e.key === 'Enter' && !e.shiftKey){exitEditMode('description', true)}}}
                                        onBlur={() => {exitEditMode('description', false)}}
                                    /> :
                                    <p className="italic text-center">{dungeon.dungeonDescription}</p>
                                }
                                </div>
                                
                            </div>
                        </div>
                        <div className="h-full w-1/2 flex flex-col items-center justify-center">
                        <div className="h-1/3 w-full w-full flex flex-col items-center justify-center">
                                    <p className="text-xl">Completion Progress:</p>
                                    <p>{(dungeon.completionPercentage * 100).toFixed(2)}%</p>
                                </div>
                           <div className="h-2/3 w-full flex flex-col items-center ">
                                <p className="text-xl">Checkpoints</p>
                                <Checkpoints checkpoints={dungeon.dungeonCheckpoints} handleSubmit={handleNewCheckpointList} btnColor={"black"} />
                           </div>
                        </div>
                    </div>
                    <div className="absolute bottom-2 left-0 right-0 mx-auto w-fit">
                        <Button
                        onClick={handleSubmitChanges}
                        sx={{
                            fontFamily: 'silkscreen',
                            color: 'black'
                        }}>Save and Exit</Button>
                    </div>
                </div>
            }
        </motion.div>
    );
}

export default DungeonDetailCard;