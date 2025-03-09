import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./authContext";
import config from '../config/config.json';
import { auth } from "../config/firebase";

export const UserStatContext = createContext();

export const UserStatProvider = ({ children }) => {
    const [userStats, setUserStats] = useState({}); 
    const { tokenRefresh } = useContext(AuthContext);

    useEffect(() => {
        const controller = new AbortController();
        const initUserStats = async(retry) => {
            if(auth.currentUser){
                const cachedUserStats = JSON.parse(localStorage.getItem('userStats'));

                if(cachedUserStats && Object.keys(cachedUserStats).length > 0){
                    setUserStats(cachedUserStats);
                }else{
                    try{
                        const resp = await fetch(`${config.development.apiURL}userStats/init`, {
                            method: 'GET',
                            credentials: 'include', 
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        });

                        if(resp.status === 401){
                            if(!retry){
                                await tokenRefresh();
                                initUserStats(true);
                                return;
                            }else{
                                throw new Error('Unauthorized');
                            }
                        }

                        if(resp.ok){
                            const data = await resp.json();
                            // console.log('data received: ', data);
                            setUserStats(data);
                            localStorage.setItem('userStats', JSON.stringify(data));
                        }
                    }catch(err){
                        console.log('an error has occured in fetching user stats: ', err);
                    }
                }
            }

        }

        initUserStats(false);

        return () => controller.abort();
    }, [auth.currentUser]);

    useEffect(() => {
        if(auth.currentUser && userStats){
            localStorage.setItem('userStats', JSON.stringify(userStats));
        }
    })


    return(
        <UserStatContext.Provider 
            value={{userStats, setUserStats}}>
            {children}
        </UserStatContext.Provider>
    )
}