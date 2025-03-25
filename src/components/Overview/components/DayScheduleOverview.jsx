import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const DayScheduleOverview = ({ event }) => {
    const navigate = useNavigate();
    const timeStartString = useMemo(() => {
        const timeOnlyString = event.start.toTimeString().split(' ')[0];
        const hourAndMin = timeOnlyString.split(':')[0] + ':' +timeOnlyString.split(':')[1];
        return hourAndMin;
    })
    const timeEndString = useMemo(() => {
        const timeOnlyString = event.end.toTimeString().split(' ')[0];
        const hourAndMin = timeOnlyString.split(':')[0] + ':' +timeOnlyString.split(':')[1];
        return hourAndMin;
    })
    

    return(
        <div 
        onClick={() => {navigate(`/warRoom/event-details/${event.eventId}`)}}
        className="h-fit w-full flex flex-col hover:cursor-pointer" id={event.eventId}> 
            <div className="h-18 py-2 border-b border-black">
                <div className="relative flex w-full">
                    <div className="flex-col h-full items-start gap-2">
                        <div 
                        className="h-8 w-full flex items-start">
                            <p
                            className="rounded-lg px-2 py-1"
                            style={{
                                backgroundColor: event.color,   
                            }}
                            >{timeStartString} - {timeEndString}</p>
                        </div>
                        <p>{event.title}</p>
                    </div>
                    {/* <div 
                    style={{
                        backgroundColor: event.color,
                    }} */}
                    {/* // className={`h-16 w-4 rounded-r-lg`}></div> */}
                </div>
            </div>
        </div>
    );
}

export default DayScheduleOverview;