import React, { createContext, useEffect, useState } from "react";
import config from '../../../config/config';
import { auth } from '../../../config/firebase';

export const DungeonContext = createContext();

export const DungeonProvider = ({children}) => {
    const [dungeonList, setDungeonList] = useState({});

    useEffect(() => {
        if(auth.currentUser){
            auth.currentUser.getIdToken(true).then(token => {
                // console.log('my token: ', token);
                fetch(`${config.development.apiURL}dungeon/get-all-dungeons/${auth.currentUser.uid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(resp => resp.json())
                .then(data => {
                    // console.log('in dungeon context, data received: ', data);
                    setDungeonList(data);
                    localStorage.setItem('dungeonList', JSON.stringify(data));
                })
                .catch(err => {
                    console.log(err);
                })
            })
        }
        
    }, [])
    
    useEffect(() => {
        if(auth.currentUser){
            if(Object.keys(dungeonList).length === 0){
                setDungeonList(JSON.parse(localStorage.getItem('dungeonList')));
            }else if(Object.keys(dungeonList).length > 0){
                localStorage.setItem('dungeonList', JSON.stringify(dungeonList));
            }
        }
    }, [dungeonList])


    return (
        <DungeonContext.Provider 
            value={{dungeonList, setDungeonList}}>
                {children}
            </DungeonContext.Provider>
    )
}