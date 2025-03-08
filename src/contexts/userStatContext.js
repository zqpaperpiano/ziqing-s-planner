import React, { useState, createContext } from "react";

export const UserStatContext = createContext();

export const UserStatProvider = ({ children }) => {
    const [userStats, setUserStats] = useState({}); 


    return(
        <UserStatContext.Provider 
            value={{userStats, setUserStats}}>
            {children}
        </UserStatContext.Provider>
    )
}