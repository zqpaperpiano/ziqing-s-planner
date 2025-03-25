import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const DeadlineView = ({ event }) => {
    const navigate = useNavigate();
    const deadlineString = useMemo(() => {
        const timeOnlyString = event.end.toTimeString().split(' ')[0];
        const hourAndMin = timeOnlyString.split(':')[0] + ':' +timeOnlyString.split(':')[1];
        return hourAndMin;
    }, [event])
    const deadlineDate = useMemo(() => {
        const dateArr = event.end.toDateString().split(' ');
        return `${dateArr[0]} ${dateArr[1]} ${dateArr[2]}`;
    }, [event])

    return(
        <div 
        onClick={() => {navigate(`/warRoom/event-details/${event.eventId}`)}}
        className="h-fit w-full flex flex-col hover:cursor-pointer">
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
                            >{deadlineDate} {deadlineString}</p>
                        </div>
                        <p>{event.title}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DeadlineView;