import React, { useState, useEffect } from "react";
import './NewPlayerSettings.css';
import PageOne from "./Pages/PageOne";
import PageTwo from "./Pages/PageTwo";
import PageThree from "./Pages/PageThree";
import PageFour from "./Pages/PageFour";
import PageFive from "./Pages/PageFive";
import { useNavigate } from "react-router";


const NewPlayerSettings = ({ player }) => {
    const [currPage, setCurrPage] = useState(1);
    const [schedule, setSchedule] = useState([]);
    const [hasSchedule, setHasSchedule] = useState(false);
    const [salary, setSalary] = useState(0);
    const [hasSalary, setHasSalary] = useState(false);
    const [salaryFrequency, setSalaryFrequency] = useState(null);
    const [displayName, setDisplayName] = useState(player.displayName);

    const handleSetSchedule = (schedule) => {
        setSchedule(schedule);
    }

    const handleSetHasSchedule = (val) => {
        setHasSchedule(val);
    }

    const handleSetSalary = (amt) => {
        setSalary(amt);
    }

    const handleSetHasSalary = (val) => {
        setHasSalary(val);
    }

    const handleSetSalaryFrequency = (freq) => {
        setSalaryFrequency(freq);
    }

    const navigate = useNavigate();

    const handleNextPage = () => {
        setCurrPage((prevVal) => prevVal +1)
    }

    const handlePrevPage = () => {
        setCurrPage((prevVal) => prevVal - 1);
    }

    const handleExitNPS = () => {
        navigate('/');
    }


    return(
        <div className="bg-black fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items align">
            <div className="h-5/6 w-5/6 bg-white my-auto overflow-hidden ">
                <div className={`h-full w-5x flex transition-transform duration-700 
                    ${currPage === 1 && "translate-x-0"}
                    ${currPage === 2 && "-translate-x-20p"}
                    ${currPage === 3 && "-translate-x-40p"}
                    ${currPage === 4 && "-translate-x-60p"}
                    ${currPage === 5 && "-translate-x-80p"}
                    `}>
                    <PageOne handleNextPage={handleNextPage}/>
                    <PageTwo currPage={currPage} handleNextPage={handleNextPage}/>
                    <PageThree currPage={currPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} setHasSchedule={handleSetHasSchedule} handleSetSchedule={handleSetSchedule}/>
                    <PageFour 
                        currPage={currPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage}
                        setHasSalary={handleSetHasSalary} setSalary={handleSetSalary} setSalaryFrequency={handleSetSalaryFrequency}
                        />
                    <PageFive handlePrevPage={handlePrevPage} handleNextPage={handleExitNPS}/>
                </div>

                    
            </div>


        </div>
    );
}

export default NewPlayerSettings;