import React, {useState} from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ArrowDown, ArrowUp } from "lucide-react";

const SetClock = () => {
    const [hourFirst, setHourFirst] = useState(0);
    const [hourSecond, setHourSecond] = useState(0);
    const [minuteFirst, setMinuteFirst] = useState(0);
    const [minuteSecond, setMinuteSecond] = useState(0);
  
    const handleH1Increment = () => {
        setHourFirst((prevVal) => {
            return (prevVal + 1) % 3
        })
    }

    const handleH1Decrement = () => {
        setHourFirst((prevVal) => {
            return (prevVal - 1) % 3;
        })
    }

    const handleH2Increment = () => {
        if(hourFirst === 2){
            setHourSecond((prevVal) => {
                return (prevVal + 1) % 5
            })
        }else{
            setHourSecond((prevVal) => {
                return (prevVal + 1) % 10
            })
        }
    }

    const handleH2Decrement = () => {
        if(hourFirst === 2){
            setHourSecond((prevVal) => {
                return (prevVal - 1) % 5;
            })
        }else{
            setHourSecond((prevVal) => {
                return (prevVal - 1) % 10;
            })
        }
    }

    const handleM1Increment = () => {
        setMinuteFirst((prevVal) => {
            return (prevVal + 1) % 6;
        })
    }

    const handleM1Decrement = () => {
        setMinuteFirst((prevVal) => {
            return (prevVal - 1) % 6;
        })
    }

    const handleM2Increment = () => {
        setMinuteSecond((prevVal) => {
            return (prevVal + 1) % 10
        })
    }

    const handleM2Decrement = () => {
        setMinuteSecond((prevVal) => {
            return (prevVal - 1) % 10;
        })
    }

    return(
        <div className="h-full w-full grid grid-cols-5">
            <div className="h-full w-full flex flex-col ">
                    <div 
                    onClick={handleH1Increment}
                    className="h-15p w-full hover:cursor-pointer">
                        <div className="h-full w-full flex justify-center items-center">
                            <ArrowUp/>
                        </div>
                    </div>
                    <div className="h-70p w-full font-tiny5 text-8xl">
                        <div className="h-full w-full my-auto flex justify-center items-center">
                                <p>{hourFirst}</p>
                        </div>
                    </div>
                    <div 
                    onClick={handleH1Decrement}
                    className="h-15p w-full hover:cursor-pointer">
                        <div className="h-full w-full flex justify-center items-center">
                            <ArrowDown />
                        </div>
                    </div>
            </div>
            <div className="h-full w-full flex flex-col ">
                    <div 
                    onClick={handleH2Increment}
                    className="h-15p w-full hover:cursor-pointer">
                        <div className="h-full w-full flex justify-center items-center">
                            <ArrowUp/>
                        </div>
                    </div>
                    <div className="h-70p w-full font-tiny5 text-8xl">
                        <div className="h-full w-full my-auto flex justify-center items-center">
                                <p>{hourSecond}</p>
                        </div>
                    </div>
                    <div 
                    onClick={handleH2Decrement}
                    className="h-15p w-full hover:cursor-pointer">
                        <div className="h-full w-full flex justify-center items-center">
                            <ArrowDown />
                        </div>
                    </div>
            </div>
            <div className="h-full w-full flex justify-center items-center">
                    <p className="font-tiny5 text-8xl">:</p>
            </div>
            <div className="h-full w-full flex flex-col ">
                    <div 
                    onClick={handleM1Increment}
                    className="h-15p w-full hover:cursor-pointer">
                        <div className="h-full w-full flex justify-center items-center">
                            <ArrowUp/>
                        </div>
                    </div>
                    <div className="h-70p w-full font-tiny5 text-8xl">
                        <div className="h-full w-full my-auto flex justify-center items-center">
                                <p>{minuteFirst}</p>
                        </div>
                    </div>
                    <div 
                    onClick={handleM1Decrement}
                    className="h-15p w-full hover:cursor-pointer">
                        <div className="h-full w-full flex justify-center items-center">
                            <ArrowDown />
                        </div>
                    </div>
            </div>
            <div className="h-full w-full flex flex-col ">
                    <div 
                    onClick={handleM2Increment}
                    className="h-15p w-full hover:cursor-pointer">
                        <div className="h-full w-full flex justify-center items-center">
                            <ArrowUp/>
                        </div>
                    </div>
                    <div className="h-70p w-full font-tiny5 text-8xl">
                        <div className="h-full w-full my-auto flex justify-center items-center">
                                <p>{minuteSecond}</p>
                        </div>
                    </div>
                    <div 
                    onClick={handleM2Decrement}
                    className="h-15p w-full hover:cursor-pointer">
                        <div className="h-full w-full flex justify-center items-center">
                            <ArrowDown />
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default SetClock;