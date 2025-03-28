import React, { createContext, useEffect, useState, useContext } from "react";
import config from '../config/config.json';
import { auth } from '../config/firebase';
import { AuthContext } from "./authContext";

export const DungeonContext = createContext();

export const DungeonProvider = ({children}) => {
    const [dungeonList, setDungeonList] = useState({});
    const {tokenRefresh} = useContext(AuthContext);
    const { player } = useContext(AuthContext);
     const colors =[{'#d6cdd0': '#b8a9b1'}, {'#FF6F61 ': '#E54B47'}, {'#B4A6D9 ': '#8A7BB6'}, {'#FFB79B ': '#F09A81'}, {'#A8E6CF ': '#7FBFA5'}, {'#8ED1D3' : '#6DA9A7'}]

    useEffect(() => {
        const controller = new AbortController();
        const fetchDungeonList = async(retry) => {
            // console.log('fetching dungeons....');

            if(auth.currentUser){
                const cachedDungeonList = JSON.parse(localStorage.getItem('dungeonList'));
                // console.log('taking from cache');
    
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

                        if(resp.status === 401){
                            if(!retry){
                                await tokenRefresh();
                                fetchDungeonList(true);
                                return;
                            }else{
                                throw new Error('Unauthorized');
                            }
                        }

                        if(resp.ok){
                            const data = await resp.json();
                            // console.log('dungeonList received: ', data);
                            setDungeonList(data);
                            localStorage.setItem('dungeonList', JSON.stringify(data));
                        }
                    }catch(err){
                        console.log('an error has occured: ', err);
                    }
                }
            }
        }
        
        fetchDungeonList(false);

        return () => controller.abort();
    }, [player])

    useEffect(() => {
        if (auth.currentUser && Object.keys(dungeonList).length > 0) {
            localStorage.setItem('dungeonList', JSON.stringify(dungeonList));
        }
    }, [dungeonList]);


    return (
        <DungeonContext.Provider 
            value={{dungeonList, setDungeonList, colors}}>
                {children}
            </DungeonContext.Provider>
    )
}