import React, {createContext, useState, useEffect, useMemo} from "react";
import { auth } from "../../../config/firebase";
import config from "../../../config/config";


export const EventContext = createContext();

export const EventProvider = ({children}) => {
    const [eventList, setEventList] = useState([]);
    const eventMap = useMemo(() => {
        const map = new Map();
        eventList.forEach((event, index) => {
            map.set(event.eventId, index);
        })
        return map;
    }, [eventList])

    useEffect(() => {
        const fetchEventList = async() => {
            if(!auth.currentUser) return;

            const token = await auth.currentUser.getIdToken();
            const controller = new AbortController();

            try{
                const resp = await fetch(`${config.development.apiURL}event/getAllEvents/${auth.currentUser.uid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    signal: controller.signal
                });
                const data = await resp.json();
                const formattedEventList = data.map((event) => {
                    event.start = new Date(event.start);
                    event.end = new Date(event.end);
                    return event;
                })
                setEventList(formattedEventList);
                localStorage.setItem('eventList', JSON.stringify(formattedEventList));
            }catch(err){
                console.log('an error has occured: ', err);
            }

            return () => controller.abort();
        }

        fetchEventList();
    }, [])

    useEffect(() => {
        if(auth.currentUser){
            if(eventList.length === 0){
                setEventList(JSON.parse(localStorage.getItem('eventList')));
            }else if(eventList.length > 0){
                localStorage.setItem('eventList', JSON.stringify(eventList));
            }
        }
    }, [eventList])

    return(
        <EventContext.Provider
        value={{eventList, setEventList, eventMap}}>
            {children}
        </EventContext.Provider>
    )
}