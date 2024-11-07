import React, { useEffect, useState } from "react";
import './LogInSignUp.css';
import { Button } from "@mui/material";
import SignUp from "./SignUp/SignUp";

const LogInSignUp = () => {
    const [onSignup, toggleOnSignUp] = useState(false);

    console.log(onSignup);  

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
            <Button className="absolute z-50"onClick={() => {onClickToLogIn()}}>hello</Button>
            <div id="LogInForm"
                className={`h-full w-50p absolute top-0 left-0 z-20 transition-transform duration-500
                    ${onSignup ? 'translate-x-full' : null}`}
            >
                <p>Log In</p>
            </div>

            <div id="SignUpForm"
                className={`h-full w-50p absolute bg-bgPink top-0 left-0 transition-transform duration-500
                    ${onSignup  ? "translate-x-full opacity-100 z-30" : "opacity-0 z-10"}`}
            >
                <SignUp />
            </div>

            <div id="overlay-container"
                className={`h-full w-50p z-50 top-0 left-1/2 absolute overflow-hidden
                        transition-transform duration-500 ${onSignup ? '-translate-x-full' : 'translate-x-0'}`}
            >
                <div id="ovelay-bg"
                    className={`bg-deepPink relative -left-full h-full w-2x 
                    ${onSignup ? 'translate-x-1/2' : 'translate-x-0'}`}>
                            <div id="left-overlay"
                            className={`absolute flex items-center justify-center h-full w-1/2 
                                transition-transform duration-500 ${onSignup ? "-translate-x-20p" : "translate-x-0"}`}>
                                    <Button onClick={() => {onClickToLogIn()}}> Go to log in! </Button>
                            </div>
                            <div id="right-overlay"
                                className={`absolute right-0 flex items-center justify-center h-full w-1/2
                                    transition-transform duration-500 ${onSignup ? "translate-x-20p" : null}
                                    `}>
                                        <Button onClick={() => {onClickToLogIn()}}>Go to Register</Button>
                            </div>
                        </div>
            </div>

        </div>
    );
}

export default LogInSignUp;