import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const unsubscribe  = onAuthStateChanged(auth, (currUser) => {
            setPlayer(currUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])

    const signIn = (playerData) => {
        setPlayer(playerData);
    }

    const signOut = () => {
        setPlayer(null);    
    }

    return(
        <AuthContext.Provider
            value = {{ loading, player, signIn, signOut}}>
            { !loading && children }
            </AuthContext.Provider>
    )
}