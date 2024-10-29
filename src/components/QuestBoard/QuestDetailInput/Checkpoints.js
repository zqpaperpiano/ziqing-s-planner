import React, {useEffect, useState} from "react";
import Checkbox from '@mui/material/Checkbox';
import DynamicInputBox from "../../DynamicInputBox";

const Checkpoints = ({checkpoints, handleCheckpointChange}) => {
    return(
        <div className="w-full">
            {checkpoints && checkpoints.map((checkpoint, index) => (
                <form key={index} className="flex items-center justify-center w-full">
                    <Checkbox />
                    <DynamicInputBox 
                    index={index}
                    handleChange={handleCheckpointChange}
                    placeholderText={Object.keys(checkpoint)} />

                </form>
            ))}
        </div>
    );
}

export default Checkpoints;