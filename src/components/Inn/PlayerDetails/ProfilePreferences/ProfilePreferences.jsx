import { Button, InputAdornment, InputLabel, Tab, Tabs, TextField } from "@mui/material"; 
import React, { useState } from "react"; 
import Pfp from '../../../../images/profile-pic.jpg';
import EditIcon from '@mui/icons-material/Edit';
 
const ProfilePreferences = () => { 

    return( 
        <div className="relative h-full w-full flex flex-col"> {/* Change flex direction based on screen size */}
            {/* pfp, displayName, status */} 
            <div className="relative h-1/3 w-full">
                <div className="h-full w-70p p-2 flex">
                    <div className="relative h-full aspect-square">
                        <img src={Pfp} 
                            className={`h-full w-full object-fit`}
                        />
                        <div className={`absolute inset-0 bg-black opacity-0 backdrop-blur-sm color-black 
                            flex flex-col justify-center items-center hover:opacity-50 hover:cursor-pointer`}>
                            <EditIcon sx={{
                                color: "white",
                            }} />
                            <p
                            className="text-gray-300"
                            >Edit Picture</p>
                            
                        </div>
                    </div>
                    <div className="relative h-full w-full flex flex-col pl-2 justify-center">
                        <p className="font-bold text-xl">Wabbit_Sushi</p>
                        <p className="text-sm italic">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur dui eu laoreet commodo.
                        </p>
                    
                    </div>
                </div>

                <div className="border border-darkPink border-1 w-full"></div>
                <div
                    className="absolute bottom-0 right-2 text-xs text-sky-500 underline hover:text-sky-200 hover:cursor-pointer"
                >Edit Details</div>
            </div>
            <div className="h-1/3 w-1/2 p-2">
                <div className="relative h-fit w-full flex items-center">
                    <p className="text-sm font-bold p-0 m-0 pl-2">Schedule</p>
                    <p className="text-xs text-sky-500 absolute right-0 underline hover:cursor-pointer hover:text-sky-500">Edit Schedule</p>
                </div>
                 <div className="h-90p w-full rounded-lg border-darkPink border-2 flex">
                    <div className="h-full w-fit grid grid-rows-7 border-r-darkPink border-r-2 text-start p-1 gap-2 items-center ">
                            <p>Mon</p>
                            <p>Tue</p>
                            <p>Wed</p>
                            <p>Thu</p>
                            <p>Fri</p>
                            <p>Sat</p>
                            <p>Sun</p>
                    </div>
                    <div className="h-full w-3/4 grid grid-rows-7 flex text-start p-1 gap-2 items-center">
                        <p>0830 - 1730</p>
                        <p>0830 - 1730</p>
                        <p>0830 - 1730</p>
                        <p>0830 - 1730</p>
                        <p>0830 - 1730</p>
                        <p>0830 - 1230; 1430 - 1730</p>
                        <p> Rest </p>
                    </div>
                </div>
            </div>
        </div> 
    ); 
} 
 
export default ProfilePreferences;