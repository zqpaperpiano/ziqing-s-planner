import React, {createContext, useState, useEffect, useMemo} from "react";
import { auth } from "../../../config/firebase";
import config from "../../../config/config";
import { Key } from "lucide-react";

export const EventContext = createContext();

export const EventProvider = ({children}) => {
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        const fetchEventList = async() => {
            if(auth.currentUser){
                auth.currentUser.getIdToken(true).then(token => {
                    fetch(`${config.development.apiURL}event/getAllEvents/${auth.currentUser.uid}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        const formattedEventList = data.map(event => {
                            event.start = new Date(event.start);
                            event.end = new Date(event.end);
                            return event;
                        })
                        setEventList(formattedEventList);
                        localStorage.setItem('eventList', JSON.stringify(formattedEventList));
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
            }
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
        value={{eventList, setEventList}}>
            {children}
        </EventContext.Provider>
    )
}