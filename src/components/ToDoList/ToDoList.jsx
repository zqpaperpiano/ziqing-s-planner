import React, { useState, useEffect } from "react";
import ListItems from "./ListItems";
import { Button } from "@mui/material";

const ToDoList = () => {
    const [listItems, setListItems] = useState([
        {"item1": {
            name: "",
            completed: false
        }},
    ]);

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            addChecklist();
        }
    }

    useEffect(() => {
        console.log(listItems);
    }, [listItems]);

    const onChangeChecklistName = (name, key) => {
        let temp = listItems;
        let newTemp = temp.map((prev) => {
            if(prev[key]){
                return {[key]: {...prev[key], name: name}}
            }
            return prev;
        })

        setListItems(newTemp);
    }
    
    const addChecklist = () => {
        let lastNum = 1;
        if(listItems.length > 0){
            let lastObj = listItems[listItems.length - 1];
            let lastKey = Object.keys(lastObj)[0];
            lastNum = parseInt(lastKey.slice(4, lastKey.length)) + 1;
        }
        
        let newItem = {[`item${lastNum}`] : {name: "", completed: false}}
        setListItems((prevList) => [...prevList, newItem])
    }

    const deleteChecklist = (ind) => {
        let filtered = listItems.filter((itm) => {
            let key = Object.keys(itm)[0];
            console.log(itm);
            if(key !== ind){
                return itm;
            }
        })
        // console.log(filtered);
        setListItems(filtered);
        }
        

    return(
        <div className="h-full w-full flex flex-col items-center justify-center text-white overflow-auto">
            <p>To-Do List</p>
            {
                listItems.map((item) => {
                    // console.log(item);
                    return(
                        <ListItems item={item} onRenameChecklist={onChangeChecklistName} onKeyPress={handleKeyPress} onDeleteChecklist={deleteChecklist}/>
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