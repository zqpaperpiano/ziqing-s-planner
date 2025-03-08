import React, {useContext, useEffect, useState} from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../../config/authContext";
import { useLocation } from "react-router-dom";
import config from '../../config/config.json';
import { auth } from "../../config/firebase";

const daysOfWeek = [
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
];

const hoursOfDay = [
    "0000", "0100", "0200", "0300", "0400", "0500", "0600", "0700", "0800", "0900", "1000",
    "1100", "1200", "1300", "1400", "1500", "1600", "1700", '1800', '1900', '2000', '2100',
    '2200', '2300'
]

const Scheduler = ({handleSetSchedule, handleNextPage, newWidth, newHeight}) => {
    const { player, setPlayer, tokenRefresh } = useContext(AuthContext);
    const [isDragging, setIsDragging] = useState(false);
    const tableWidth = newWidth || "85%";
    const tableHeight = newHeight || "80%";
    const [selectedTimes, setSelectedTimes] = useState([]);
    const location = useLocation();

    useEffect(() => {
        convertDayScheduleToCombined(player?.preferences?.schedule);
    }, [])

    useEffect(() => {
        console.log('curr arr: ', selectedTimes);
    }, [selectedTimes])

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        
        return(() => {
            window.removeEventListener("mouseup", handleMouseUp);
        })
    }, [])

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

    //adds time selected into array or removes it if previously selected
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
        const min = parseInt(time.slice(2, 4), 10);
        const hour = parseInt(time.slice(0, 2), 10);

        let newMin = min + 30;
        let newHour = hour;

        while(newMin >= 60){
            newMin -= 60;
            newHour += 1;
        }

        while(newHour >= 24){
            newHour -= 24;
        }

        const formattedHour = newHour.toString().padStart(2, "0");
        const formattedMinutes = newMin.toString().padStart(2, "0");

        return `${formattedHour}${formattedMinutes}`;
    }

    const findBreaks = (schedArr) => {
        const timeArr = schedArr.map(key => key.slice(3)); //removes the day from the string
        const sortedArr = timeArr.sort((a, b) => a-b);

        let breaks = [sortedArr[0]];

        // console.log('sorted array: ', sortedArr);

        for(let i = 0; i < sortedArr.length - 1; ++i){
            const curr = convertTimeToMin(sortedArr[i]);
            const next = convertTimeToMin(sortedArr[i + 1]);

            const diff = next - curr;

            // console.log('for curr time: ', sortedArr[i], ' the next time is: ', sortedArr[i+1], ' and their difference is: ', diff);
            

            if(diff > 30){
                if(i === 0){
                    breaks.push(sortedArr[i + 1]);
                }else{
                    breaks.push(next30Mins(sortedArr[i]));
                    breaks.push(sortedArr[i + 1]);
                }
            }
        }
        breaks.push(sortedArr[sortedArr.length - 1]);

        return breaks;
    }

    const getDaySchedule = (day) =>{
        const filteredDay = selectedTimes.filter(keys => keys.includes([day]));
        const sched = [];
        if(filteredDay.length > 0){
            const breaks = findBreaks(filteredDay);

            console.log('breaks: ', breaks);    

            for(let i = 0; i < breaks.length; i = i + 2){
                let newSet = {
                    "start": breaks[i],
                    "end": breaks[i + 1]
                } 
                if(newSet.start === newSet.end){
                    newSet.end = next30Mins(newSet.end);
                }
                
                sched.push(newSet);
            }
        }

        if(sched.length === 0){
            sched.push("Rest");
        }

        return sched;
    }

    const convertDayScheduleToCombined = (obj) => {
        let combined = [];

        if(!obj) return combined;
        // console.log('converting: ', obj);

        Object.entries(obj).map((day) => {
            if(day[1].length > 1){
                const currDay = day[0];
                Object.values(day[1]).map((time) => {
                    combined.push(currDay + time.start);

                    let currTime = next30Mins(time.start);
                    
                    while(currTime !== time.end){
                        combined.push(currDay + currTime);
                        currTime = next30Mins(currTime);
                        console.log('current list: ', combined);
                    }
                })
            }
        })

        // console.log('result of our calculation: ', combined);
        setSelectedTimes(combined);
    }

    const postNewSchedule = async (hasSchedule, finSchedule, retry) => {
        try{
            const resp = await  fetch(`${config.development.apiURL}users/newUserPreferences`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "uid": auth.currentUser.uid,
                    "displayName": player.name,
                    "preferences": {
                        "hasSchedule": hasSchedule,
                        "schedule": finSchedule
                    }
                })
            });

            if(resp.status === 401){
                if(!retry){
                    await tokenRefresh();
                    postNewSchedule(hasSchedule, finSchedule, true);
                    return;
                }else{
                    throw new Error('Unauthorized');
                }
            }

            if(resp.ok){
                const data = await resp.json();
                setPlayer(data);
            }
        }catch(err){
            console.log('an error has occured: ', err);
        }
    }

    const handleSubmitButton = () => {
        const monScd = getDaySchedule('Mon');
        const tueScd = getDaySchedule('Tue');
        const wedScd = getDaySchedule('Wed');
        const thuScd = getDaySchedule('Thu');
        const friScd = getDaySchedule('Fri');
        const satScd = getDaySchedule('Sat');
        const sunScd = getDaySchedule('Sun');

        const finSchedule = {
            "Mon": monScd,
            "Tue": tueScd,
            "Wed": wedScd,
            "Thu": thuScd,
            "Fri": friScd,
            "Sat": satScd,
            "Sun": sunScd
        }

        const hasSchedule = Object.values(finSchedule).some(day => day.length > 1);

        if(location.pathname === "/inn"){
            postNewSchedule(hasSchedule, finSchedule, false)

        }else{
            handleSetSchedule(
                finSchedule
            )
        }
        handleNextPage();
    }

    return(
        <div className={`h-full w-full flex flex-col items-center justify-center transition-transform duration-700`}>
            <div 
            style={{height: tableHeight, width:tableWidth}}
            className="rounded-lg mt-4 bg-bgBrown overflow-x-scroll p-2">
                <div className="h-full w-2x font-silkscreen text-m grid grid-cols-26 gap-0">
                    <div className="col-start-1 row-start-1 grid grid-rows-8 gap-0 m-0 p-0">
                        <div className="col-start-1 row-start-1">
                        </div>
                        {
                            daysOfWeek.map((day, index) => {
                                return(
                                    <div key={index} className={`h-full w-full col-start-1 flex justify-center items-center `}>
                                        <p>{day}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        hoursOfDay.map((hour, index) => {
                            return(
                                <div key={index} className={`h-full w-full row-start-1 grid grid-rows-8 flex items-center select-none`}>
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
    );
}

export default Scheduler;