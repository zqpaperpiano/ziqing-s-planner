import React, { useCallback, useContext, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import EventCreator from "./components/EventCreator";
import dayjs from "dayjs";
import { DungeonContext } from "../QuestBoard/DungeonContext/DungeonContext";
import { EventContext } from "./components/EventContext";



const WarRoom = () => {
    const [creatingEvent, setCreatingEvent] = useState(false);
    const localizer = momentLocalizer(moment);
    const [time, setTime] = useState(null);
    const {eventList} = useContext(EventContext);

    // useEffect(() => {
    //     console.log(eventList);
    // }, [eventList])

    const handleClick = useCallback((slotInfo) => {
        setTime([
            dayjs(slotInfo.start),
            dayjs(slotInfo.end)
        ])
        setCreatingEvent(true);
    }, []);

    const toggleCreatingEvent = () => {
        setCreatingEvent(false);
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

                />
            </div>

            {   
                creatingEvent &&
                <EventCreator toggleCreatingEvent={toggleCreatingEvent} time={time}/>
            }
            
        </div>
    );
}

export default WarRoom;