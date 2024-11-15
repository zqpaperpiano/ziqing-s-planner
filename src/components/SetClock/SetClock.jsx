import React, {useEffect, useRef, useState} from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@mui/material";

const SetClock = ({setSchedule,handleNextSlide}) => {
    const [inputTracker, setInputTracker] = useState(1);

    const [hour, setHour] = useState("00");
    const [minute, setMinute] = useState("00");

    const handleHourIncrease = () => {
        let num = parseInt(hour);

        if(num < 9){
            num = num + 1;
            const str = "0" + num;
            setHour(str);
        }else if(num < 23){
            num = num + 1;
            const str = "" + num;
            setHour(str);
        }else{
            setHour("00");
        }
    }

    const handleHourDecrease = () => {
        let num = parseInt(hour);

        if(num < 11 && num > 0){
            num = num - 1
            const str = "0" + num;
            setHour(str);
        }
        else if(num > 10){
            num = num - 1;
            const str = "" + num
            setHour(str);
        }else{
            setHour("23");
        }
    }

    const handleMinIncrease = () => {
        let num = parseInt(minute);

        if(num < 9){
            num = num + 1;
            const str = "0" + num;
            setMinute(str);
        }else if(num < 59){
            num = num + 1;
            const str = "" + num;
            setMinute(str);
        }else{
            setMinute("00");
        }
    }

    const handleMinDecrease = () => {
        let num = parseInt(minute);

        if(num < 11 && num > 0){
            num = num - 1;
            const str = "0" + num;
            setMinute(str);
        }else if(num > 10){
            num = num - 1;
            const str = "" + num;
            setMinute(str);
        }else{
            setMinute("59");
        }
    }


    useEffect(() => {


            document.addEventListener("keydown", handleKeyDown, false);

            return () => {
                document.removeEventListener("keydown", handleKeyDown, false);
            }
    })

    const handleKeyDown = (e) => {
        const val = parseInt(e.key);

       if(!isNaN(val)){
        switch(inputTracker){
            case 1:
                if(val === 1){
                    const newHour = val + hour.charAt(1);
                    setHour(newHour);
                    cycleInput();
                }else if(val === 2){
                    const secondVal = hour.charAt(1);
                    if(parseInt(secondVal) > 3){
                        const newHour = val + "0";
                        setHour(newHour);
                        cycleInput();
                    }else{
                        const newHour = val + secondVal;
                        setHour(newHour);
                        cycleInput();
                    }
                }
                break;
            case 2:
                const firstVal = hour.charAt(0);
                if(parseInt(firstVal) === 2){
                    if(val < 4){
                        const newHour = firstVal + val;
                        setHour(newHour);
                        cycleInput();
                    }
                }else{
                    if(val >=0 && val <= 9){
                        const newHour = firstVal + val;
                        setHour(newHour);
                        cycleInput();
                    }
                }
                break;
            
            case 3:
                if(val >= 0 && val <= 5){
                    const secondMin = minute.charAt(1);
                    const newMin = val + secondMin;
                    setMinute(newMin);
                    cycleInput();
                }
                break;

            case 4:
                if(val >=0 && val <= 9){
                    const firstMin = minute.charAt(0);
                    const newMin = firstMin + val;
                    setMinute(newMin);
                    cycleInput();
                }
        }
       }
    }

    useEffect(() => {
        console.log(inputTracker);
    }, [inputTracker])

    const cycleInput = () => {
        setInputTracker((prevVal) => {
            if(prevVal === 4){
                return 1;
            }else{
                return prevVal + 1;
            }
        })
    }

    const handleSetTime = () => {
        setSchedule(hour, minute);
        handleNextSlide();
    }

    return(
        <div className="h-full w-full flex flex-col justify-center items-center mt-2">
                <div className="h-85p w-full flex flex-col bg-[#ffcdac]">
                    <div className="h-4/5 w-full p-2 grid grid-cols-5 ">
                        <div className="h-full w-full flex items-center justify-center font-tiny5 text-9xl">
                            <p>{hour.charAt(0)}</p>
                        </div>
                        <div className="h-full w-full flex items-center justify-center font-tiny5 text-9xl">
                            <p>{hour.charAt(1)}</p>
                        </div>
                        <div className="h-full w-full flex items-center justify-center font-tiny5 text-9xl">
                            <p>:</p>
                        </div>
                        <div className="h-full w-full flex items-center justify-center font-tiny5 text-9xl">
                            <p>{minute.charAt(0)}</p>
                        </div>
                        <div className="h-full w-full flex items-center justify-center font-tiny5 text-9xl">
                            <p>{minute.charAt(1)}</p>
                        </div>
                    </div>
                    <div className="h-1/5 w-full flex">
                        <div className="h-full w-1/2 flex items-center">
                            <div className="h-full w-85p flex items-center justify-evenly pr-8 pb-2">
                                <div 
                                onClick={handleHourIncrease}
                                className="h-90p w-8 bg-slate-300 hover:cursor-pointer flex items-center justify-center">
                                    <p className="font-silkscreen text-2xl">+</p>
                                </div>
                                <div 
                                onClick={handleHourDecrease}
                                className="h-90p w-8 bg-slate-300 hover:cursor-pointer flex items-center justify-center">
                                    <p className="font-silkscreen text-2xl">-</p>
                                </div>  
                            </div>
                        </div>
                        <div className="h-full w-1/2 flex items-center ">
                            <div className="pl-12 pb-2 h-full w-85p flex items-center justify-evenly">
                                <div 
                                onClick={handleMinIncrease}
                                className="h-90p w-8 bg-slate-300 hover:cursor-pointer flex items-center justify-center">
                                    <p className="font-silkscreen text-2xl">+</p>
                                </div>
                                <div 
                                onClick={handleMinDecrease}
                                className="h-90p w-8 bg-slate-300 hover:cursor-pointer flex items-center justify-center">
                                    <p className="font-silkscreen text-2xl">-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="h-15p w-full m-4">
                <Button
                    onClick={handleSetTime}
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