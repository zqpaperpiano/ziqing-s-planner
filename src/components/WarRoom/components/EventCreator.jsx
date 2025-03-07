import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import React, { useContext, useState, useEffect } from "react";
import { X } from 'lucide-react';
import DungeonSelector from "../../DungeonSelector/DungeonSelector";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { ToastContainer, toast } from 'react-toastify';
import { EventContext } from "./EventContext";
import { AuthContext } from "../../../config/authContext";
import { auth } from "../../../config/firebase";
import config from '../../../config/config.json';
import dayjs from "dayjs";
import DeleteConfirmation from "../../DeleteConfirmation/DeleteConfirmation";

const EventCreator = ({toggleCreatingEvent, time, event, hasEvent}) => {
    const [cat, setCat] = useState(event?.category || "cat2");
    const [eventName, setEventName] = useState(event?.title || "");
    const [defStart, setDefStart] = useState(event?.start ? dayjs(event?.start) : time[0]);
    const [defEnd, setDefEnd] = useState(event?.end ? dayjs(event?.end): time[1]);
    const [eventDescription, setEventDescription] = useState(event?.description || "");
    const {eventList, setEventList, eventMap} = useContext(EventContext);
    const { player, tokenRefresh } = useContext(AuthContext);
    const categories = player?.preferences?.categories;
    const [dungeon, setDungeon] = useState(event?.dungeon || null);
    const [deleteEvent, setDeleteEvent] = useState(false);
    const [retries, setRetries] = useState(false);

    const onDungeonChange = (dungeonId) => {
        setDungeon(dungeonId);
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

    //check which parts of the event Object has been updated and add into updated object to be passed in API call
    const checkUpdates = (desc) => {
        let updates = {};

        if(event.title !== eventName){
            console.log('name has been updated');
            updates.title = eventName;
        }

        if(event.start.getTime()!== defStart.toDate().getTime()){
            console.log('start time has been updated')
            updates.start = defStart.toDate();
        }

        if(event.end.getTime() !== defEnd.toDate().getTime()){
            console.log('end time has been updated')
            updates.end = defEnd.toDate();
        }

        if(event.category !== cat){
            console.log('category has been updated')
            updates.category = cat;
            updates.color = categories[cat].color;
        }

        if(event.dungeon !== dungeon){
            console.log('dungeon has been updated')
            updates.dungeon = dungeon;
        }

        if(event.description !== desc){
            console.log('description has been updated')
            updates.description = desc;
        }

        console.log('updates: ', updates);

        return updates;
    }

    const updateChanges = async(updates) => {
        const token = await auth.currentUser.getIdToken();
        const eventId = event.eventId;
        // console.log('my eventId: ', event);

        try{
            const resp = await fetch(`${config.development.apiURL}event/updateEvent`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventId: event.eventId,
                    updates: updates
                })
            });

            if(resp.status===401){
                if(!retries){
                    setRetries(true);
                    await tokenRefresh();
                    updateChanges(updates);
                }else{
                    setRetries(false);
                    throw new Error('Unauthorized');
                }
            }

            if(resp.ok){
                setRetries(false);
                const data = await resp.json();
                const formatEvent = {
                    ...data,
                    start: new Date(data.start),
                    end: new Date(data.end)
                }
    
                const index = eventMap.get(event.eventId);
                setEventList(prevList => {
                    let newList = [...prevList];
                    newList[index] = formatEvent;
                    return newList;
                })
                handleClickExit();
            }
        }catch(err) {
            console.log('An error has occured with the server. Please try again: ', err);
        }
    }

    const onClickDelete =  async() => {
        const token = await auth.currentUser.getIdToken();
        const eventId = event.eventId;
        // console.log('eventId: ', eventId);

        try{
            const resp = await fetch(`${config.development.apiURL}event/deleteEvent/${eventId}`, {
                method: 'DELETE',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if(resp.status === 401){
                if(!retries){
                    setRetries(true);
                    await tokenRefresh();
                    onClickDelete();
                }else{
                    setRetries(false);
                    throw new Error('Unauthorized');
                }
            }


            if(resp.ok){
                const index = eventMap.get(eventId);
                setEventList(prevList => {
                    let newList = [...prevList];
                    newList.splice(index, 1);
                    return newList;
                })
                setDeleteEvent(false);
                handleClickExit();
            }
        }catch(err){
            console.log('An error has occured: ', err);
        }
    }

    const onUndoDelete = () => {
        setDeleteEvent(false);
    }

    const onClickSave = () => {
        if(!eventName){
            toast.error("Please fill in an event name!");  
            return; 
        }

        if(defEnd.toDate().getTime() < defStart.toDate().getTime()){
            toast.error("Please ensure that end time is after the start time!")
            return;
        }

        const playerId = auth.currentUser.uid;

        let desc = eventDescription;
        if(desc === ""){
            desc = "No description provided";
        }

        if(hasEvent){
            const update = checkUpdates(desc);
            if(Object.keys(update).length > 0){
                updateChanges(update);
            }

        }else{
            const newEvent = {
                title: eventName,
                start: defStart.toDate(),
                end: defEnd.toDate(),
                color: categories[cat].color,
                category: cat, 
                dungeon: dungeon,
                description: desc,
                createdBy: playerId
            }
    
            auth.currentUser.getIdToken()
            .then(token => {
                fetch(`${config.development.apiURL}event/createNewEvent`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        event: newEvent
                    })
                })
                .then(resp => resp.json())
                .then(data => {
                    const formatEvent = {
                        ...data,
                        start: new Date(data.start),
                        end: new Date(data.end)
                    }
    
                    setEventList((prevList) => [...prevList, formatEvent]);
                    handleClickExit();
                })
                .catch(err => {
                    console.log('An error has occured with the server. Please try again');
                })
            })
        }

        
    }

    return(
        <div className="bg-black fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <ToastContainer />
            <div className="relative h-90p w-4/5 flex flex-col justify-center items-center gap-0 bg-white overflow-y-auto">
                <div className="h-fit w-full font-grapeNuts text-3xl text-center mt-4">
                    <p>{eventName === "" ? "New Event" : eventName}</p>
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
                                        Object.entries(categories).map((cat, index) => {
                                            return(
                                                <MenuItem
                                                    key={index}
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
                    <div className="flex justify-center gap-4 items-center h-fit">
                        <div className="w-1/2 flex justify-center items-center">
                            <Button
                                onClick={onClickSave}
                            >{hasEvent ? "Save Changes" : "Create Event"}
                            </Button>
                        </div>
                        <div className="w-1/2 flex justify-center items-center">
                        {
                            hasEvent &&
                            <Button
                                onClick={() => setDeleteEvent(true)}
                                sx={{
                                    color: 'red',
                                    '&:hover': {
                                        backgroundColor: 'red',
                                        color: 'white'
                                    }
                                }}
                            >Delete</Button>
                        }
                        </div>
                    </div>
                    {
                        deleteEvent &&
                        <DeleteConfirmation event={"event"} onClickDelete={onClickDelete} onClickUndo={onUndoDelete}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default EventCreator;