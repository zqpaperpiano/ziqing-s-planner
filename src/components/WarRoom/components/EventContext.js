import React, {createContext, useState} from "react";

export const EventContext = createContext();

export const EventProvider = ({children}) => {
    const [eventList, setEventList] = useState([]);

    return(
        <EventContext.Provider
        value={{eventList, setEventList}}>
            {children}
        </EventContext.Provider>
    )
}