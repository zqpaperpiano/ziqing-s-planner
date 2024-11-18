import { Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { ReactTyped } from "react-typed";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './PageThree.css';

import SetClock from "../../SetClock/SetClock";
import BackArrow from "../../BackArrow/BackArrow";
import { TimerReset } from "lucide-react";

const PageThree = ({ currPage, handleNextPage, handlePrevPage, handleSetSchedule, setHasSchedule }) => {
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);
    const blockRefs = useRef([]);

    const daysOfWeek = [
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
    ];

    const hoursOfDay = [
        "0000", "0100", "0200", "0300", "0400", "0500", "0600", "0700", "0800", "0900", "1000",
        "1100", "1200", "1300", "1400", "1500", "1600", "1700", '1800', '1900', '2000', '2100',
        '2200', '2300'
    ]

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        
        return(() => {
            window.removeEventListener("mouseup", handleMouseUp);
        })
    }, [])

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

    const handleMouseDown = () => {
        setIsDragging(true);
    }

    const handleMouseOver = (e) => {
        if(isDragging){
            handleClickedTime(e);
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false);
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
        if(time){
            const hours = parseInt(time.slice(0, 2), 10);
            const mins = parseInt(time.slice(2), 10);
            return hours * 60 + mins;
        }
        
    }

    const next30Mins = (time) => {
        console.log(time);
        const min = time.charAt(2);
        const hour = parseInt(time.charAt(0) + time.charAt(1), 10);

        if(min === '3'){
            const nextHour = parseInt(time.charAt(1)) + 1;
            if(nextHour > 9){
                const nextTime = nextHour + "00";
                return nextTime;
            }else{
                const nextTime = "0" + nextHour + "00";
                return nextTime
            }
        }else{
            const nextTime = hour + "30";
            return nextTime;
        }
    }

    const findBreaks = (schedArr) => {
        const timeArr = schedArr.map(key => key.slice(3));
        const sortedArr = timeArr.sort((a, b) => a-b);

        let breaks = [sortedArr[0]];
        console.log(breaks);


        for(let i = 0; i < sortedArr.length - 1; ++i){
            const curr = convertTimeToMin(sortedArr[i]);
            const next = convertTimeToMin(sortedArr[i + 1]);

            const diff = next - curr;
            

            if(diff > 30){
                console.log(`curr is ${curr} and next is ${next} and gives us a difference of ${diff}`)
                if(i === 0){
                    breaks.push(sortedArr[i + 1]);
                }else{
                    breaks.push(next30Mins(sortedArr[i]));
                    breaks.push(sortedArr[i + 1]);
                }
            }
        }

        return breaks;
    }

    const getDaySchedule = (day) =>{
        const filteredDay = selectedTimes.filter(keys => keys.includes([day]));
        const sched = [];
        if(filteredDay.length > 0){
            const breaks = findBreaks(filteredDay);
            for(let i = 0; i < breaks.length; i = i + 2){
                const newSet = {
                    "start": breaks[i],
                    "end": breaks[i + 1]
                }
                sched.push(newSet);
            }
        }

        return sched;
    }

    const handleSubmitButton = () => {
        const monScd = getDaySchedule('Mon');
        const tueScd = getDaySchedule('Tue');
        const wedScd = getDaySchedule('Wed');
        const thuScd = getDaySchedule('Thu');
        const friScd = getDaySchedule('Fri');
        const satScd = getDaySchedule('Sat');
        const sunScd = getDaySchedule('Sun');

        handleSetSchedule({
            "Mon": monScd,
            "Tue": tueScd,
            "Wed": wedScd,
            "Thu": thuScd,
            "Fri": friScd,
            "Sat": satScd,
            "Sun": sunScd
        })
        setHasSchedule(true);
        handleNextPage();
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
                            `Nice to meet you, Name.\n Will you be having a regular routine with the guild?`
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
                            
                            <div className="h-full w-2x font-silkscreen text-m grid grid-cols-26 gap-0">
                                <div className="col-start-1 row-start-1 grid grid-rows-8 gap-0 m-0 p-0">
                                    <div className="col-start-1 row-start-1">
                                    </div>
                                    {
                                        daysOfWeek.map((day) => {
                                            return(
                                                <div className={`h-full w-full col-start-1 flex justify-center items-center `}>
                                                    <p>{day}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    hoursOfDay.map((hour, index) => {
                                        return(
                                            <div className={`h-full w-full row-start-1 grid grid-rows-8 flex items-center select-none`}>
                                                <p>{hour}</p>
                                                {
                                                    daysOfWeek.map((day) => {
                                                        const id1 = day + hour;
                                                        const id2 = day + hour.charAt(0) + hour.charAt(1) + "30";
                                                        return(
                                                            <div 
                                                            className={`h-full w-full border border-yellow-900 border-1 border-r-0 
                                                            ${day === "Sun" ? null : "border-b-0"} flex`}>
                                                                <div
                                                                    onMouseDown={handleMouseDown}
                                                                    onMouseUp={handleMouseUp}
                                                                    onMouseOver={(e) => {handleMouseOver(e)}}
                                                                    onClick={handleClickedTime}
                                                                    id={id1}
                                                                    className={`h-full w-1/2 hover:cursor-pointer ${selectedTimes.includes(id1) ? "selected-time": null} border border-dashed border-r-yellow-900 border-l-0 border-t-0 boreder-b-0`}>
                                                                </div>
                                                                <div 
                                                                className={`h-full w-1/2 hover:cursor-pointer ${selectedTimes.includes(id2) ? "selected-time": null}`}
                                                                onMouseDown={handleMouseDown}
                                                                onMouseUp={handleMouseUp}
                                                                onMouseOver={(e) => {handleMouseOver(e)}}
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