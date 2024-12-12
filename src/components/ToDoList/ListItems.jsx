import { Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";

const ListItems = ({item, onKeyPress}) => {
    const [name, setName] = useState(Object.values(item)[0].name)
    const [completed, setCompleted] = useState(Object.values(item)[0].completed);

    return(
        <div className="w-full h-fit flex text-white justify-center items-center">
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
            onKeyDown={onKeyPress}
            color="white"
            onChange={(e) => {setName(e.target.value)}}
            sx={{
                width: '75%',
                color: 'white',
                '& .MuiInputBase-input': {
                    color: 'white',
                    fontFamily: 'silkscreen'
                },
                textDecoration: completed ? 'line-through' : 'none',

            }}
            variant="outlined" value={name}/>
            <p className="font-silkscreen">-</p>
        </div>
    );
}

export default ListItems;