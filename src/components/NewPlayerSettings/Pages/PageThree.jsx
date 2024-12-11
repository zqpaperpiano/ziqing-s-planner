import { Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { ReactTyped } from "react-typed";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './PageThree.css';

import SetClock from "../../SetClock/SetClock";
import BackArrow from "../../BackArrow/BackArrow";
import { TimerReset } from "lucide-react";
import Scheduler from "../../Scheduler/Scheduler";

const PageThree = ({ currPage, handleNextPage, handlePrevPage, handleSetSchedule }) => {
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);

    const daysOfWeek = [
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
    ];

    const hoursOfDay = [
        "0000", "0100", "0200", "0300", "0400", "0500", "0600", "0700", "0800", "0900", "1000",
        "1100", "1200", "1300", "1400", "1500", "1600", "1700", '1800', '1900', '2000', '2100',
        '2200', '2300'
    ]

    const toggleScheduling = () => {
        if(isScheduling){
            setIsScheduling(false);
        }else{
            setIsScheduling(true);
        }
    }

    const handleClickBack = () => {
        if(isScheduling){
            setIsScheduling(false);
        }
    }

    return(
        <div className="relative h-full w-1/5 backgrounds whitespace-pre-line text-center">
            {
                currPage === 3 &&
                <div className={`absolute h-full w-full flex flex-col text-2xl font-silkscreen items-center
                ${isScheduling && "opacity-0 pointer-events-none"}`}>
                    <BackArrow handleClickedBack={handlePrevPage} />
                    <ReactTyped
                        className="absolute top-24"
                        backSpeed={0}
                        typeSpeed={25}
                        cursorChar="|"
                        strings={[
                            `Nice to meet you, Name.\n Will you be having a regular routine of clearing dungeons?`
                        ]}
                    />
                    <div className="absolute bottom-12 h-1/3 flex flex-col w-2/3 bg-[#ffcdac] p-4 gap-4 border border-yellow-900 border-2 font-silkscreen text-xl">
                        <div 
                        onClick={toggleScheduling}
                        className="h-1/2 w-full text-start flex items-center hover:border-2 hover:border hover:cursor-pointer hover:border-yellow-900 hover:border-b-2 hover:bg-[#ffebde]">
                            <p>Yes, I will allocate some time for this. </p> 
                        </div>
                        <div 
                        onClick={handleNextPage}
                        className="h-1/2 w-full text-start flex items-center hover:border-2 hover:border hover:cursor-pointer hover:border-yellow-900 hover:border-t-2  hover:bg-[#ffebde]">
                            <p>No, I will be dropping by at random times of the day. </p> 
                        </div>
                        </div>
                </div>
            }
            {
                isScheduling &&
                <div className="relative h-full w-full flex justify-center items-center ">
                    <div className="absolute top-0 left-0 hover:cursor-pointer h-fit w-fit z-50">
                        <div
                        onClick={handleClickBack}
                        className="flex justify-center items-center">
                            <ArrowBackIcon />
                            <p
                            className=" font-silkscreen text-xl"
                            >Back</p>
                        </div>
                    </div>
                    <Scheduler handleSetSchedule={handleSetSchedule} handleNextPage={handleNextPage}/>
                </div>
            }
        </div>
    );
}

export default PageThree;