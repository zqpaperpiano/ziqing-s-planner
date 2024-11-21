import React, { useCallback, useContext, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import EventCreator from "./components/EventCreator";
import { DungeonContext } from "../QuestBoard/DungeonContext/DungeonContext";



const WarRoom = () => {
    const [creatingEvent, setCreatingEvent] = useState(false);
    const localizer = momentLocalizer(moment);

    const handleClick = useCallback((slotInfo) => {
        setCreatingEvent(true);
    }, []);

    const toggleCreatingEvent = () => {
        setCreatingEvent(false);
    }

    return(
        <div className="h-full w-full flex justify-center items-center">
            
            <div className="h-90p w-95p">
                <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleClick}

                />
            </div>

            {   
                creatingEvent &&
                <EventCreator toggleCreatingEvent={toggleCreatingEvent}/>
            }
            
        </div>
    );
}

export default WarRoom;