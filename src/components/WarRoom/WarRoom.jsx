import React, { useCallback, useContext, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import EventCreator from "./components/EventCreator";
import dayjs, { isDayjs } from "dayjs";
import { EventContext } from "../../contexts/EventContext";
import { useNavigate } from "react-router-dom";



const WarRoom = () => {
    const [creatingEvent, setCreatingEvent] = useState(false);
    const localizer = momentLocalizer(moment);
    const [time, setTime] = useState(null);
    const {eventList} = useContext(EventContext);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('warRoom event list; ', eventList);
    }, [eventList])

    const handleClick = useCallback((slotInfo) => {
        navigate(`/warRoom/new-event`, {state: {start: slotInfo.start, end: slotInfo.end}})
        // setTime([
        //     dayjs(slotInfo.start),
        //     dayjs(slotInfo.end)
        // ])
        // setCreatingEvent(true);
    }, []);

    const handleClickEvent = (event) => {
        navigate(`/warRoom/event-details/${event.eventId}`)
    }

    const toggleCreatingEvent = () => {
        setCreatingEvent(false);
    }

    const toggleSelectEvent = () => {
        setSelectedEvent(null);
    }

    return(
        <div className="h-full w-full flex justify-center items-center">
            
            <div className={`h-90p w-95p ${creatingEvent ? "z-0" : "z-50"}`}>
                <Calendar
                    events={eventList}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    eventPropGetter={(eventList) => {
                        const backgroundColor = eventList.color;
                        return {style: { backgroundColor}}
                    }}
                    onSelectSlot={handleClick}
                    onSelectEvent={handleClickEvent}

                />
            </div>

            {   
                creatingEvent &&
                <EventCreator toggleCreatingEvent={toggleCreatingEvent} time={time} hasEvent={false}/>
            }
            {
                selectedEvent &&
                <EventCreator event={selectedEvent} time={time} toggleCreatingEvent={toggleSelectEvent} hasEvent={true}/>
            }


            
        </div>
    );
}

export default WarRoom;