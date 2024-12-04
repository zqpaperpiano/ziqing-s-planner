import React, {createContext, useState} from "react";

export const EventContext = createContext();

export const EventProvider = ({children}) => {
    const [eventList, setEventList] = useState([]);
    const [categories, setCategories] = useState({
        dungeons: {
            name: 'Clearing dungeons',
            color: '#ca4a55',
        },
        errands: {
            name: 'Running errands',
            color: '#ee694b',
        },
        misc: {
            name: 'Misc',
            color: '#fdb814'
        },
        meetings: {
            name: 'Meetings',
            color: '#30ad6e'
        },
        social: {
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