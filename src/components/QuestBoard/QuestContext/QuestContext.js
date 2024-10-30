import React, { createContext, useState } from "react";

export const QuestContext = createContext();

export const QuestProvider = ({children}) => {
    const [questList, setQuestList] = useState([]);

    console.log('from context', questList);

    return (
        <QuestContext.Provider 
            value={{questList, setQuestList}}>
                {children}
            </QuestContext.Provider>
    )
}