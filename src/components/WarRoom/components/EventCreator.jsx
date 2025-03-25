import { MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import React, { useContext, useState, useEffect } from "react";
import DungeonSelector from "../../DungeonSelector/DungeonSelector";
import { ToastContainer, toast } from 'react-toastify';
import { EventContext } from "../../../contexts/EventContext";
import { AuthContext } from "../../../contexts/authContext";
import { auth } from "../../../config/firebase";
import config from '../../../config/config.json';
import dayjs from "dayjs";
import DeleteConfirmation from "../../DeleteConfirmation/DeleteConfirmation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { XIcon } from "raster-react";
import { CheckIcon } from "raster-react";
import EventTasks from "./EventTasks";
import { DeleteIcon } from "raster-react";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";

const EventCreator = ({}) => {
    const location = useLocation();
    const { eventList, setEventList, eventMap} = useContext(EventContext);
    const { eventId } = useParams();
    const event = eventList[eventMap.get(eventId)];

    const navigate = useNavigate();

    const [eventType, setEventType] = useState(event?.type || 'event');

    const [cat, setCat] = useState(event?.category || "cat2");
    const [eventName, setEventName] = useState(event?.title || "");
    const [defStart, setDefStart] = useState(event?.start ? dayjs(event?.start) : dayjs(location?.state?.start));
    const [defEnd, setDefEnd] = useState(event?.end ? dayjs(event?.end): dayjs(location.state.end));
    const [eventDescription, setEventDescription] = useState(event?.description || "");
    const [eventToDos, setEventToDos] = useState(event?.toDos || {"td1": {title: "", completed: false}});
    
    const { player, tokenRefresh, logOut } = useContext(AuthContext);
    const categories = player?.preferences?.categories || [];
    const [dungeon, setDungeon] = useState(event?.dungeon || null);
    const [deleteEvent, setDeleteEvent] = useState(false);

    const [eventRepeat, setEventRepeat] = useState("none");
    const [dayRepeat, setDayRepeat] = useState(1);
    const [weekRepeat, setWeekRepeat] = useState(1);
    const [monthRepeat, setMonthRepeat] = useState(1);
    const [yearRepeat, setYearRepeat] = useState(1);
    const [selectedRepeatNumber, setSelectedRepeatNumber] = useState(null);
    const [repeatUntil, setRepeatUntil] = useState('forever');
    const [repeatTimes, setRepeatTimes] = useState(10);
    const [repeatEndDate, setRepeatEndDate] = useState(defStart);
    const [selectedRepeatEnd, setSelectedRepeatEnd] = useState(null);

    const [loading, setLoading] = useState(false);

        useEffect(() =>{
            let timeoutId;
    
            if(loading){
                timeoutId = setTimeout(() => {
                    toast.error('An error has occured. Please try logging in again.');
                    logOut();
                }, 60000)
            }
    
            return () => {
                if(timeoutId){
                    clearTimeout(timeoutId);
                }
            }
        }, [loading])

    useEffect(() => {
        if(eventRepeat === 'day'){
            setSelectedRepeatNumber(dayRepeat);
        }else if(eventRepeat === 'week'){
            setSelectedRepeatNumber(weekRepeat);
        }else if(eventRepeat === 'month'){
            setSelectedRepeatNumber(monthRepeat);
        }else if(eventRepeat === 'year'){
            setSelectedRepeatNumber(yearRepeat);
        }else{
            setSelectedRepeatNumber(null);
        }
    }, [eventRepeat, dayRepeat, weekRepeat, monthRepeat, yearRepeat]);

    useEffect(() => {
        if(repeatUntil === 'times'){
            setSelectedRepeatEnd(repeatTimes);
        }else if(repeatUntil === 'date'){
            setSelectedRepeatEnd(repeatEndDate.toDate());
        }else{
            setSelectedRepeatEnd(null);
        }
    }, [repeatUntil, repeatTimes, repeatEndDate]);

    const handleClickStuff = (e) => {
        console.log('i have been clicked!', e.target.id);
    }

    const onAddTasks = () => {
        const newTask = {
            title: "",
            completed: false
        }

        const length = Object.keys(eventToDos).length;
        let lastKey = 1;
        if(length !== 0){
            lastKey = Object.keys(eventToDos)[length - 1];
        }
        
        setEventToDos(prevToDos => {
            let newToDos = {...prevToDos};
            newToDos[`td${lastKey + 1}`] = newTask;
            return newToDos;
        })
    }

    const onChangeName = (id, newName) => {
        setEventToDos(prevToDos => {
            let newToDos = {...prevToDos};
            newToDos[id].title = newName;
            return newToDos;
        })
    }

    const onChangeCompletion = (id, completion) => {
        setEventToDos(prevToDos => {
            let newToDos = {...prevToDos};
            newToDos[id].completed = completion;
            return newToDos;
        })
    }

    const onDeleteTask = (id) => {
        setEventToDos(prevToDos => {
            const updatedToDos = { ...prevToDos }; // Create a shallow copy
            delete updatedToDos[id]; // Remove the task
            return updatedToDos; // Return the new object
        });
    };
    

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
        navigate('/warRoom');
    }

    //check which parts of the event Object has been updated and add into updated object to be passed in API call
    const checkEventUpdates = (desc) => {
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

        if(event.repeat !== eventRepeat) updates.repeat = eventRepeat;
        if(event.frequency !== selectedRepeatNumber) updates.frequency = selectedRepeatNumber;
        if(event.repeatType !== repeatUntil) updates.repeatType = repeatUntil;
        if(event.repeatEnding !== selectedRepeatEnd) updates.repeatEnding = selectedRepeatEnd;
        if(event.type !== eventType) updates.type = eventType;

        return updates;
    }

    const checkDeadlineUpdates = (desc) => {
        let updates = {};

        if(event.title !== eventName){
            updates.title = eventName;
        }

        if(event.end.getTime() !== defEnd.toDate().getTime()){
            updates.start = defEnd.toDate();
            updates.end = defEnd.toDate();
        }

        if(event.category !== cat){
            updates.category = cat;
            updates.color = categories[cat].color;
        }

        if(event.dungeon !== dungeon){
            updates.dungeon = dungeon;
        }

        if(event.description !== desc){
            updates.description = desc;
        }

        if(event.repeat !== eventRepeat) updates.repeat = eventRepeat;
        if(event.frequency !== selectedRepeatNumber) updates.frequency = selectedRepeatNumber;
        if(event.repeatType !== repeatUntil) updates.repeatType = repeatUntil;
        if(event.repeatEnding !== selectedRepeatEnd) updates.repeatEnding = selectedRepeatEnd;
        if(event.type !== eventType) updates.type = eventType;

        return updates;
    }

    const updateChanges = async(updates, retry) => {
        const token = await auth.currentUser.getIdToken();
        const eventId = event.eventId;
        // console.log('my eventId: ', event);

        try{
            setLoading(true);
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
                if(!retry){
                    await tokenRefresh();
                    updateChanges(updates, true);
                }else{
                    toast.error('An error has occured. Please try re-logging into your account again. ')
                }
            }

            if(resp.ok){
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
                setLoading(false);
                handleClickExit();
            }
        }catch(err) {
            setLoading(false);
            toast.error('An error has occured with the server. Please try again: ', err);
        }
    }

    const onClickDelete =  async(retry) => {
        const token = await auth.currentUser.getIdToken();
        const eventId = event.eventId;
        // console.log('eventId: ', eventId);

        try{
            setLoading(true);
            const resp = await fetch(`${config.development.apiURL}event/deleteEvent/${eventId}`, {
                method: 'DELETE',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if(resp.status === 401){
                if(!retry){
                    await tokenRefresh();
                    onClickDelete(true);
                }else{
                    toast.error('An error has occured. Please try re-logging into your account again. ')
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
                setLoading(false);
                handleClickExit();
            }
        }catch(err){
            setLoading(false);
            toast.error('An error has occured. Please try again later');
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

        let desc = eventDescription;
            if(desc === ""){
                desc = "No description provided";
            }

        const playerId = auth.currentUser.uid;

        if(eventType === 'event'){
            if(defEnd.toDate().getTime() < defStart.toDate().getTime()){
                toast.error("Please ensure that end time is after the start time!")
                return;
            }
    
            if(location.pathname.split('/').includes('event-details')){
                const update = checkEventUpdates(desc);
                if(Object.keys(update).length > 0){
                    updateChanges(update, false);
                }
    
            }else{
                const newEvent = {
                    title: eventName,
                    type: 'event',
                    start: defStart.toDate(),
                    end: defEnd.toDate(),
                    color: categories[cat].color,
                    category: cat, 
                    dungeon: dungeon,
                    description: desc,
                    createdBy: playerId,
                    repeat: eventRepeat,
                    frequency: selectedRepeatNumber,
                    repeatType: eventRepeat === 'none' ? null : repeatUntil,
                    repeatEnding: selectedRepeatEnd
                }
                
                postNewEvent(newEvent, false);
            }
        }else{
            if(defEnd.toDate().getTime() < new Date().getTime()){
                toast.error("Please ensure deadline is after the current time!")
                return;
            }

            if(location.pathname.includes('event-details')){
                const update = checkDeadlineUpdates(desc);
                if(Object.keys(update).length > 0){
                    updateChanges(update, false);
                }
            }else{
                const newDeadline = {
                    title: eventName,
                    type: 'deadline',
                    start: defEnd.toDate(),
                    end: defEnd.toDate(),
                    color: categories[cat].color,
                    category: cat,
                    dungeon: dungeon,
                    description: desc,
                    createdBy: playerId,
                    repeat: eventRepeat,
                    frequency: selectedRepeatNumber,
                    repeatType: eventRepeat === 'none' ? null : repeatUntil,
                    repeatEnding: selectedRepeatEnd
                }

                postNewEvent(newDeadline, false);
            }
        }
    }

    const postNewEvent = async(newEvent, retry) =>{
        try{
            setLoading(true);
            const resp = await fetch(`${config.development.apiURL}event/createNewEvent`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    event: newEvent
                })
            });

            if(resp.status === 401){
                if(!retry){
                    await tokenRefresh();
                    postNewEvent(newEvent, true);
                    return;
                }
                toast.error('An error has occured. Please try re-logging into your account again. ')
            }

            if(resp.ok){
                const data = await resp.json();
                const formatEvent = {
                    ...data,
                    start: new Date(data.start),
                    end: new Date(data.end)
                }
                setLoading(false);
                setEventList((prevList) => [...prevList, formatEvent]);
                handleClickExit();
            }
        }catch(err){
            setLoading(false);
            toast.error('An error has occured. Please try again later.')
        }
    }

    return(
        <div className="bg-black fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <ToastContainer />
            {loading && <LoadingScreen />}
            {
                deleteEvent &&
                <DeleteConfirmation event={"Delete this event"} onClickDelete={onClickDelete} onClickUndo={onUndoDelete}/>
            }
            
            <div className="relative h-85p w-4/5 flex flex-col bg-bgPink">
                <div className="relative w-full bg-darkPink flex items-center p-2" style={{height: '12%', fontFamily: 'source-code-pro'}}>
                    <div 
                    onClick={handleClickExit}
                    className="absolute right-0 h-full flex items-center w-12  hover:cursor-pointer hover:bg-opacity-30 hover:bg-white">
                        <XIcon size={50} color="" strokeWidth={0.25} radius={1} />
                    </div>
                    <div 
                    onClick={onClickSave}
                    className="absolute right-16 h-full flex items-center hover:cursor-pointer hover:bg-opacity-30 hover:bg-white">
                        <CheckIcon size={50} color="" strokeWidth={0.25} radius={1} />
                    </div>
                    {
                        event && 
                        <div 
                        onClick={() => {setDeleteEvent(true)}}
                        className="absolute right-32 h-full flex items-center hover:cursor-pointer hover:bg-opacity-30 hover:bg-white">
                            <DeleteIcon size={50} color="" strokeWidth={0.25} radius={1} onClick={() => {setDeleteEvent(true)}} />
                        </div>
                    }
                    <p className="text-3xl font-bold">{eventName === '' ? 'New Event' : eventName}</p>
                </div>

                <div className="w-full flex" style={{height: '88%', fontFamily: 'source-code-pro'}}>

                    {/* for event main details such as name, time recurring category etc.  */}
                    <div className="h-full relative w-2/3 pl-4 py-2 border border-darkPink border-r-1">
                        <div className="h-full w-95p flex flex-col justify-evenly gap-2">

                            <div className="w-full flex gap-4">
                                <div className="w-full w-2/3 flex flex-col">
                                    <p className="text-xl ">Event Title</p>
                                    <TextField 
                                        className="w-full"
                                        value={eventName}
                                        onChange={onChangeEventName}
                                        variant="outlined" 
                                        size="small"
                                        placeholder="Event Title"
                                        sx={{
                                            height: '40px',
                                            backgroundColor: '#f5f5f5',
                                            '& .MuiInputBase-input': {
                                                fontFamily: 'source-code-pro',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                            },
                                        }}
                                    />
                                </div>
                                <div className="w-full w-1/3 flex flex-col">
                                    <p className="text-xl">Event Type</p>
                                    <Select 
                                        value={eventType}
                                        onChange={(e) => {setEventType(e.target.value)}}
                                        sx={{fontFamily: 'source-code-pro', backgroundColor: '#f5f5f5', height: '40px'}}>
                                        <MenuItem value="event" style={{fontFamily: 'source-code-pro'}}>Event</MenuItem>
                                        <MenuItem value="deadline" style={{fontFamily: 'source-code-pro'}}>Deadline</MenuItem>
                                    </Select>
                                </div>
                            </div>

                            {
                                eventType === 'event' &&
                                <div className=" w-full flex flex-col gap-2">

                                <p className="text-xl ">Event Start</p>

                                <div className="w-full flex gap-2">
                                        <DatePicker 
                                            defaultValue={defStart}
                                            onChange={(e) => {setDefStart(e)}}
                                            formatDensity="dense"
                                            sx={{
                                                backgroundColor: '#f5f5f5',
                                                fontFamily: 'source-code-pro',
                                                "& .MuiInputBase-input": {
                                                    fontFamily: 'source-code-pro'
                                                }
                                            }}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    InputLabelProps: {
                                                        sx: {
                                                            fontFamily: 'source-code-pro', // Font for the label
                                                        }
                                                    }
                                                },
                                                popper: {
                                                    placement: 'bottom-end',
                                                    sx: {
                                                        paddingTop: '10px',
                                                        scale: '0.85'
                                                    }
                                                }
                                            }}
                                            label="Start Day" />
                                        <MobileTimePicker 
                                        onChange={(e) => {setDefStart(e)}}
                                        label="Start Time"
                                        sx={{
                                            backgroundColor: '#f5f5f5',
                                            fontFamily: 'source-code-pro',
                                            "& .MuiInputBase-input": {
                                                fontFamily: 'source-code-pro'
                                            }
                                        }}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                InputLabelProps: {
                                                    sx: {
                                                        fontFamily: 'source-code-pro', // Font for the label
                                                    }
                                                }
                                            },
                                        }}
                                        defaultValue={dayjs.isDayjs(defStart) ? defStart : dayjs()} />
                                </div>

                                
                                </div> 
                            }
                            
                            <div className="w-full gap-2">
                                <div className="w-full flex">
                                        <p className="text-xl ">{eventType === 'event' ? 'Event End' : 'Deadline'}</p>
                                    </div>

                                    <div className="w-full flex gap-2">
                                        <DatePicker 
                                            onChange={(e) => {setDefEnd(e)}}
                                            formatDensity="dense"
                                            defaultValue={defEnd}
                                            sx={{
                                                backgroundColor: '#f5f5f5',
                                                fontFamily: 'source-code-pro',
                                                "& .MuiInputBase-input": {
                                                    fontFamily: 'source-code-pro'
                                                }
                                            }}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    InputLabelProps: {
                                                        sx: {
                                                            fontFamily: 'source-code-pro', // Font for the label
                                                        }
                                                    }
                                                },
                                                popper: {
                                                    placement: 'bottom-end',
                                                    sx: {
                                                        paddingTop: '10px',
                                                        scale: '0.85'
                                                    }
                                                }
                                            }}
                                            label="End Day" />
                                            <MobileTimePicker 
                                            onChange={(e) => {setDefEnd(e)}}
                                            label="End Time"
                                            sx={{
                                                backgroundColor: '#f5f5f5',
                                                fontFamily: 'source-code-pro',
                                                "& .MuiInputBase-input": {
                                                    fontFamily: 'source-code-pro'
                                                }
                                            }}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    InputLabelProps: {
                                                        sx: {
                                                            fontFamily: 'source-code-pro', // Font for the label
                                                        }
                                                    }
                                                },
                                            }}
                                            defaultValue={defEnd} />
                                    </div>
                            </div>
                            

                            <div className="w-full flex gap-2">
                                <div className="h-fit w-1/2 flex flex-col">
                                    <p className="text-xl ">Repeat: </p>
                                    <div className="w-full flex">
                                        <Select  
                                        sx={{fontFamily: 'source-code-pro', 
                                            backgroundColor: '#f5f5f5', height: '40px'}}
                                        className="w-full" value={eventRepeat} onChange={(e) => {setEventRepeat(e.target.value)}}>
                                            <MenuItem
                                                sx={{fontFamily: 'source-code-pro'}}
                                                value='none'
                                            >None</MenuItem>
                                            <MenuItem
                                            sx={{fontFamily: 'source-code-pro'}}
                                                value="day"
                                            >Every 
                                                <input type="number" 
                                                min={1}
                                                value={dayRepeat}
                                                onClick={(e) => {e.stopPropagation()}}
                                                onChange={(e) => {setDayRepeat(e.target.value)}}
                                                className="mx-2 text-center w-12"
                                                style={{fontFamily: 'source-code-pro'}}
                                                />
                                            day
                                            </MenuItem>
                                            <MenuItem
                                            sx={{fontFamily: 'source-code-pro'}}
                                                value="week"
                                            >Every
                                                <input type="number" 
                                                    min={1}
                                                    value={weekRepeat}
                                                    onClick={(e) => {e.stopPropagation()}}
                                                    onChange={(e) => {setWeekRepeat(e.target.value)}}
                                                    className="mx-2 text-center w-12"
                                                    style={{fontFamily: 'source-code-pro'}}
                                                />
                                            week</MenuItem>
                                            <MenuItem
                                            sx={{fontFamily: 'source-code-pro'}}
                                                value="month"
                                            >Every 
                                                <input type="number" 
                                                value={monthRepeat}
                                                min={1}
                                                onClick={(e) => {e.stopPropagation()}}
                                                onChange={(e) => {setMonthRepeat(e.target.value)}}
                                                className="mx-2 text-center w-12"
                                                style={{fontFamily: 'source-code-pro'}}
                                                />
                                            month</MenuItem>
                                            <MenuItem
                                            sx={{fontFamily: 'source-code-pro'}}
                                                value="year"
                                            >Every 
                                                <input type="number" 
                                                min={1}
                                                value={yearRepeat}
                                                onClick={(e) => {e.stopPropagation()}}
                                                onChange={(e) => {setYearRepeat(e.target.value)}}
                                                className="mx-2 text-center w-12"
                                                style={{fontFamily: 'source-code-pro'}}
                                                />
                                            year</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                {
                                    eventRepeat !== 'none' &&
                                    <div className="h-fit w-1/2 flex flex-col">
                                        <p className="text-xl">Repeat until</p>
                                        <Select
                                            id="repeat-until-selection"
                                            onClick={handleClickStuff}
                                            onChange={(e) => {setRepeatUntil(e.target.value)}}
                                            value={repeatUntil}
                                            sx={{fontFamily: 'source-code-pro', 
                                                backgroundColor: '#f5f5f5',
                                                height: '40px'
                                            }}
                                        >
                                            <MenuItem 
                                                sx={{fontFamily: 'source-code-pro'}}
                                            value="forever">Forever</MenuItem>
                                            <MenuItem 
                                            sx={{fontFamily: 'source-code-pro'}}
                                            value="times">Repeat 
                                                <input type="number"
                                                    min={1}
                                                    value={repeatTimes}
                                                    onClick={(e) => {e.stopPropagation()}}
                                                    onChange={(e) => {setRepeatTimes(e.target.value)}}
                                                    className="mx-2 text-center w-12"
                                                    style={{fontFamily: 'source-code-pro'}}
                                                /> times
                                            </MenuItem>
                                            <MenuItem 
                                                id="date-menu-item"
                                                sx={{ fontFamily: 'source-code-pro' }}
                                                value="date" 
                                                className="h-full w-full"
                                            >
                                                <input type="date"
                                                value={repeatEndDate.format('YYYY-MM-DD')}
                                                onChange={(e) => {setRepeatEndDate(dayjs(e.target.value))}}
                                                onClick={(e) => {e.stopPropagation()}}
                                                onMouseDown={(e) => {e.stopPropagation()}}
                                                className="border-none outline-none h-full w-full" 
                                                style={{fontFamily: 'source-code-pro', 
                                                    backgroundColor: '#f5f5f5',}}
                                                />
                                            </MenuItem>


                                        </Select>
                                    </div>
                                }
                            </div>

                            <div className="w-full flex gap-2">
                                <div className="w-1/2 flex flex-col">
                                    <p className="text-xl">Category</p>
                                    <Select
                                        onChange={onChangeEventCat}
                                        value={cat}
                                        sx={{
                                            height: '40px',
                                            backgroundColor: '#f5f5f5',
                                            width: '100%',
                                            fontFamily: 'source-code-pro'
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
                                </div>
                                {
                                    cat === "cat1" &&
                                    <div className="w-1/2 flex flex-col">
                                        <p className="text-xl">Dungeon</p>
                                        <div className="w-full">
                                            <DungeonSelector onDungeonChange={onDungeonChange} font={'source-code-pro'}/>
                                        </div>
                                    </div>
                                    
                                }
                            </div>

                        </div>
                    </div>

                    {/* for event things such as task list, additional notes */}
                    <div className="w-1/3 px-4 py-2 flex flex-col overflow-y-auto gap-4" style={{height: '88%'}}>

                        <div className="w-full h-1/3">
                            <p className="text-xl">Event Description</p>
                            <textarea 
                                placeholder="Event Description"
                                value={eventDescription}
                                onChange={onChangeEventDescription}
                                className="w-full h-80p p-2 resize-none" style={{backgroundColor: '#f5f5f5', fontFamily: 'source-code-pro'}}
                            />
                        </div>

                        <div className="w-full h-2/3 flex flex-col">
                            <p className="text-xl">To-Dos</p>
                            <div className="w-full h-fit gap-0 flex-col">
                            {
                                Object.entries(eventToDos).map((toDo, index) => {
                                    return (<EventTasks task={toDo} key={toDo[0]} onChangeCompletion={onChangeCompletion} onChangeName={onChangeName} onDelete={onDeleteTask} />)
                                })
                            }
                            </div>
                            <p 
                            onClick={onAddTasks}
                            className="text-center hover:cursor-pointer text-slate-500">Add ToDo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCreator;