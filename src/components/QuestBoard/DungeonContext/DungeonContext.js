import React, { createContext, useEffect, useState } from "react";
import config from '../../../config/config';
import { auth } from '../../../config/firebase';

export const DungeonContext = createContext();

export const DungeonProvider = ({children}) => {
    const [dungeonList, setDungeonList] = useState({});

    useEffect(() => {
        const controller = new AbortController();
        const fetchDungeonList = async() => {
            if(auth.currentUser){
                const cachedDungeonList = JSON.parse(localStorage.getItem('dungeonList'));
    
                if(cachedDungeonList && Object.keys(cachedDungeonList).length > 0){
                    setDungeonList(cachedDungeonList);
                }else{
                    const token = await auth.currentUser.getIdToken();
                    

                    try{
                        const resp = await fetch(`${config.development.apiURL}dungeon/get-all-dungeons/${auth.currentUser.uid}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
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
        
        fetchDungeonList();

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