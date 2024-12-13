import { Checkbox, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const ListItems = ({item, onKeyPress, onDeleteChecklist, onRenameChecklist}) => {
    const [completed, setCompleted] = useState(Object.values(item)[0].completed);

    const onChangeName = (e) => {
        onRenameChecklist(e.target.value, Object.keys(item)[0]);
    }

    return(
        <div className="relative w-full h-fit flex text-white justify-center items-center">
            <Checkbox 
                onChange={(e) => {setCompleted(e.target.checked)}}
                sx={{
                    color: 'white',
                    '&.Mui-checked': {
                        color: 'white'
                    }
                }}
            />
            <TextField
            className="relative" 
            onKeyDown={onKeyPress}
            color="white"
            onChange={onChangeName}
            sx={{
                width: '100%',
                color: 'white',
                '& .MuiInputBase-input': {
                    color: 'white',
                    fontFamily: 'silkscreen'
                },
                textDecoration: completed ? 'line-through' : 'none',

            }}
            variant="outlined" 
            value={Object.values(item)[0].name}
            />
            <div 
            onClick={() => {onDeleteChecklist(Object.keys(item)[0])}}
            className="absolute right-5 h-8 w-8 flex items-center justify-center rounded-full hover:cursor-pointer hover:bg-opacity-30 hover:bg-white">
                -
            </div>
        </div>
    );
}

export default ListItems;