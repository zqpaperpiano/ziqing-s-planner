import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import config from '../config/config.json';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        if(player !== auth.currentUser && player !== null){
            // console.log('setting player');
            localStorage.setItem('player', JSON.stringify(player));
        }else if(player === auth.currentUser || (auth.currentUser && !player)){
            setPlayer(JSON.parse(localStorage.getItem('player')));
        }
    }, [player])

    useEffect(() => {
        const unsubscribe  = onAuthStateChanged(auth, (currUser) => {
            if(currUser){
                // console.log('reinstated user');
                setPlayer(currUser);
            }else{
                // console.log('removing user');
                setPlayer(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])

    const signIn = (playerData) => {
        setPlayer(playerData);
    }

    const logOut = async () => {
        await signOut(auth);
        setPlayer(null);  
        localStorage.removeItem('dungeonList');
        localStorage.removeItem('player');  
        localStorage.removeItem('eventList');
    }

    const tokenRefresh = async() => {
        const token = await auth.currentUser.getIdToken(true);
        try{
            const resp = await fetch(`${config.development.apiURL}users/setAuthCookie`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                token: token
            })
            })
        }catch(err){
            console.log('an error has occured with refreshing token: ', err);
        }
    }


    return(
        <AuthContext.Provider
            value = {{ player, signIn, logOut, setPlayer, tokenRefresh}}>
            { !loading && children }
        </AuthContext.Provider>
    )
}