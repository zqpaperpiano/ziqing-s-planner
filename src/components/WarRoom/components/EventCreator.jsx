import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { X } from 'lucide-react';
import DungeonSelector from "../../DungeonSelector/DungeonSelector";
import { DungeonContext } from "../../QuestBoard/DungeonContext/DungeonContext";

const EventCreator = ({toggleCreatingEvent}) => {
    const startTime = new Date();
    const [cat, setCat] = useState("Dungeon");
    const [eventName, setEventName] = useState("");

    const onChangeEventName = (e) => {
        setEventName(e.target.value);
    }

    const onChangeEventCat = (e) => {
        setCat(e.target.value);
    }

    const handleClickExit = () => {
        toggleCreatingEvent();
    }

    return(
        <div className="bg-black fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items align">
            <div className="relative h-90p w-4/5 bg-white my-auto overflow-hidden ">
                <div className="h-10p w-full font-grapeNuts text-3xl text-center">
                    <p>New Event</p>
                </div>
                <div 
                onClick={handleClickExit}
                className="absolute right-0 top-0 hover:cursor-pointer">
                    <X />
                </div>
                <div className="flex-1 w-full font-grapeNuts flex flex-col items-center justify-center gap-2">
                    <div className="w-1/2 flex flex-col items-start">
                        {/* <InputLabel>Event Name</InputLabel> */}
                        <TextField 
                            className="w-full"
                            value={eventName}
                            onChange={onChangeEventName}
                            variant="outlined" 
                            size="small"
                            label="Event Title"
                            sx={{
                                '& .MuiInputBase-input': {
                                    fontFamily: 'PatrickHand',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                },
                            }}
                        />
                    </div>
                    <div className="w-1/3 flex flex-col items-center justify-center">
                        <div className="flex text-xl w-full items-center justify-between">
                                <p>Choose category </p>
                                <Button
                                    size="small"
                                    sx={{
                                        fontFamily: 'GrapeNuts',
                                        color: 'blue', 
                                        fontSize: '0.75rem',
                                    }}
                                >Add Category</Button>
                            </div>
                            <Select
                                onChange={onChangeEventCat}
                                value={cat}
                                label="category"
                                fullWidth
                                sx={{
                                    fontFamily: 'PatrickHand'
                                }}
                            >   
                                <MenuItem 
                                sx={{
                                    fontFamily: 'PatrickHand'
                                }}
                                value={"Dungeon"}>Clearing Dungeon</MenuItem>
                                <MenuItem 
                                sx={{
                                    fontFamily: 'PatrickHand'
                                }}
                                value={"Errands"}>Running Errands</MenuItem>
                                <MenuItem 
                                sx={{
                                    fontFamily: 'PatrickHand'
                                }}
                                value={"Misc"}>Misc</MenuItem>
                                <MenuItem
                                sx={{
                                    fontFamily: 'PatrickHand'
                                }}
                                value={"Meetings"}>Having Meetings</MenuItem>
                                <MenuItem
                                sx={{
                                    fontFamily: 'PatrickHand'
                                }}
                                value={"Social"}>Social Actvities</MenuItem>
                            </Select>
                    </div>
                    <div className="flex-1 w-75p flex justify-center items-center gap-2 mt-2">
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <DatePicker 
                                disablePast
                                formatDensity="dense"
                                slotProps={{
                                    textField: {
                                        size: "small"
                                    },
                                    popper: {
                                        placement: 'bottom-end',
                                        sx: {
                                            paddingTop: '10px',
                                            scale: '0.85'
                                        }
                                    },
                                    
                                }}
                                label="Day" />
                        </div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <MobileTimePicker 
                            label="Start Time"
                            slotProps={{
                                textField: {
                                    size: 'small',
                                }
                            }}
                            defaultValue={dayjs(startTime.getTime())} />
                        </div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <MobileTimePicker 
                            label="End Time"
                            slotProps={{
                                textField: {
                                    size: 'small'
                                }
                            }}
                            defaultValue={dayjs(startTime.getTime())} />
                        </div>
                    </div>
                    {
                        cat === "Dungeon" &&
                        <div className="w-1/3 flex-1">
                            <p className="font-grapeNuts text-xl">Choose your dungeon</p>
                            <DungeonSelector />
                        </div>
                    }
                    <div className="absolute bottom-2">
                        <Button
                            variant="text"
                            size="small"
                            sx={{
                                fontFamily: 'GrapeNuts',
                                textDecoration: 'underline',
                                color: 'blue',
                                textDecorationColor: 'blue'
                            }}
                        >Add Event</Button>
                    </div>

                </div>
            </div>


        </div>
    );
}

export default EventCreator;