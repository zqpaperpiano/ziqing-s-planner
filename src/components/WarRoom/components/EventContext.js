import React, {createContext, useState, useEffect, useMemo, useContext} from "react";
import { auth } from "../../../config/firebase";
import config from "../../../config/config";
import { AuthContext } from "../../../config/authContext";


export const EventContext = createContext();

export const EventProvider = ({children}) => {
    const [eventList, setEventList] = useState([]);
    const {tokenRefresh, player} = useContext(AuthContext);
    const eventMap = useMemo(() => {
        const map = new Map();
        if(!eventList) return map;

        eventList.forEach((event, index) => {
            map.set(event.eventId, index);
        })
        return map;
    }, [eventList])
    

    useEffect(() => {
        const controller = new AbortController();
        const fetchEventList = async(retry) => {
            if(!auth.currentUser) return;

            const cachedEventList = JSON.parse(localStorage.getItem('eventList'));
            if(cachedEventList && cachedEventList.length > 0){

                const formattedEventList = cachedEventList.map((event) => {
                    event.start = new Date(event.start);
                    event.end = new Date(event.end);
                    return event;
                })

                setEventList(formattedEventList);  
            }else{               
                try{
                    const resp = await fetch(`${config.development.apiURL}event/getAllEvents/${auth.currentUser.uid}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': `Bearer ${token}`
                        },
                        signal: controller.signal
                    });

                    if(resp.status === 401 && !retry){
                        await tokenRefresh();
                        fetchEventList(true);
                        return;
                    }else if(resp.status === 401){
                        throw new Error('Unauthorized');
                    }

                    if(resp.ok){
                        const data = await resp.json();
                        if(data && Object.entries(data).length > 0){
                            const formattedEventList = data.map((event) => {
                                event.start = new Date(event.start);
                                event.end = new Date(event.end);
                                return event;
                            })
                            
                            setEventList(formattedEventList);
                            localStorage.setItem('eventList', JSON.stringify(formattedEventList));
                        }else{
                            setEventList([]);
                        }
                    }
                    
                    
                }catch(err){
                    console.log('an error has occured for events: ', err);
                }
            }
        }

        if(auth.currentUser) fetchEventList(false);

        return () => controller.abort();
    }, [player])

    useEffect(() => {
        if(auth.currentUser && eventList.length > 0){
            localStorage.setItem('eventList', JSON.stringify(eventList));
        }
    }, [eventList])

    // useEffect(() => {
    //     if(auth.currentUser){
    //         if(eventList.length === 0){
    //             setEventList(JSON.parse(localStorage.getItem('eventList')));
    //         }else{
    //             localStorage.setItem('eventList', JSON.stringify(eventList));
    //         }
    //     }
    // }, [eventList])

    return(
        <EventContext.Provider
        value={{eventList, setEventList, eventMap}}>
            {children}
        </EventContext.Provider>
    )
}