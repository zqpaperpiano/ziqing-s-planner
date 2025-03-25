import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { DeleteIcon } from "raster-react";

const EventTasks = ({task, onChangeName, onChangeCompletion, onDelete}) => {
    const [completed, setCompleted] = useState(task[1].completed);
    const [title, setTitle] = useState(task[1].title);


    return(
        <div className="h-fit w-full flex items-center justify-between gap-2">
            <Checkbox 
                onChange={(e) => {onChangeCompletion(task[0], e.target.checked)}}
            />
            <input 
            onChange={(e) => {onChangeName(task[0], e.target.value)}}
            type="text" className="w-3/4" style={{height: '35px', backgroundColor: '#f5f5f5'}} />
            <DeleteIcon
            onClick={() => {onDelete(task[0])}}
            className="hover:cursor-pointer" size={50} color="" strokeWidth={0.25}
             radius={1} />
             
        </div>
    )
}

export default EventTasks;