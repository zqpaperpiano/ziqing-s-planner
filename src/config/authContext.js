import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState(null);
    const [token, setToken] = useState(null);


    useEffect(() => {
        const unsubscribe  = onAuthStateChanged(auth, (currUser) => {
            console.log('my current usser: ', currUser);
            setPlayer(currUser);
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
    }

    return(
        <AuthContext.Provider
            value = {{ loading, player, signIn, logOut}}>
            { !loading && children }
            </AuthContext.Provider>
    )
}