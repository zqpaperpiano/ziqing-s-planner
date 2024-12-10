import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryBar = ({cat, onChangeName, onChangeColor}) => {
    return(
        <div 
        id={cat[0]}
        key={cat[0]}
        className="h-full w-full rounded-lg bg-slate-300 flex justify-center items-center">
            <div 
            id={`${cat[0]}-color`}
            className="h-full w-24 flex justify-center items-center z-50">
                <div className={`h-8 w-8 rounded-full pointer-events-none`} style={{backgroundColor: cat[1].color}}></div>
                <ExpandMoreIcon 
                    sx={{
                        height: '2rem',
                        width: '2.5rem',
                        pointerEvents: 'none',
                    }}/>
            </div>
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
            <div className="h-full flex-auto flex justify-center items-center px-2 hover:bg-red-500 rounded-lg hover:cursor-pointer">
                <DeleteIcon 
                    sx={{
                        color: 'black',
                        '&:hover':{
                            color: 'white'
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default CategoryBar;