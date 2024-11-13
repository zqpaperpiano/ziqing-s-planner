import { Button } from "@mui/material";
import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ArrowDown, ArrowUp } from "lucide-react";

const PageThree = ({ currPage, handleNextPage }) => {
    const [schedule, setSchedule] = useState(null);
    const [isScheduling, setIsScheduling] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [hourFist, setHourFirst] = useState(0);
    const [hourSecond, setHourSecond] = useState(0);
    const [minuteFirst, setMinuteFirst] = useState(0);
    const [minuteSecond, setMinuteSecond] = useState(0);
  
    const handleIncrement = () => {
      triggerAnimation();
      setNumber((prevNumber) => (prevNumber + 1) % 10);
    };
  
    const handleDecrement = () => {
      triggerAnimation();
      setNumber((prevNumber) => (prevNumber - 1 + 10) % 10);
    };
  
    const triggerAnimation = () => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300); // 300ms matches CSS animation duration
    };
  

    const toggleScheduling = () => {
        if(isScheduling){
            setIsScheduling(false);
        }else{
            setIsScheduling(true);
        }
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
                <div className="absolute h-full w-full">
                    <div className="absolute top-0 left-0 hover:cursor-pointer h-fit w-fit">
                        <div
                        onClick={toggleScheduling}
                        className="flex justify-center items-center">
                            <ArrowBackIcon />
                            <p
                            className=" font-silkscreen text-xl"
                            >Back</p>
                        </div>
                    </div>
                    <div className="h-full w-full grid grid-cols-2 gap-4">
                        <div className="h-full w-full flex items-center justify-center">
                            <div className="h-1/2 w-85p bg-[#ffcdac] grid grid-cols-5">
                                <div className="h-full w-full flex flex-col ">
                                        <div className="h-15p w-full hover:cursor-pointer">
                                            <div className="h-full w-full flex justify-center items-center">
                                                <ArrowUp/>
                                            </div>
                                        </div>
                                        <div className="h-70p w-full font-tiny5 text-8xl">
                                            <div className="h-full w-full my-auto flex justify-center items-center">
                                                    <p>5</p>
                                            </div>
                                        </div>
                                        <div className="h-15p w-full hover:cursor-pointer">
                                            <div className="h-full w-full flex justify-center items-center">
                                                <ArrowDown />
                                            </div>
                                        </div>
                                </div>
                                <div className="h-full w-full flex flex-col ">
                                        <div className="h-15p w-full hover:cursor-pointer">
                                            <div className="h-full w-full flex justify-center items-center">
                                                <ArrowUp/>
                                            </div>
                                        </div>
                                        <div className="h-70p w-full font-tiny5 text-8xl">
                                            <div className="h-full w-full my-auto flex justify-center items-center">
                                                    <p>5</p>
                                            </div>
                                        </div>
                                        <div className="h-15p w-full hover:cursor-pointer">
                                            <div className="h-full w-full flex justify-center items-center">
                                                <ArrowDown />
                                            </div>
                                        </div>
                                </div>
                                <div className="h-full w-full flex justify-center items-center">
                                        <p className="font-tiny5 text-8xl">:</p>
                                </div>
                                <div className="h-full w-full flex flex-col ">
                                        <div className="h-15p w-full hover:cursor-pointer">
                                            <div className="h-full w-full flex justify-center items-center">
                                                <ArrowUp/>
                                            </div>
                                        </div>
                                        <div className="h-70p w-full font-tiny5 text-8xl">
                                            <div className="h-full w-full my-auto flex justify-center items-center">
                                                    <p>5</p>
                                            </div>
                                        </div>
                                        <div className="h-15p w-full hover:cursor-pointer">
                                            <div className="h-full w-full flex justify-center items-center">
                                                <ArrowDown />
                                            </div>
                                        </div>
                                </div>
                                <div className="h-full w-full flex flex-col ">
                                        <div className="h-15p w-full hover:cursor-pointer">
                                            <div className="h-full w-full flex justify-center items-center">
                                                <ArrowUp/>
                                            </div>
                                        </div>
                                        <div className="h-70p w-full font-tiny5 text-8xl">
                                            <div className="h-full w-full my-auto flex justify-center items-center">
                                                    <p>5</p>
                                            </div>
                                        </div>
                                        <div className="h-15p w-full hover:cursor-pointer">
                                            <div className="h-full w-full flex justify-center items-center">
                                                <ArrowDown />
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default PageThree;