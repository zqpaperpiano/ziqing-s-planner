import React, { useEffect, useState } from "react";
import './LogInSignUp.css';
import { Button } from "@mui/material";
import SignUp from "./SignUp/SignUp";

const LogInSignUp = () => {
    const [onSignup, toggleOnSignUp] = useState(true);

    const onClickToSignup = () => {
        toggleOnSignUp(true);
    }

    const onClickToLogIn = () => {  
        if(onSignup){
            toggleOnSignUp(false);
        }else{
            toggleOnSignUp(true);
        }
    }

    return(
        <div className="relative h-full w-full">
            <Button className="absolute top-0 right-0 z-50" onClick={() => {onClickToLogIn()}}>hello</Button>
            <div className={`h-full w-50p absolute left-0 top-0 bg-deepPink z-40
            
                `}>
            </div>

            <div className={`absolute top-0 right-0 z-30 bg-black h-full w-50p
            `}></div>

        </div>
    );
}

export default LogInSignUp;