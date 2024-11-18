import React, { useState, useEffect } from "react";
import './NewPlayerSettings.css';
import PageOne from "./Pages/PageOne";
import PageTwo from "./Pages/PageTwo";
import PageThree from "./Pages/PageThree";
import PageFour from "./Pages/PageFour";
import PageFive from "./Pages/PageFive";
import { useNavigate } from "react-router";


const NewPlayerSettings = () => {
    const [currPage, setCurrPage] = useState(1);

    const navigate = useNavigate();

    const handleNextPage = () => {
        // setTransition(true);
        setCurrPage((prevVal) => prevVal +1)
    }

    const handlePrevPage = () => {
        console.log(currPage);
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
                    <PageThree currPage={currPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage}/>
                    <PageFour currPage={currPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage}/>
                    <PageFive handlePrevPage={handlePrevPage} handleNextPage={handleExitNPS}/>
                </div>

                    
            </div>


        </div>
    );
}

export default NewPlayerSettings;