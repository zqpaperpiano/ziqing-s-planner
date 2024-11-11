import React, { createContext, useState } from "react";

export const DungeonContext = createContext();

export const DungeonProvider = ({children}) => {
    const [dungeonList, setDungeonList] = useState([]);

    return (
        <DungeonContext.Provider 
            value={{dungeonList, setDungeonList}}>
                {children}
            </DungeonContext.Provider>
    )
}