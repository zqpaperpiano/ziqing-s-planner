import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackArrow = ({handleClickedBack}) => {
    return(
        <div 
        onClick={handleClickedBack}
        className="absolute top-0 left-0 h-fit w-fit hover:cursor-pointer">
            <div className="flex font-silkscreen text-2xl justify-center items-center">
                <ArrowBackIcon />
                <p> Back </p>
            </div>
        </div>
    );
}

export default BackArrow;