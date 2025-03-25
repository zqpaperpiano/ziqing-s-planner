import { Button, InputAdornment, InputLabel, Tab, Tabs, TextField } from "@mui/material"; 
import React, { useContext, useState, useEffect } from "react"; 
import EditSalary from "../EditPopUps/EditSalary";
import EditCat from "../EditPopUps/EditCat";
import EditDetails from "../EditPopUps/EditDetails";
import EditSchedule from "../EditPopUps/EditSchedule";
import { AuthContext } from "../../../../contexts/authContext";
import DayScheduleBreakdown from "./Components/DayScheduleBreakdown";


const ProfilePreferences = () => { 
    const [editCategories, setEditCategories] = useState(false);
    const [editSchedule, setEditSchedule] = useState(false);
    const [editSalary, setEditSalary] = useState(false);
    const [editDetails, setEditDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const { player } = useContext(AuthContext);

    // useEffect(() => {
    //     console.log("schedule: ", player?.preferences?.schedule);
    // })

    const toggleEditSchedule = () => {
        if(editSchedule){
            setEditSchedule(false);
            setEditMode(false);
        }else{
            setEditSchedule(true);
            setEditMode(true);
        }
    }

    const toggleEditDetails = () => {
        if(editDetails){
            setEditDetails(false);
            setEditMode(false);
        }else{
            setEditDetails(true);
            setEditMode(true);
        }
    }

    const toggleEditSalary = () => {
        if(editSalary){
            setEditSalary(false);
            setEditMode(false);
        }else{
            setEditSalary(true);
            setEditMode(true);
        }
    }

    const toggleEditCategories = () => {
        if(editCategories){
            setEditCategories(false);
            setEditMode(false);
        }else{
            setEditCategories(true);
            setEditMode(true);
        }
    }

    return( 
        <div className={"relative h-full w-full flex flex-col"}> {/* Change flex direction based on screen size */}
            {editCategories && <EditCat onClose={toggleEditCategories} />}
            {editDetails && <EditDetails handleClose={toggleEditDetails}/>}
            {editSchedule && <EditSchedule onClose={toggleEditSchedule}/>}
            {editSalary && <EditSalary onClose={toggleEditSalary}/>}

            {/* pfp, displayName, status */} 
            <div className={`relative h-1/4 w-full ${editMode ? 'opacity-0 z-0 pointer-events-none': 'opacity-100 z-50'}`}>
                <div className="h-full w-70p p-2 flex">
                    <div className="relative h-full w-full flex flex-col pl-2 justify-center">
                        <p className="font-bold text-xl">{player.name}</p>
                        <p className="text-sm italic">
                            {player.status}
                        </p>
                    
                    </div>
                </div>

                <div className="border border-darkPink border-1 w-full"></div>
                <div
                    onClick={toggleEditDetails}
                    className="absolute top-2 right-2 text-xs text-sky-500 underline hover:text-sky-200 hover:cursor-pointer"
                >Edit Details</div>
            </div>
            <div className={`h-3/4 w-full flex flex-col ${editMode ? 'opacity-0 z-0 pointer-events-none' : 'opacity-100 z-50'}`}>
                <div className="h-1/2 w-full p-2">
                    <div className="relative h-fit w-full flex items-center">
                        <p className="text-sm font-bold p-0 m-0 pl-2">Routine</p>
                        <p 
                        onClick={toggleEditSchedule}
                        className="text-xs text-sky-500 absolute right-0 underline hover:cursor-pointer hover:text-sky-500">Edit Routine</p>
                    </div>
                    <div className="h-90p w-full rounded-lg border-darkPink border-2 flex">
                    <div className="h-full w-full bg-black rounded-lg flex justify-center items-center">
                            <p className="font-silkscreen font-5xl text-white text-center">Not available yet!</p>
                        </div>
                        {/* {
                            player?.preferences?.hasSchedule ?
                            <div className='h-full w-full flex'>
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
                                <DayScheduleBreakdown day={player?.preferences?.schedule?.Mon}/>
                                <DayScheduleBreakdown day={player?.preferences?.schedule?.Tue}/>
                                <DayScheduleBreakdown day={player?.preferences?.schedule?.Wed}/>
                                <DayScheduleBreakdown day={player?.preferences?.schedule?.Thu}/>
                                <DayScheduleBreakdown day={player?.preferences?.schedule?.Fri}/>
                                <DayScheduleBreakdown day={player?.preferences?.schedule?.Sat}/>
                                <DayScheduleBreakdown day={player?.preferences?.schedule?.Sun}/>
                            </div> 
                        </div> :
                        <div className="h-full w-full bg-black rounded-lg flex justify-center items-center">
                            <p className="font-silkscreen font-5xl text-white text-center">No routine set</p>
                        </div>
                        } */}
                    </div>
                </div>
                <div className="h-1/2 w-full p-2 flex">
                    <div className="h-full flex-auto p-2">
                        <div className="relative h-fit w-full flex items-center">
                            <p className="text-sm font-bold p-0 m-0 pl-2">Categories</p>
                            <p 
                            onClick={toggleEditCategories}
                            className="text-xs text-sky-500 absolute right-0 underline hover:cursor-pointer hover:text-sky-300">Edit Categories</p>
                        </div>
                        <div className="h-90p w-full rounded-lg border-darkPink border-2 flex flex-col justify-evenly items-center p-2">
                            <div className={`h-full w-full grid gap-1 overflow-auto`}>
                                {
                                    Object.entries(player?.preferences?.categories).map((cat) => {
                                        return(
                                            <div 
                                            key={cat[0]}
                                            className="relative h-full w-full rounded-lg">
                                                <div className="absolute h-full z-20 w-full flex items-center justify-start gap-2 z-20 p-1">
                                                    <div 
                                                        style={{backgroundColor: cat[1].color}}
                                                        className={`h-3 w-3 rounded-full`}>
                                                        </div>
                                                        <div className="text-sm select-none">{cat[1].name}</div>
                                                    </div>
                                                </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="h-full flex-auto p-2">
                        <div className="relative h-fit w-full flex items-center">
                            <p className="text-sm font-bold p-0 m-0 pl-2">Salary</p>
                            <p 
                            onClick={toggleEditSalary}
                            className="text-xs text-sky-500 absolute right-0 underline hover:cursor-pointer hover:text-sky-500">Edit Salary</p>
                        </div>
                        <div className="h-90p w-full rounded-lg border-darkPink border-2 flex flex-col justify-center items-center">
                        <div className="h-full w-full bg-black rounded-lg flex justify-center items-center">
                                    <p className="font-silkscreen font-5xl text-white text-center">Not available yet!</p>
                                </div>
                            {/* {
                                player?.preferences?.hasSalary ?
                                <div className="h-full w-full flex items-center justify-center">
                                    <div className="h-full w-1/2 p-2 flex items-center justify-center">
                                        <p className="font-tiny5 font-10xl font-bold">{player?.preferences?.salary}</p>
                                    </div>

                                    <div className="h-full w-1/2 text-xl font-silkscreen text-black flex justify-center items-center">
                                    {
                                        player?.preferences?.salaryFrequency?.frequency === 'Daily' ?
                                        <p className="">Daily</p> :
                                        <p>{player?.preferences?.salaryFrequency?.day}</p>
                                    }
                                    </div>
                                </div> 
                                
                                :

                                <div className="h-full w-full bg-black rounded-lg flex justify-center items-center">
                                    <p className="font-silkscreen font-5xl text-white text-center">No salary set</p>
                                </div>
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    ); 
} 
 
export default ProfilePreferences;