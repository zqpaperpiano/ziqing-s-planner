import { Button } from "@mui/material";
import React, { useState } from "react";
import { LockKeyhole, Mail, User } from 'lucide-react'
import Facebook from '../../../images/facebook-app-symbol.png';
import Google from '../../../images/google-plus.png';
import Github from '../../../images/github.png';
import Tick from '../../../images/check.png';
import Cross from '../../../images/close.png';
import { ToastContainer } from "react-toastify";

const SignUp  = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");


    const handleNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    const handleSubmitButton = () => {
        if(userName !== "" && userEmail !== "" && userPassword !== ""){
            if(userPassword.length >= 6){
                const userAcc = {
                    //userID is sequential given by postgres
                    "userEmail": userEmail,
                    "userName": userName,
                    "userPassword": userPassword
                }
                //post to database

                //log user in by passing user information back to state
            }else{
                console.log('insert toast error here');
            }
        }
    }



    return(
        <div className="absolute h-full w-full flex">
            <div className="h-full w-40p bg-deepPink rounded">
                    <h1 className="header font-2xl font-bold">Adventurer, you look familiar</h1>
                    <h3>Not your first time visiting the guild? </h3>
                    <Button> Sign in here </Button>
            </div>
            <div className="h-full w-60p flex flex-col items-center justify-center">
                <ToastContainer />
                <h1 className="header">Create Account</h1>
                <div className="mt-2 h-10 w-60 flex justify-evenly">
                    <div 
                    className="relative h-8 w-8 flex items-center justify-center rounded-full 
                        border border-black border-2 hover:cursor-pointer
                        ">
                        <img src={Facebook} className="absolute h-4"/>
                    </div>
                    <div className="relative h-8 w-8 flex items-center justify-center rounded-full
                     border border-black border-2 hover:cursor-pointer
                     ">
                        <img src={Google} className="absolute h-4"/>
                    </div>
                    <div className="relative h-8 w-8 flex items-center justify-center rounded-full 
                    border border-black border-2 hover:cursor-pointer
                    ">
                        <img src={Github} className="absolute h-4"/>
                    </div>

                </div>
                <p className="my-0 h-6"> Or use your email for registration </p>
                <div className="h-50p w-85p flex flex-col items-center">
                    <form>
                        <div className="h-8 mt-2 relative flex flex-row items-center">
                            <span className="absolute flex text-gray-400 pointer-events-none">
                                <User className="mr-2 ml-1"
                                />
                                Username
                                </span>
                            <input 
                            className="rounded h-full bg-darkPink focus:outline-rose-400"
                            type="text"
                            />
                        </div>
                        <div className="h-8 mt-2 relative flex items-center">
                            <span className="absolute flex text-gray-400 pointer-events-none">
                                <Mail 
                                    className="mr-2 ml-1"
                                /> 
                                Email
                                </span>
                            <input 
                            className="rounded h-full bg-darkPink focus:outline-rose-400"
                            type="email" />
                        </div>
                        <div className="mt-2 relative flex flex-col">
                            <div className="h-8 relative flex items-center">
                                <span className="absolute flex text-gray-400 pointer-events-none">
                                    <LockKeyhole className="mr-2 ml-1"
                                    />
                                    Password 
                                    </span> 
                                <input 
                                className="rounded h-full bg-darkPink focus:outline-rose-400"
                                type="password" />
                            </div>
                        </div>
                        
                        <div className="relative h-8 mt-2    flex items-center">
                            <span className="absolute flex text-gray-400 pointer-events-none">
                                <LockKeyhole className="mr-2 ml-1"
                                />
                                Confirm Password 
                                </span>
                            <input 
                            className="rounded h-full bg-darkPink focus:outline-rose-400" 
                            type="password" 
                            />
                        </div>
                        <Button> Sign Up </Button>

                    </form>
                </div>
            </div>


        </div>
    );
}

export default SignUp; 