import React, { useState } from "react";
import MinimizeIcon from '@mui/icons-material/Minimize';
import Crop54Icon from '@mui/icons-material/Crop54';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField } from "@mui/material";

const BraindumpTab = () => {
    const [tabName, setTabName] = useState('Braindump');

    return(
        <div className="h-full w-full bg-bgPink rounded-lg">
            <div className="relative w-full bg-deepPink rounded-t-lg px-2" style={{height: '12%'}}>
                <div className="absolute left-0 rounded-tl-lg h-full w-8 flex items-center justify-center p-2 hover:cursor-pointer hover:bg-black hover:bg-opacity-30 hover:backdrop-blur-sm">
                    +
                </div>
                <input 
                    type="text"
                    maxLength={25}
                    value={tabName}
                    onChange={(e) => setTabName(e.target.value)}
                    style={{fontFamily: 'source-code-pro'}}
                    className="absolute left-12 font-semibold top-1/2 transform -translate-y-1/2 w-3/4 bg-deepPink focus:outline-none"
                />

                <div className="absolute right-2 w-1/4 rounded-r-lg h-full flex justify-around items-center">
                    <div
                    ><MinimizeIcon /></div>
                    <div><Crop54Icon /></div>
                    <div><CloseIcon /></div>
                </div>

                
            </div>
            <div 
                style={{fontFamily: 'source-code-pro', height: '88%'}}
                className=" w-full">
                    <textarea
                        type="text"
                        style={{resize: 'none', boxShadow: 'none', outline: 'none'}}
                        placeholder="What are you thinking of?"
                        className="w-full h-full bg-bgPink align-top p-1 rounded-b-lg" />
                </div>
        </div>
    );
}

export default BraindumpTab;