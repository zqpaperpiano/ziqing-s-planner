import React, {useEffect, useRef, useState} from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@mui/material";

const SetClock = ({selected}) => {
    const [hourFirst, setHourFirst] = useState(0);
    const [hourSecond, setHourSecond] = useState(0);
    const [minuteFirst, setMinuteFirst] = useState(0);
    const [minuteSecond, setMinuteSecond] = useState(0);
    const [time, setTime] = useState("00:00");
    const inputRefs = useRef([]);

    useEffect(() => {
        if(selected){
            addEventListener
        }
    })
  
    

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
        <div className="h-full w-full flex flex-col justify-center items-center">
                <div className="h-85p w-full grid grid-cols-5 bg-[#ffcdac]">
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
            <div className="h-15p w-full m-4">
                <Button
                    variant="outlined"
                    size="large"
                    sx={{
                        color: 'white',
                        backgroundColor: 'red'
                    }}
                >
                    Set
                </Button>
            </div>
        </div>
    );
}

export default SetClock;