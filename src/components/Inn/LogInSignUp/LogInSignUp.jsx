import React, { useEffect, useState } from "react";
import './LogInSignUp.css';
import { Button } from "@mui/material";
import SignUp from "./SignUp/SignUp";
import LogIn from "./LogIn/LogIn";

const LogInSignUp = ({ setUser }) => {
    const [onSignup, toggleOnSignUp] = useState(false);

    const onClickToSignup = () => {
        toggleOnSignUp(true);
    }

    const onClickToLogIn = () => {  
        toggleOnSignUp(false)
    }

    


    return(
        <div className="relative h-full w-full">
            <div id="LogInForm"
                className={`bg-bgPink   h-full w-50p absolute top-0 left-0 z-20 transition-transform duration-500
                    ${onSignup ? 'translate-x-full' : null}`}
            >
                <LogIn setUser={setUser}/>
            </div>

            <div id="SignUpForm"
                className={`bg-bgPink h-full w-50p absolute bg-bgPink top-0 left-0 transition-transform duration-500
                    ${onSignup  ? "translate-x-full opacity-100 z-30" : "opacity-0 z-10"}`}
            >
                <SignUp setUser={setUser} />
            </div>

            <div id="overlay-container"
                className={`h-full w-50p z-50 top-0 left-1/2 absolute overflow-hidden
                        transition-transform duration-500 ${onSignup ? '-translate-x-full' : 'translate-x-0'}`}
            >
                <div id="ovelay-bg"
                    className={`bg-gradient-to-r from-[#A0557A] to-[#D48BA3] relative -left-full h-full w-2x 
                    ${onSignup ? 'translate-x-1/2' : 'translate-x-0'}`}>
                            <div id="left-overlay"
                            className={`absolute flex flex-col items-center justify-center h-full w-1/2 
                                transition-transform duration-500 ${onSignup ? "-translate-x-0" : "-translate-x-20"}`}>
                                    <h1 className="font-bold text-3xl">Have we met before?</h1>
                                    <p className="text-s">Not your first time in the guild?</p>
                                    <Button 
                                    sx={{color: 'lightPink', borderColor: 'lightPink'}}
                                    variant="outlined"
                                    onClick={() => {onClickToLogIn()}}> Go to log in! </Button>
                            </div>
                            <div id="right-overlay"
                                className={`absolute right-0 flex flex-col items-center justify-center h-full w-1/2
                                    transition-transform duration-500 ${onSignup ? "translate-x-20" : "translate-x-0"}
                                    `}>
                                        <h1 className="font-bold text-3xl">First time here?</h1>
                                        <p className="text-s text-center">Let's register you into our guild before you enter!</p>
                                        <div className="mt-2">
                                        <Button 
                                    sx={{color: 'lightPink', borderColor: 'lightPink'}}
                                    variant="outlined"
                                    onClick={() => {onClickToSignup()}}> Go to Sign Up! </Button>
                                        </div>
                            </div>
                        </div>
            </div>

        </div>
    );
}

export default LogInSignUp;