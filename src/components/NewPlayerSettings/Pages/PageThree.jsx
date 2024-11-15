import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ReactTyped } from "react-typed";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import SetClock from "../../SetClock/SetClock";

const PageThree = ({ currPage, handleNextPage }) => {
    const [hasSchedule, setHasSchedule] = useState(false);
    const [isScheduling, setIsScheduling] = useState(true);
    const [onStart, setOnStart] = useState(true);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");   

    const setScheduleStart = (hour, minute) => {
        setHasSchedule(true);
        const start = hour + ":" + minute;
        setStartTime(start);
    }

    const setScheduleEnd = (hour, minute) => {
        const end = hour + ":" + minute;
        setEndTime(end);
    }
  

    const toggleScheduling = () => {
        if(isScheduling){
            setIsScheduling(false);
        }else{
            setIsScheduling(true);
        }
    }

    const handleClickBack = () => {
        if(isScheduling){
            if(!onStart){
                setOnStart(true);
            }else{
                setIsScheduling(false);
            }
        }
    }

    const handleNextSlide = () => {
        setOnStart(false);
    }

    return(
        <div className="relative h-full w-1/5 backgrounds whitespace-pre-line text-center">
            {
                currPage === 3 &&
                <div className={`absolute h-full w-full flex flex-col text-2xl font-silkscreen items-center justify-center
                ${isScheduling && "opacity-0 pointer-events-none"}`}>
                    <ReactTyped
                        backSpeed={0}
                        typeSpeed={25}
                        cursorChar="|"
                        strings={[
                            `Will you be having a regular routine with the guild?`
                        ]}
                    />
                    <div className="absolute bottom-12 flex w-1/2 justify-between">
                        <div className="h-fit w-1/2">
                                <Button 
                                    onClick={toggleScheduling}
                                    size="large"
                                    sx={{
                                        backgroundColor: 'red',
                                        color: 'white'
                                    }}
                                    variant="outlined"
                                >
                                    Yes
                                </Button>
                            </div>
                            <div className="h-fit w-1/2">
                                <Button 
                                    onClick={handleNextPage}
                                    size="large"
                                    sx={{
                                        backgroundColor: 'red',
                                        color: 'white'
                                    }}
                                    variant="outlined"
                                >
                                    No
                                </Button>
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
                    <div className={`h-full w-1/2 flex flex-col items-center justify-center transition-transform duration-700 ${onStart ? "opacity-1" : "-translate-x-full opacity-0"}`}>
                        <p className="font-silkscreen text-2xl text-center">Start Time</p>
                        <div className="h-1/2 w-85p">
                            <SetClock setSchedule={setScheduleStart} handleNextSlide={handleNextSlide}/>
                        </div>
                    </div>
                    <div className={`absolute h-full w-1/2 flex flex-col items-center justify-center transition-transform duration-700 ${onStart ? "opacity-0 -translate-x-full" : "translate-x-0 opacity-1"}`}>
                        <p className="font-silkscreen text-2xl text-center">End Time</p>
                        <div className="h-1/2 w-85p">
                            <SetClock setSchedule={setScheduleEnd} handleNextSlide={handleNextPage}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default PageThree;