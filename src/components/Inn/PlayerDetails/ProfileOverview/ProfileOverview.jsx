import { Button, InputAdornment, InputLabel, TextField } from "@mui/material"; 
import React, { useState } from "react"; 
import Pfp from '../../../../images/profile-pic.jpg';
 
const ProfileOverview = () => { 
    const [selectedDisplay, setSelectedDisplay] = useState("Longest Dungeons");

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
        <div className="h-full w-full flex flex-col qp:flex-row "> {/* Change flex direction based on screen size */}
            {/* pfp, displayName, status */} 
            <div className="h-1/3 qp:h-full w-full qp:w-2/3 flex qp:flex-col py-4 px-8 items-center justify-center"> 
                <div className="w-85p h-90p hf:w-2/3  qp:h-1/2  qp:w-95p flex">
                    <div className="h-full aspect-square" >
                        <img src={Pfp} 
                            className="h-full w-full object-fit qp:p-4 hover:cursor-pointer"
                        />
                    </div>

                    <div className="relative h-full w-full flex flex-col gap-2 ">
                        <div className="w-full h-1/3 flex flex-col qp:mt-2">
                            <p className="text-xs font-bold">Display Name:</p>
                            <input value={"name"} className="px-1 ml-2 mt-0 rounded w-85p bg-transparent outline-none border border-rose-400 text-xs" 
                            type="text" />
                        </div>

                        <div className="w-full h-2/3 flex flex-col text-xs qp:mb-4">
                            <p className="font-bold">Status: </p>
                            <textarea value={"hello!"}
                            className="ml-2 mt-0 mb-1 p-1 rounded w-85p bg-transparent outline-none border  border-rose-400 h-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="qp:pl-4">
                    <Button
                        size="small"
                    >Save Changes</Button>
                </div>
            </div> 
 
            {/* dungeon completion highlights */} 
            <div className="h-2/3 qp:h-full w-full qp:w-1/3 flex flex-col border-none qp:border-solid qp:border-l-2 border-darkPink"> 
                <div className="w-full h-10 qp:h-12 border-b-2 border-darkPink flex"> 
                    <div className="w-full h-full grid grid-cols-3 flex items-center ">
                        <p 
                        onClick={() => {onClickLD()}}
                        className={`text-center hover:underline decoration-deepPink hover:cursor-pointer
                        ${selectedDisplay === "Longest Dungeons" ? "underline" : null}
                        `}>Longest Dungeons</p>
                        <p 
                        onClick={() => {onClickRC()}}
                        className={`text-center hover:underline decoration-deepPink hover:cursor-pointer
                        ${selectedDisplay === "Recent Clears" ? "underline" : null}
                        `}>Recent Clears</p>
                        <p 
                        onClick={() => {onClickFC()}}
                        className={`text-center hover:underline decoration-deepPink hover:cursor-pointer
                        ${selectedDisplay === "Fastest Clears" ? "underline" : null}
                        `}>Fastest Clears</p>
                    </div>
                </div> 
            </div> 
        </div> 
    ); 
} 
 
export default ProfileOverview;