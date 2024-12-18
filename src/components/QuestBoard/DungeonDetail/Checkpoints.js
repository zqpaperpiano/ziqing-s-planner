import React, {useEffect, useState} from "react";
import Checkbox from '@mui/material/Checkbox';
import DynamicInputBox from "../../DynamicInputBox";

const Checkpoints = ({checkpoints, handleCheckpointChange, handleCheckboxChange, checkColor}) => {
    const checkCol = checkColor || "gray"
    const handleCheckboxCheckChange = (index, e) => {
        const completed = e.target.checked
        handleCheckboxChange(index, completed);
    }

    return(
        <div className="w-full">
            {checkpoints && checkpoints.map((checkpoint, index) => {
                const checked = Object.values(checkpoint)[0];
                return(
                <form key={index} className="flex items-center justify-center w-full">
                    <Checkbox 
                    sx={{
                        color: checkCol,
                        '&.Mui-checked':{
                            color: checkCol
                        }
                    }}
                    checked={checked}
                    onChange={(e) => {handleCheckboxCheckChange(index, e)}}
                    />
                    <DynamicInputBox 
                    index={index}
                    handleChange={handleCheckpointChange}
                    placeholderText={Object.keys(checkpoint)} />
                </form>
            )})}
        </div>
    );
}

export default Checkpoints;