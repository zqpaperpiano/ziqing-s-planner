import React, { useState, useEffect } from "react";
import ListItems from "./ListItems";
import { Button } from "@mui/material";

const ToDoList = () => {
    const [listItems, setListItems] = useState([
        {"item1": {
            name: "",
            completed: false
        }},
        {"item2": {
            name: "",
            completed: false
        }}
    ]);

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            addChecklist();
        }
    }

    const addChecklist = () => {
        let lastItem = Object.keys(listItems[listItems.length - 1])[0]
        let lastNum = parseInt(lastItem.slice(4, lastItem.length)) + 1;
        setListItems([...listItems, {[`item${lastNum}`]: {
            name: "", completed: false
        }}])
    }

    return(
        <div className="h-full w-full flex flex-col items-center justify-center text-white overflow-scroll">
            {
                listItems.map((item) => {
                    return(
                        <ListItems item={item} onKeyPress={handleKeyPress}/>
                    )
                })
            }
            <Button
                onClick={addChecklist}
                sx={{
                    fontFamily: 'silkscreen',
                    color: 'white',
                    backgroundColor: 'transparent',
                    '&:hover':{
                        backgroundColor: 'transparent'
                    }
                }}
            >Add Item</Button>
        </div>
    )   
}

export default ToDoList;