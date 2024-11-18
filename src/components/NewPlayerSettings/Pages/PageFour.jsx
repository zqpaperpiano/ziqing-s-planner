import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackArrow from "../../BackArrow/BackArrow";
import Money from '../../../images/money.png';
import { Button } from "@mui/material";

const PageFour = ({currPage, handleNextPage, handlePrevPage}) => {
    const [onSalary, setOnSalary] = useState(false);
    const [selected, setOnSelected] = useState("none");

    const handleToggleSalary = () => {
        if(onSalary){
            setOnSalary(false);
        }else{
            setOnSalary(true);
        }
    }

    const handleSelectionDaliy = () => {
        setOnSelected("Daily");
    }

    const handleSelectionWeekly = () => {
        setOnSelected("Weekly");
    }

    const handleSelectionMonthly = () => {
        setOnSelected("Monthly");
    }

    return(
        <div className="h-full w-1/5 backgrounds whitespace-pre-line">
            <div className="h-full w-full relative font-silkscreen text-2xl flex flex-col items-center justify-center">
                {
                    currPage === 4 &&
                    <div className={`h-full w-full absolute flex flex-col justify-center items-center
                    ${onSalary ? "opacity-0 z-10" : "opacity-1 z-50"}`}>
                        <BackArrow  handleClickedBack={handlePrevPage}/>

                        <div className="absolute text-center">
                            <ReactTyped
                                
                                backSpeed={0}
                                typeSpeed={25}
                                strings={[`
                                        Very well.\n Lastly, will you be receiving regular compensation from the guild?
                                    `]}
                            />
                        </div>


                        <div className="absolute bottom-8 h-1/3 w-2/3 bg-[#ffcdac] text-xl flex flex-col gap-4 justify-center p-4 border border-yellow-900 border-2">
                            <div className="flex flex-col h-full w-full items-center justify-center">
                                <div 
                                onClick={handleToggleSalary}
                                className="h-1/2 w-full flex items-center hover:cursor-pointer hover:border-black hover:border-2">
                                    <p>Yes, let's talk about it. </p>
                                </div>
                                <div 
                                onClick={handleNextPage}
                                className="h-1/2 w-full flex items-center hover:cursor-pointer hover:border-black hover:border-2">
                                    <p>Not for now. We can discuss this another time.  </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    onSalary && 
                    <div className={`h-full w-full ${onSalary ? "opacity-1 z-50" : "opacity-0 z-30"}`}>
                        <BackArrow handleClickedBack={handleToggleSalary} />

                        <div className="relative h-full w-full flex items-center justify-center">
                            <div className="h-full w-full flex flex-col items-center justify-center font-silkscreen text-2xl pb-8">
                                <p>I will be receiving: </p>

                                <div className="w-full h-10p flex justify-center items-center">
                                    <div className="h-full pr-4">
                                        <img 
                                        className="h-full w-full object-scale-down"
                                        src={Money} />
                                    </div>
                                    <div className="h-full w-1/5 border border-yellow-900 border-2 rounded bg-[#ffcdac]">
                                        <input 
                                            type="number"
                                            className="h-full w-full outline-none border-none bg-[#ffcdac] text-center text-3xl "
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center">
                                    <p>Every</p>

                                    <div className="h-10p w-full grid grid-cols-3 pt-2">
                                        <div id="freq-day" 
                                        onClick={handleSelectionDaliy}
                                        className={`h-full w-full hover:cursor-pointer hover:border-yellow-400 hover:border-r-2 
                                        flex justify-center border border-yellow-900 border-2 border-r-0 bg-[#ffcdac] ${selected === "Daily" ? "border-yellow-400" : null}`}>
                                            <p>Day</p>
                                        </div>
                                        <div 
                                        onClick={handleSelectionWeekly}
                                        className={`h-full w-full hover:cursor-pointer hover:border-yellow-400 hover:border-r-2 
                                        flex justify-center border border-yellow-900 border-2 border-r-0 bg-[#ffcdac] ${selected === "Weekly" ? "border-yellow-400" : null}`}>
                                            <p>Week</p>
                                        </div>
                                        <div 
                                        onClick={handleSelectionMonthly}
                                        className={`h-full w-full hover:cursor-pointer hover:border-yellow-400 
                                        flex justify-center border border-yellow-900 border-2 bg-[#ffcdac] ${selected === "Monthly" ? "border-yellow-400" : null}`}>
                                            <p>Month</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-10 flex justify-center items-center">
                                    <Button
                                        onClick={handleNextPage}
                                        sx={{
                                            fontFamily: "silkscreen",
                                            backgroundColor: "red",
                                            color: "white"
                                        }}
                                        variant="outlined">
                                        Confirm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default PageFour; 