import React, { createContext, useEffect, useState } from "react";
import config from '../../../config/config';
import { auth } from '../../../config/firebase';

export const DungeonContext = createContext();

export const DungeonProvider = ({children}) => {
    const [dungeonList, setDungeonList] = useState({});

    useEffect(() => {
        fetch(`${config.development.apiURL}dungeon/get-all-dungeons/${auth.currentUser.uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.currentUser.getIdToken()}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log('in dungeoncontext, data received: ', data);
            setDungeonList(data);
            localStorage.setItem('dungeonList', JSON.stringify(data));
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        if(dungeonList.length === 0 && auth.currentUser){
            setDungeonList(JSON.parse(localStorage.getItem('dungeonList')));
         }else if(dungeonList.length > 0 && auth.currentUser){
            localStorage.setItem('dungeonList', JSON.stringify(dungeonList));
         }
    }, [dungeonList])


    return (
        <DungeonContext.Provider 
            value={{dungeonList, setDungeonList}}>
                {children}
            </DungeonContext.Provider>
    )
}