import { Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { ReactTyped } from "react-typed";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './PageThree.css';

import SetClock from "../../SetClock/SetClock";
import BackArrow from "../../BackArrow/BackArrow";
import { TimerReset } from "lucide-react";

const PageThree = ({ currPage, handleNextPage, handlePrevPage }) => {
    const [hasSchedule, setHasSchedule] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const blockRefs = useRef([]);

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

    const handleClickedTime = (e) => {
        const {id} = e.target;
        if(!selectedTimes.includes(id)){
            setSelectedTimes(prevItems => [
                ...prevItems, id
            ])
        }else{
            const filteredObject = selectedTimes.filter(time => 
                time !== id
            ) 
            setSelectedTimes(filteredObject);
        }
    }

    const convertTimeToMin = (time) => {
        const val = toString(time);
        if(val.length === 4){
            const hours = parseInt(val.slice(0, 2), 10);
            const mins = parseInt(val.slice(2), 10);
            return hours * 60 + mins;
        }else{
            console.log(time);
            return time;
        }
        
        
    }

    const findBreaks = (schedArr) => {
        const timeArr = schedArr.map(key => key.slice(3));
        const inMins = timeArr.map(time => {
            convertTimeToMin(time)});
        const sortedArr = inMins.sort((a, b) => b-a);

        let breaks = {};

        console.log('received arr: ', sortedArr);

        for(let i = 0; i < sortedArr.length - 1; ++i){
            const next = convertTimeToMin(sortedArr[i + 1]);
            const curr = convertTimeToMin(sortedArr[i]);

            console.log('comparing: ', next, ' to ', curr);
            const diff = next - curr;
            console.log(diff);

            if(diff > 30){
                breaks.push(sortedArr[i], sortedArr[i + 1]);
            }
        }

        console.log('here:', breaks);

        return breaks;
    }

    const handleSubmitButton = () => {
        const Mons = selectedTimes.filter(keys => keys.includes('Mon'));
        const MonSched = {};
        if(Mons.length > 0){
            const breaks = findBreaks(Mons);
            console.log(breaks);
        }

        const Tues = selectedTimes.filter(keys => keys.includes('Tue'));

        const Weds = selectedTimes.filter(keys => keys.includes('Wed'));

        const Thus = selectedTimes.filter(keys => keys.includes('Thu'));

        const Fris = selectedTimes.filter(keys => keys.includes('Fri'));

        const Sats = selectedTimes.filter(keys => keys.includes('Sat'));

        const Suns = selectedTimes.filter(keys => keys.includes('Sun'));
    }

    return(
        <div className="relative h-full w-1/5 backgrounds whitespace-pre-line text-center">
            {
                currPage === 3 &&
                <div className={`absolute h-full w-full flex flex-col text-2xl font-silkscreen items-center justify-center
                ${isScheduling && "opacity-0 pointer-events-none"}`}>
                    <BackArrow handleClickedBack={handlePrevPage} />
                    <ReactTyped
                        backSpeed={0}
                        typeSpeed={25}
                        cursorChar="|"
                        strings={[
                            `Will you be having a regular routine with the guild?`
                        ]}
                    />
                    <div className="absolute bottom-12 h-1/4 flex flex-col w-2/3 bg-[#ffcdac] border border-yellow-900 border-2 font-silkscreen text-xl">
                        <div 
                        onClick={toggleScheduling}
                        className="h-1/2 w-full text-start flex items-center hover:border-2 hover:border hover:cursor-pointer hover:border-yellow-900 hover:border-b-2 hover:border-t-0 hover:bg-[#ffebde]">
                            <p>Yes, let's discuss a weekly schedule that I will be working in the guild. </p> 
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
                    <div className={`h-full w-full flex flex-col items-center justify-center transition-transform duration-700`}>
                        <div className="h-80p w-85p mt-4 bg-bgBrown overflow-x-scroll p-2">
                            
                            <div className="h-full w-2x font-silkscreen text-m grid grid-cols-26">
                                <div className="col-start-1 row-start-1 grid grid-rows-8">
                                    <div className="col-start-1 row-start-1">
                                    </div>
                                    {
                                        daysOfWeek.map((day) => {
                                            return(
                                                <div className={`col-start-1 flex justify-center items-center `}>
                                                    <p>{day}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    hoursOfDay.map((hour, index) => {
                                        return(
                                            <div className={`row-start-1 grid grid-rows-8 flex justify-center items-center`}>
                                                <p>{hour}</p>
                                                {
                                                    daysOfWeek.map((day) => {
                                                        const id1 = day + hour;
                                                        const id2 = day + hour.charAt(0) + hour.charAt(1) + "30";
                                                        return(
                                                            <div 
                                                            className={`h-full w-full border border-yellow-900 border-1 border-r-0 
                                                            ${day === "Sun" ? null : "border-b-0"} grid grid-cols-2`}>
                                                                <div
                                                                    onClick={handleClickedTime}
                                                                    id={id1}
                                                                    className={`hover:cursor-pointer ${selectedTimes.includes(id1) ? "selected-time": null} border border-dashed border-r-yellow-900 border-l-0 border-t-0 boreder-b-0`}>
                                                                </div>
                                                                <div 
                                                                className={`hover:cursor-pointer ${selectedTimes.includes(id2) ? "selected-time": null}`}
                                                                onClick={handleClickedTime}
                                                                id={id2}>
                                                                </div>
                                                                    
                                                            </div>  
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }

                                
                            </div>
                            
                        </div>
                        <div className="h-fit w-fit flex items-center justify-center pt-2 ">
                            <Button
                                onClick={handleSubmitButton}
                                variant="outlined"
                                sx={{
                                    backgroundColor: "red", 
                                    color: "white", 
                                    fontFamily: "silkscreen"
                                }}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default PageThree;