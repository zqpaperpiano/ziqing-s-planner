import React, { useState, useEffect } from "react";

const CountdownClock = ({ startTime }) => {
    const [timeLeft, setTimeLeft] = useState(startTime);


    useEffect(() => {
        if (timeLeft <= 0){
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1)
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds/60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }


    return(
        <div className="h-full w-full flex justify-center items-center font-tiny5">
            <p>{formatTime(timeLeft)}</p>
        </div>
    );
}

export default CountdownClock;