import { InputAdornment, InputLabel, TextField, Button } from "@mui/material"; 
import React, { useState, useEffect } from "react"; 
import defPfp from '../../../../images/profile-pic.jpg';
 
const ProfileOverview = ({player}) => { 
    const [selectedDisplay, setSelectedDisplay] = useState("Longest Dungeons");
    const pfp = player.pfp || defPfp;
    const [displayName, setDisplayName] = useState(player.name);
    const [status, setStatus] = useState(player.status);

    const handleChangeDisplayName = (e) => {
        setDisplayName(e.target.value);
    }

    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
    }

    const onClickLD = () => {
        setSelectedDisplay("Longest Dungeons");
    }

    const onClickRC = () => {
        setSelectedDisplay("Recent Clears");
    }

    const onClickFC = () => {
        setSelectedDisplay("Fastest Clears");   
    }

    return( 
        <div className="h-full w-full flex flex-col sm:flex-row"> {/* Change flex direction based on screen size */}
            {/* pfp, displayName, status */} 
            <div className="h-full w-full sm:w-2/3 flex items-center justify-center"> 
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="h-48 w-85p flex items-center justify-center"> 
                        <div className="border-2 border-darkPink h-full aspect-square">
                            <img className="h-full w-full object-cover"src={pfp} />
                        </div> 

                        <div className="m-4 w-fit flex flex-col gap-2 min-w-fit"> 
                            <div className="w-full"> 
                                <InputLabel>Display Name:</InputLabel> 
                                <TextField  
                                onChange={(e) => {handleChangeDisplayName(e)}}
                                value={displayName}
                                sx={{ width: '100%' }} 
                                size="small" variant="standard" /> 
                            </div> 
                            <div className="w-full"> 
                                <InputLabel>Status</InputLabel> 
                                <TextField 
                                value={status}
                                onChange={(e) => {handleChangeStatus(e)}}
                                multiline rows={4} size="small"/> 
                            </div> 
                        </div> 
                    </div> 
                    <div className="mt-2">
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </div> 
 
            {/* dungeon completion highlights */} 
            <div className="h-full w-full sm:w-1/3 flex flex-col border-l-2 border-darkPink"> 
                <div className="w-full h-12 border-b-2 border-darkPink flex"> 
                    <div className="w-full h-full grid grid-cols-3 text-center">
                        <p 
                        onClick={() => {onClickLD()}}
                        className={`hover:underline decoration-deepPink hover:cursor-pointer
                        ${selectedDisplay === "Longest Dungeons" ? "underline" : null}
                        `}>Longest Dungeons</p>
                        <p 
                        onClick={() => {onClickRC()}}
                        className={`hover:underline decoration-deepPink hover:cursor-pointer
                        ${selectedDisplay === "Recent Clears" ? "underline" : null}
                        `}>Recent Clears</p>
                        <p 
                        onClick={() => {onClickFC()}}
                        className={`hover:underline decoration-deepPink hover:cursor-pointer
                        ${selectedDisplay === "Fastest Clears" ? "underline" : null}
                        `}>Fastest Clears</p>
                    </div>
                </div> 
            </div> 
        </div> 
    ); 
} 
 
export default ProfileOverview;