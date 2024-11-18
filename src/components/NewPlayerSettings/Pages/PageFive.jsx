import React from "react";
import { ReactTyped } from "react-typed";
import BackArrow from "../../BackArrow/BackArrow";

const PageFive = ({handlePrevPage, handleNextPage}) => {
    return(
        <div className="relative h-full w-1/5 backgrounds font-silkscreen text-2xl flex flex-col items-center justify-center whitespace-pre-line">
            <BackArrow handleClickedBack={handlePrevPage}/>
            <ReactTyped
                className="text-center"
                backSpeed={0}
                typeSpeed={25}
                strings={["Thank you name, for your time.\n All your information has been recorded.\n Best of luck in your conquests. "]}
            />
            <div 
            onClick={handleNextPage}
            className="absolute bottom-12 border border-yellow-900 border-2 hover:cursor-pointer hover:border-yellow-400 h-10p w-1/3 bg-[#ffcdac] flex items-center">
                <p>Start my adventure!</p>
            </div>
        </div>
    );
}

export default PageFive;