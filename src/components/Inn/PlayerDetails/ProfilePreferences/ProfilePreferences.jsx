import { Button, InputAdornment, InputLabel, Tab, Tabs, TextField } from "@mui/material"; 
import React, { useContext, useState } from "react"; 
import Pfp from '../../../../images/profile-pic.jpg';
import EditIcon from '@mui/icons-material/Edit';
import { EventContext } from "../../../WarRoom/components/EventContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditCat from "../EditPopUps/EditCat";
import EditDetails from "../EditPopUps/EditDetails";
import EditSchedule from "../EditPopUps/EditSchedule";
 


const ProfilePreferences = () => { 
    const {categories} = useContext(EventContext);
    const [editCategories, setEditCategories] = useState(false);
    const [editSchedule, setEditSchedule] = useState(false);
    const [editDetails, setEditDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);

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
            {/* pfp, displayName, status */} 
            <div className={`relative h-1/3 w-full ${editMode ? 'opacity-0 z-0 pointer-events-none': 'opacity-100 z-50'}`}>
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
                    onClick={toggleEditDetails}
                    className="absolute top-2 right-2 text-xs text-sky-500 underline hover:text-sky-200 hover:cursor-pointer"
                >Edit Details</div>
            </div>
            <div className={`h-2/3 w-full flex ${editMode ? 'opacity-0 z-0 pointer-events-none' : 'opacity-100 z-50'}`}>
                <div className="h-2/3 flex-auto p-2">
                    <div className="relative h-fit w-full flex items-center">
                        <p className="text-sm font-bold p-0 m-0 pl-2">Schedule</p>
                        <p 
                        onClick={toggleEditSchedule}
                        className="text-xs text-sky-500 absolute right-0 underline hover:cursor-pointer hover:text-sky-500">Edit Schedule</p>
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
                <div className="h-2/3 flex-auto p-2">
                    <div className="relative h-fit w-full flex items-center">
                        <p className="text-sm font-bold p-0 m-0 pl-2">Categories</p>
                        <p 
                        onClick={toggleEditCategories}
                        className="text-xs text-sky-500 absolute right-0 underline hover:cursor-pointer hover:text-sky-300">Edit Categories</p>
                    </div>
                    <div className="h-90p w-full rounded-lg border-darkPink border-2 flex flex-col justify-evenly items-center p-2">
                        <div className={`h-full w-full grid gap-1`}>
                            {
                                Object.entries(categories).map((cat) => {
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
                <div className="h-2/3 flex-auto p-2">
                    <div className="relative h-fit w-full flex items-center">
                        <p className="text-sm font-bold p-0 m-0 pl-2">Salary</p>
                        <p className="text-xs text-sky-500 absolute right-0 underline hover:cursor-pointer hover:text-sky-500">Edit Salary</p>
                    </div>
                    <div className="h-90p w-full rounded-lg border-darkPink border-2 flex flex-col justify-center items-center">
                        <div className="h-1/2 w-1/2 rounded-full bg-black text-white flex justify-center items-center">
                            <p>1000</p>
                        </div>

                        <p>Monthly</p>
                    </div>
                </div>
            </div>
        </div> 
    ); 
} 
 
export default ProfilePreferences;