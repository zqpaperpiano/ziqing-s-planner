import React from "react";

const DayScheduleBreakdown = ({ day }) => {
    return(
        <div className="h-full w-full flex">
           {
            day ?
            <div className="h-full w-full">
                 {
                day.length === 1 ?
                <div className="h-full w-full">
                Rest
                </div> :
                <div className="h-full w-full flex gap-2">
                    {
                        day.map((range, index) => {
                            return(
                                <div key={index}>
                                    {index !== day.length - 1 ? <div>{range.start} - {range.end};</div>
                                    : <div>{range.start} - {range.end}</div>    
                                }
                                    
                                </div>
                            )
                        })
                    }
                </div>
            }
            </div> :
            <div className="h-full w-full">
                Loading...
            </div>
           }
        </div>
    );
}

export default DayScheduleBreakdown;

