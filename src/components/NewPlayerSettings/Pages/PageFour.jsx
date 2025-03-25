import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackArrow from "../../BackArrow/BackArrow";
import Money from '../../../images/money.png';
import { Button } from "@mui/material";

const PageFour = ({currPage, handleNextPage, handlePrevPage, setSalary, setHasSalary, setSalaryFrequency}) => {
    const [onSalary, setOnSalary] = useState(false);
    const [selected, setOnSelected] = useState("none");
    const [dateOfSalary, setDateOfSalary] = useState(null);
    const [salary, setSalaryAmt] = useState(0);

    const handleToggleSalary = () => {
        if(onSalary){
            setOnSalary(false);
        }else{
            setOnSalary(true);
        }
    }

    const handleSelectDay = (e) =>{
        setDateOfSalary(e.target.textContent);
    }

    const handleSelectMonth = (e) => {
        setDateOfSalary(e.target.value);
    }

    const onChangeSalary = (e) => {
        setSalaryAmt(e.target.value);
    }

    const handleSubmitButton = () => {
        setSalary(salary);
        setHasSalary(true);

        let freq = {};
        if(selected === "Weekly"){
            if(!isNaN(parseInt(dateOfSalary))){
                console.log('Please retry keying in the day of salary')
                return;
            }
            freq = {
                frequency: selected,
                day: dateOfSalary
            }
        }else if(selected === "Monthly"){
            const date = parseInt(dateOfSalary)

            if(isNaN(date)){
                console.log('An error has occured. Please try again')
                return;
            }else if(date > 31 || date < 1){
                console.log('Please key in a valid date');
                return;
            }

            freq = {
                frequency: selected,
                day: date
            }
        }else if(selected === "Daily"){
            freq = {
                frequency: selected,
                day: 'N/A'
            };
        }
        setSalaryFrequency(freq);
        handleNextPage();
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
                    ${onSalary && "opacity-0 pointer-events-none"}`}>
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
                                className="h-1/2 w-full flex items-center hover:cursor-pointer hover:bg-[#ffebde] hover:border-black hover:border-2">
                                    <p>Yes, let's talk about it. </p>
                                </div>
                                <div 
                                onClick={handleNextPage}
                                className="h-1/2 w-full flex items-center hover:cursor-pointer hover:bg-[#ffebde] hover:border-black hover:border-2">
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

                        <div className="relative h-full w-full flex ">
                            <div className="h-full w-full flex flex-col items-center justify-center font-silkscreen text-2xl">
                                <p>I will be receiving: </p>

                                <div className="w-full h-10p flex justify-center items-center">
                                    <div className="h-full pr-4">
                                        <img 
                                        className="h-full w-full object-scale-down"
                                        src={Money} />
                                    </div>
                                    <div className="h-full w-1/5 border border-yellow-900 border-2 rounded bg-[#ffcdac]">
                                        <input 
                                            value={salary}
                                            onChange={onChangeSalary}
                                            type="number"
                                            className="h-full w-full outline-none border-none bg-[#ffcdac] text-center text-3xl"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col h-1/5 items-center mt-2">
                                    <p>Every</p>

                                    <div className="h-10p w-full grid grid-cols-3">
                                        <div id="freq-day" 
                                        onClick={handleSelectionDaliy}
                                        className={`h-full w-full hover:cursor-pointer hover:border-yellow-400 hover:border-r-2 
                                        flex justify-center border border-yellow-900 border-2 border-r-0 bg-[#ffcdac] ${selected === "Daily" ? "border-yellow-600 bg-[#ffebde]" : null}`}>
                                            <p>Day</p>
                                        </div>
                                        <div 
                                        onClick={handleSelectionWeekly}
                                        className={`h-full w-full hover:cursor-pointer hover:border-yellow-400 hover:border-r-2 
                                        flex justify-center border border-yellow-900 border-2 border-r-0 bg-[#ffcdac] ${selected === "Weekly" ? "border-yellow-600 bg-[#ffebde]" : null}`}>
                                            <p>Week</p>
                                        </div>
                                        <div 
                                        onClick={handleSelectionMonthly}
                                        className={`h-full w-full hover:cursor-pointer hover:border-yellow-400 
                                        flex justify-center border border-yellow-900 border-2 bg-[#ffcdac] ${selected === "Monthly" ? "border-yellow-600 bg-[#ffebde]" : null}`}>
                                            <p>Month</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center select-none">
                                    <p>Every</p>
                                    {
                                        selected === "Weekly" &&
                                            <div className="h-fit w-full grid grid-cols-7 bg-[#ffcdac]">
                                                <div 
                                                onClick={handleSelectDay}
                                                className={`p-1 border-yellow-900 border-2 h-full w-full flex justify-center items-center 
                                                hover:cursor-poiner hover:bg-[#ffebde]
                                                ${dateOfSalary === "Mon" ? "bg-[#ffebde]" : null }`}>
                                                    Mon
                                                </div>
                                                <div 
                                                onClick={handleSelectDay}
                                                className={`p-1 border-yellow-900 border-2 border-l-0 h-full w-full flex justify-center items-center 
                                                hover:cursor-poiner hover:bg-[#ffebde]
                                                ${dateOfSalary === "Tue" ? "bg-[#ffebde]" : null }`}>
                                                    Tue
                                                </div>
                                                <div 
                                                onClick={handleSelectDay}
                                                className={`p-1 border-yellow-900 border-2 border-l-0 h-full w-full flex justify-center items-center 
                                                hover:cursor-poiner hover:bg-[#ffebde]
                                                ${dateOfSalary === "Wed" ? "bg-[#ffebde]" : null }`}>
                                                    Wed
                                                </div>
                                                <div 
                                                onClick={handleSelectDay}
                                                className={`p-1 border-yellow-900 border-2 border-l-0 h-full w-full flex justify-center items-center 
                                                hover:cursor-poiner hover:bg-[#ffebde]
                                                ${dateOfSalary === "Thu" ? "bg-[#ffebde]" : null }`}>
                                                    Thu
                                                </div>
                                                <div 
                                                onClick={handleSelectDay}
                                                className={`p-1 border-yellow-900 border-2 border-l-0 h-full w-full flex justify-center items-center 
                                                hover:cursor-poiner hover:bg-[#ffebde]
                                                ${dateOfSalary === "Fri" ? "bg-[#ffebde]" : null }`}>
                                                    Fri
                                                </div>
                                                <div 
                                                onClick={handleSelectDay}
                                                className={`p-1 border-yellow-900 border-2 border-l-0 h-full w-full flex justify-center items-center 
                                                hover:cursor-poiner hover:bg-[#ffebde]
                                                ${dateOfSalary === "Sat" ? "bg-[#ffebde]" : null }`}>
                                                    Sat
                                                </div>
                                                <div 
                                                onClick={handleSelectDay}
                                                className={`p-1 border-yellow-900 border-2 border-l-0 h-full w-full flex justify-center items-center 
                                                hover:cursor-poiner hover:bg-[#ffebde]
                                                ${dateOfSalary === "Sun" ? "bg-[#ffebde]" : null }`}>
                                                    Sun
                                                </div>
                                            </div>
                                    }
                                    {
                                        selected === "Monthly" &&
                                            <div className="h-full w-full bg-bgBrown flex items-center justify-center border-yellow-900 border-2">
                                                <input 
                                                    onChange={handleSelectMonth}
                                                    className="h-full w-24 outline-none border-none bg-[#ffcdac] text-center text-3xl"
                                                    type="number"
                                                    placeholder="1-31"
                                                />
                                            </div>
                                    }
                                </div>

                                <div className="absolute bottom-10 flex justify-center items-center">
                                    <Button
                                        onClick={handleSubmitButton}
                                        sx={{
                                            fontFamily: "silkscreen",
                                            backgroundColor: "red",
                                            color: "white"
                                        }}
                                        variant="outlined">
                                        Next
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