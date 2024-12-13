import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import React, { useContext, useState, useEffect } from "react";
import { X } from 'lucide-react';
import DungeonSelector from "../../DungeonSelector/DungeonSelector";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { ToastContainer, toast } from 'react-toastify';
import { EventContext } from "./EventContext";

const EventCreator = ({toggleCreatingEvent, time}) => {
    const [cat, setCat] = useState("cat2");
    const [eventName, setEventName] = useState("");
    const [defStart, setDefStart] = useState(time[0]);
    const [defEnd, setDefEnd] = useState(time[1]);
    const [eventDescription, setEventDescription] = useState("");
    const {eventList, setEventList, categories} = useContext(EventContext);
    const [dungeon, setDungeon] = useState(null);

    const onDungeonChange = (e) => {
        setDungeon(e.target.value);
    }

    const onChangeEventName = (e) => {
        setEventName(e.target.value);
    }

    const onChangeEventDescription = (e) => {
        setEventDescription(e.target.value)
    }

    const onChangeEventCat = (e) => {
        setCat(e.target.value);
    }

    const handleClickExit = () => {
        toggleCreatingEvent();
    }

    const onClickSave = () => {
        if(!eventName){
            toast.error("Please fill in an event name!");  
            return; 
        }

        if(defEnd.toDate().getTime() <= defStart.toDate().getTime()){
            toast.error("Please ensure that end time is after the start time!")
            return;
        }

        const eventId = eventList.length + 1;
        const newEvent = {
            id: eventId,
            title: eventName,
            start: defStart.toDate(),
            end: defEnd.toDate(),
            color: categories[cat].color
        }
        setEventList((prevList) => [...prevList, newEvent])
        handleClickExit();
    }

    return(
        <div className="bg-black fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <ToastContainer />
            <div className="relative h-90p w-4/5 flex flex-col items-center gap-0 bg-white overflow-y-auto">
                <div className="h-fit w-full font-grapeNuts text-3xl text-center">
                    <p>New Event</p>
                </div>
                <div 
                onClick={handleClickExit}
                className="absolute right-0 top-0 hover:cursor-pointer">
                    <X />
                </div>
                <div className="flex-1 w-95p font-grapeNuts flex flex-col justify-evenly gap-1">
                    <div className="w-full flex h-fit gap-4">
                        <div className="w-1/2">
                            <TextField 
                                className="w-full"
                                value={eventName}
                                onChange={onChangeEventName}
                                variant="outlined" 
                                size="small"
                                label="Event Title"
                                sx={{
                                    height: '40px',
                                    backgroundColor: '#f5f5f5',
                                    '& .MuiInputBase-input': {
                                        fontFamily: 'PatrickHand',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                    },
                                }}
                            />
                        </div>
                        <div className="w-1/4 relative">
                        <FormControl fullWidth>
                                <InputLabel
                                    id="event-category-label"
                                >Category</InputLabel>
                                <Select
                                    id="event-category"
                                    labelId="event-category-label"
                                    onChange={onChangeEventCat}
                                    value={cat}
                                    label="Category"
                                    fullWidth
                                    sx={{
                                        height: '40px',
                                        backgroundColor: '#f5f5f5',
                                        width: '100%',
                                        fontFamily: 'PatrickHand'
                                    }}
                                >
                                    {
                                        Object.entries(categories).map((cat) => {
                                            return(
                                                <MenuItem
                                                    sx={{
                                                        fontFamily: 'PatrickHand'
                                                    }}
                                                    value={cat[0]}>
                                                        <div className="h-full w-full flex items-center">
                                                            <div className={`h-4 w-4 rounded-full`} style={{backgroundColor: cat[1].color}}>
                                                            </div>
                                                            <p>{cat[1].name}</p>
                                                        </div>
                                                    </MenuItem>
                                            )
                                        })
                                    }   
                                </Select>
                            </FormControl>
                        </div>
                        {
                            cat === "cat1" &&
                            <div className="w-1/3">
                                <DungeonSelector onDungeonChange={onDungeonChange}/>
                            </div>
                        }
                    </div>
                    <div className="w-full flex justify-center items-center gap-2">
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <DatePicker 
                                disablePast
                                defaultValue={defStart}
                                onChange={(e) => {setDefStart(e)}}
                                formatDensity="dense"
                                sx={{
                                    backgroundColor: '#f5f5f5',
                                }}
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
                                label="Start Day" />
                        </div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <MobileTimePicker 
                            onChange={(e) => {setDefStart(e)}}
                            label="Start Time"
                            sx={{
                                backgroundColor: '#f5f5f5',
                            }}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                }
                            }}
                            defaultValue={defStart} />
                        </div>
                        <div><ArrowRightAltIcon /></div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <DatePicker 
                                onChange={(e) => {setDefEnd(e)}}
                                disablePast
                                formatDensity="dense"
                                defaultValue={defEnd}
                                sx={{
                                    backgroundColor: '#f5f5f5',
                                }}
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
                                label="End Day" />
                        </div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <MobileTimePicker 
                            onChange={(e) => {setDefEnd(e)}}
                            label="End Time"
                            sx={{
                                backgroundColor: '#f5f5f5',
                            }}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                }
                            }}
                            defaultValue={defEnd} />
                        </div>
                    </div>
                    <TextField
                        variant="outlined"
                        fullWidth
                        sx={{
                            backgroundColor: '#f5f5f5',
                            '& .MuiInputBase-input': {
                                fontFamily: 'PatrickHand',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                            },
                        }}
                        label="Description of the event"
                        multiline
                        rows={7}
                        value={eventDescription}
                        onChange={onChangeEventDescription}
                        
                    />
                    <Button
                        onClick={onClickSave}
                    >Save</Button>
                </div>
            </div>
        </div>
    );
}

export default EventCreator;