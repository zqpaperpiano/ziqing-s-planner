import React, { createContext, useEffect, useState } from "react";
import config from '../../../config/config';
import { auth } from '../../../config/firebase';

export const DungeonContext = createContext();

export const DungeonProvider = ({children}) => {
    const [dungeonList, setDungeonList] = useState({});

    useEffect(() => {
        const controller = new AbortController();
        const fetchDungeonList = async() => {
            // console.log('fetching dungeons....');

            if(auth.currentUser){
                const cachedDungeonList = JSON.parse(localStorage.getItem('dungeonList'));
    
                if(cachedDungeonList && Object.keys(cachedDungeonList).length > 0){
                    setDungeonList(cachedDungeonList);
                }else{
                    try{
                        const resp = await fetch(`${config.development.apiURL}dungeon/get-all-dungeons/${auth.currentUser.uid}`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            signal: controller.signal
                        });
                        const data = await resp.json();
                        setDungeonList(data);
                        localStorage.setItem('dungeonList', JSON.stringify(data));
                    }catch(err){
                        console.log('an error has occured: ', err);
                    }
                }
            }
        }
        
        if(auth.currentUser) fetchDungeonList();

        return () => controller.abort();
    }, [])

    useEffect(() => {
        if (auth.currentUser && Object.keys(dungeonList).length > 0) {
            localStorage.setItem('dungeonList', JSON.stringify(dungeonList));
        }
    }, [dungeonList]);


    return (
        <DungeonContext.Provider 
            value={{dungeonList, setDungeonList}}>
                {children}
            </DungeonContext.Provider>
    )
}