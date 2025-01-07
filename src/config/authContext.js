import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import config from '../config/config.json';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState(null);
    const storedPlayer = localStorage.getItem('player');


    useEffect(() => {
        console.log('my player: ', player);
    }, [player])

    useEffect(() => {

        if(player !== auth.currentUser){
            localStorage.setItem('player', JSON.stringify(player));
        }else if(player === auth.currentUser){
            setPlayer(JSON.parse(localStorage.getItem('player')));
        }
    }, [player])

    useEffect(() => {
        const unsubscribe  = onAuthStateChanged(auth, (currUser) => {
            if(currUser){
                setPlayer(currUser);
            }else{
                setPlayer(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth])

    const signIn = (playerData) => {
        setPlayer(playerData);
    }

    const logOut = async () => {
        await signOut(auth);
        setPlayer(null);  
        localStorage.removeItem('player');  
    }

    return(
        <AuthContext.Provider
            value = {{ player, signIn, logOut, setPlayer}}>
            { !loading && children }
        </AuthContext.Provider>
    )
}