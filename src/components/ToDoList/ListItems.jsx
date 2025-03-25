import { Checkbox, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const ListItems = ({item, onKeyPress, onDeleteChecklist, onRenameChecklist, color, font}) => {
    const [completed, setCompleted] = useState(Object.values(item)[0].completed);
    const newColor = color || 'white';
    const newFont = font || 'silkscreen';


    const onChangeName = (e) => {
        onRenameChecklist(e.target.value, Object.keys(item)[0]);
    }



    return(
        <div className="relative w-full h-fit flex justify-center items-center">
            <Checkbox 
                onChange={(e) => {setCompleted(e.target.checked)}}
                sx={{
                    color: newColor,
                    '&.Mui-checked': {
                        color: newColor
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
                color: newColor,
                '& .MuiInputBase-input': {
                    color: newColor,
                    fontFamily: newFont
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