import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Popover } from "@mui/material";
import ColorSelector from "./ColorSelector";

const CategoryBar = ({cat, onChangeName, onChangeColor, onDeleteCat}) => {
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const handleClick = (e) => {
        setAnchor(e.currentTarget)
    }

    const handleClose = () => {
        setAnchor(null);
    }

    const handleColorChange = (color) => {
        onChangeColor(color, cat[0]);
    }

    return(
        <div 
        id={cat[0]}
        key={cat[0]}
        className="h-full w-full rounded-lg bg-slate-300 flex justify-center items-center">
            <div 
            onClick={handleClick}
            id={`${cat[0]}-color`}
            className="h-full w-24 flex justify-center items-center z-50 py-2">
                <div className={`h-8 w-8 rounded-full pointer-events-none`} style={{backgroundColor: cat[1].color}}></div>
                <ExpandMoreIcon 
                    sx={{
                        height: '2rem',
                        width: '2.5rem',
                        pointerEvents: 'none',
                    }}/>
            </div>
            <Popover
                open={open}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <ColorSelector handleClose={handleClose} handleColorChange={handleColorChange}/>
            </Popover>
            <div className="h-full w-0 border border-slate-500">
            </div>
            <div className="h-full flex-auto">
                    <input 
                    onChange={onChangeName}
                    id={`${cat[0]}-name`}
                    className="h-full w-full bg-transparent rounded-lg font-silkscreen text-2xl px-2"
                    value={cat[1].name}
                    />
            </div>
            {   cat[0] !== 'cat1' &&
                <div 
                id={`${cat[0]}-del`}
                onClick={onDeleteCat}
                className="h-full flex-auto flex justify-center items-center px-2 hover:bg-red-500 rounded-lg hover:cursor-pointer">
                    <DeleteIcon 
                        sx={{
                            pointerEvents: 'none',
                            color: 'black',
                            '&:hover':{
                                color: 'white'
                            }
                        }}
                    />
                </div>
            }
        </div>
    );
}

export default CategoryBar;