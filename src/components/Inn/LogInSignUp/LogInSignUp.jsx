import React, { useContext, useEffect, useState } from "react";
import './LogInSignUp.css';
import { Button } from "@mui/material";
import SignUp from "./SignUp/SignUp";
import LogIn from "./LogIn/LogIn";
import { AuthContext } from "../../../config/authContext";
import { auth, signUpWEmail, signUpWithGPopUp } from "../../../config/firebase";
import { redirect, useNavigate } from "react-router";
import config from '../../../config/config.json';

const LogInSignUp = () => {
    const [onSignup, toggleOnSignUp] = useState(false);
    const { signIn, player } = useContext(AuthContext);
    const navigate = useNavigate();

    const onToggleLogIn = () => {  
        if(onSignup){
            toggleOnSignUp(false);
        }else{
            toggleOnSignUp(true);
        }
    }

   
    const logGUser = async() => {
        try{
            const resp = await signUpWithGPopUp();
            const displayName = resp.user.displayName;
            const email = resp.user.email;
            const uid = resp.user.uid;
            const respID = await resp.user.getIdToken();

            fetch(`${config.development}users/googleUser`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${respID}`
                },
                body: JSON.stringify({
                    uid: uid,
                    email: email,
                    name: displayName
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                signIn(data);
                if(data.completedCalibration){
                    return navigate('/');
                }
                return navigate('/newPlayer');
            })
            .catch((err) => {
                console.log(err);
            })
        }catch(err){
            console.log(err);
        }
    }


    return(
        <div className="relative h-full w-full">
            <div id="LogInForm"
                className={`h-full bg-bgPink  w-50p z-40 absolute top-0 left-0 bf:z-20 bf:transition-transform duration-500
                    ${onSignup ? 'translate-x-full z-0 opacity-0 pointer-event-none' : null}`}
            >
                <LogIn logGUser={logGUser}/>
            </div>

            <div id="SignUpForm"
                className={`bg-bgPink h-full w-50p absolute bg-bgPink top-0 left-0 bf:transition-transform duration-500
                    ${onSignup  ? "translate-x-full opacity-100 z-50" : "opacity-0 z-10"}`}
            >
                <SignUp logGUser={logGUser}/>
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
                                    <h1 className="font-bold text-3xl text-center">Have we met before?</h1>
                                    <p className="text-s text-center">Not your first time in the guild?</p>
                                    <Button 
                                    sx={{color: 'lightPink', borderColor: 'lightPink'}}
                                    variant="outlined"
                                    onClick={() => {onToggleLogIn()}}> Go to log in! </Button>
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
                                    onClick={() => {onToggleLogIn()}}> Go to Sign Up! </Button>
                                        </div>
                            </div>
                        </div>
            </div>

        </div>
    );
}

export default LogInSignUp;