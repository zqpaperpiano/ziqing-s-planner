import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { DungeonContext } from "../../../contexts/DungeonContext";
import { CircularProgress, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import Checkpoints from "./Checkpoints";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { ToastContainer, toast } from "react-toastify";
import config from "../../../config/config.json";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../../contexts/authContext";
import RightClickMenu from "./RightClickMenu";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";

const DungeonDetailCard = () => {
    const { dungeonID } = useParams();
    const { dungeonList, setDungeonList, colors } = useContext(DungeonContext);
    const [dungeon, setDungeon] = useState(dungeonList[dungeonID]);
    const [gradientStart, setGradientStart] = useState(dungeon?.color ? Object.keys(dungeon.color)[0] : '#d6cdd0');
    const [gradientEnd, setGradientEnd] = useState(dungeon?.color ? Object.values(dungeon.color)[0] : '#b8a9b1');
    const {'page-number': page} = useParams();
    const [editName, setEditName] = useState(false);    
    const [editDescription, setEditDescription] = useState(false);
    const [hasNotif, setHasNotif] = useState(false);
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const navigate = useNavigate(); 
    const { tokenRefresh, logOut } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [menuPos, setMenuPos] = useState({x: 0, y: 0});

    useEffect(() => {
        if(!dungeon || !dungeon.dungeonCheckpoints){
            navigate(`/dungeon-board/${page}`);
        }
    })

        useEffect(() =>{
            let timeoutId;
    
            if(loading){
                timeoutId = setTimeout(() => {
                    const toastId = 'dungeon-detail-error-time-out';
                    if(!toast.isActive(toastId)) 
                    toast.error('An error has occured. Please try logging in again.', {toastId});
                    logOut();
                }, 60000)
            }
    
            return () => {
                if(timeoutId){
                    clearTimeout(timeoutId);
                }
            }
        }, [loading])

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
        if (!dungeon?.dungeonCheckpoints) return;
    
        const numItems = dungeon.dungeonCheckpoints.length;
        if (numItems === 0) return; // ✅ Avoid division by zero
    
        let numCompleted = 0;
        
        dungeon.dungeonCheckpoints.forEach((itm) => {
            Object.values(itm).forEach((cpt) => {
                if (cpt.completion) {
                    numCompleted++;
                }
            });
        });
    
        const newPercentage = (numCompleted / numItems).toFixed(4);
        
        // ✅ Only update state if it has actually changed
        if (newPercentage !== dungeon.completionProgress) {
            setDungeon((prevDungeon) => ({
                ...prevDungeon,
                completionProgress: newPercentage
            }));
        }
    
    }, [dungeon?.dungeonCheckpoints])

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

    const handleSubmitChanges = async (retry) => {
        try{
            setLoading(true);
            const finalColor= {[gradientStart]: gradientEnd}

            const newCompletionStatus = parseFloat(dungeon.completionProgress) === 1 ? true : false;

            if(newCompletionStatus){
                const resp = await fetch(`${config.development.apiURL}dungeon/completed-dungeon`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dungeonId: dungeonID,
                        dungeonName: dungeon.dungeonName,
                        color: finalColor,
                        dungeonDescription: dungeon.dungeonDescription,
                        dungeonCheckpoints: dungeon.dungeonCheckpoints,
                        completionProgress: dungeon.completionProgress,
                        dungeonCompleted: true,
                    })
                })

                if(resp.status === 401){
                    if(!retry){
                        await tokenRefresh();
                        handleSubmitChanges(true);
                        return;
                    }else{
                        const toastId = 'dungeon-detail-error-unauthorized';
                        if(!toast.isActive(toastId)) 
                        toast.error('An error has occured. Please try re-logging into your account again. ', {toastId})
                    }
                }

                if(resp.ok){
                    setLoading(false);
                    setDungeonList((prevList) => {
                        const filteredList = Object.keys(prevList)
                        .filter((key) => key !== dungeonID)
                        .reduce((acc, key) => {
                            acc[key] = prevList[key]; // Rebuild the key-value pair
                            return acc;
                        }, {});

                        return filteredList;
                    })
    
                    navigate(`/dungeon-board/${page}`)
                }

            }else{
                const resp = await fetch(`${config.development.apiURL}dungeon/update-dungeon-details`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dungeonId: dungeonID,
                        dungeonName: dungeon.dungeonName,
                        color: finalColor,
                        dungeonDescription: dungeon.dungeonDescription,
                        dungeonCheckpoints: dungeon.dungeonCheckpoints,
                        completionProgress: dungeon.completionProgress,
                        dungeonCompleted: false,
                    })
                })

                if(resp.status === 401){
                    if(!retry){
                        await tokenRefresh();
                        handleSubmitChanges(true);
                        return;
                    }else{
                        const toastId = 'dungeon-detail-error-unauthorized';
                        if(!toast.isActive(toastId)) 
                        toast.error('An error has occured. Please try re-logging into your account again. ', {toastId})
                    }
                }

                if(resp.ok){
                    setLoading(false);
                    const data = await resp.json();
                    setDungeonList((prevList) => ({
                        ...prevList,
                        ...data
                    }))
                    navigate(`/dungeon-board/${page}`)
                    }
            }
        }catch(err){
            setLoading(false);
            const toastId = 'dungeon-detail-error-server';

            if(!toast.isActive(toastId)) 
            toast.error('An error has occured. Please try again later.', {toastId});
        }
    }

    const exitDetailCard = () => {
        callNoSaveNotif();
        navigate(`/dungeon-board/${page}`);
    }

    const handleRightMouseDown = () => {
        setShowMenu(true);
    }

    return(
        <motion.div 
        onClick={exitDetailCard}
        initial={{ opacity: 0, rotateY: 90}}
        animate={{ opacity: 1, rotateY: 180}}
        transition={{duration: 0.3}}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            {loading && <LoadingScreen />}
            {
                !dungeon ? 
                <CircularProgress /> :
                <div 
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd})`,
                  }}
                  onClick={(e) => {e.stopPropagation()}}
                className={`h-4/5 w-3/4 relative transform rotate-y-180 pt-8 bg-gradient-to-b from-[#d6cdd0] to-[#b8a9b1] rounded-lg z-50`}>
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

                            <div className="h-1/3 w-full flex flex-col items-center px-2 relative">
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

                            <div className="h-1/3 w-full flex items-center justify-center px-2">
                                <div className="w-2/3 h-full grid grid-cols-6 gap-2">
                                    {
                                        colors.map((color, index) => {
                                            return(
                                                <div 
                                                onClick={() => {setGradientStart(Object.keys(color)); setGradientEnd(Object.values(color)[0])}}
                                                key={index} className={`${gradientStart[0] === Object.keys(color)[0] ? 'bg-black' : 'bg-white hover:bg-black'} hover:cusor-pointer aspect-square w-full max-w-[60px] rounded-full p-1 flex justify-center items-center`}>
                                                    <div className="w-full h-full rounded-full" style={{ backgroundColor: Object.keys(color) }}></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="absolute bottom-2 mx-auto">
                                    <Button
                                    onClick={() => {handleSubmitChanges(false)}}
                                    sx={{
                                        fontFamily: 'silkscreen',
                                        color: 'black'
                                    }}>Save and Exit</Button>
                                </div>
                        </div>
                        <div className="h-full w-1/2 flex flex-col items-center justify-center overflow-y-auto">
                        <div className="h-1/4 w-full w-full flex flex-col items-center justify-center">
                                    <p className="text-xl">Completion Progress:</p>
                                    <p>{(dungeon.completionProgress * 100).toFixed(2)}%</p>
                                </div>
                           <div className="h-3/4 w-full flex flex-col items-center ">
                                <p className="text-xl">Checkpoints</p>
                                <Checkpoints theme={'pixel'} checkpoints={dungeon.dungeonCheckpoints} handleSubmit={handleNewCheckpointList} btnColor={"black"} setRightClick={handleRightMouseDown} />
                           </div>
                        </div>
                        {
                            showMenu &&
                            <RightClickMenu position={menuPos} />
                        }
                    </div>
                    
                    
                </div>
            }
        </motion.div>
    );
}

export default DungeonDetailCard;