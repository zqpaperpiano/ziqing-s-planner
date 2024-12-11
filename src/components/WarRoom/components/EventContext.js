import React, {createContext, useState} from "react";

export const EventContext = createContext();

export const EventProvider = ({children}) => {
    const [eventList, setEventList] = useState([]);
    const [categories, setCategories] = useState({
        cat1: {
            name: 'Clearing dungeons',
            color: '#ca4a55',
        },
        cat2: {
            name: 'Running errands',
            color: '#ee694b',
        },
        cat3: {
            name: 'Misc',
            color: '#fdb814'
        },
        cat4: {
            name: 'Meetings',
            color: '#30ad6e'
        },
        cat5: {
            name: 'Social activities',
            color: '#1d58a0'
        }
    })

    return(
        <EventContext.Provider
            value={{eventList, setEventList, categories, setCategories}}>
                {children}
            </EventContext.Provider>
    )
}