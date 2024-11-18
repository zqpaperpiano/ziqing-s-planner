import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LockKeyhole, Mail, User } from 'lucide-react'
import Facebook from '../../../../images/facebook-app-symbol.png';
import Google from '../../../../images/google-plus.png';
import Github from '../../../../images/github.png';
import { ToastContainer } from "react-toastify";
import NewPlayerSettings from "../../../NewPlayerSettings/NewPlayerSettings";
import { useNavigate } from "react-router";

const SignUp  = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const navigate = useNavigate();

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
                //upon successful posting
                navigate("/newPlayer");

                //log user in by passing user information back to state
            }else{
                console.log('insert toast error here');
            }
        }
    }



    return(
        <div className="absolute h-full w-full flex right-0 rounded">
            <div className="h-full w-full flex flex-col items-center justify-center">
                <ToastContainer />
                <h1 className="header font-bold text-center">Create Account</h1>
                <div className="mt-2 h-10 w-60 flex justify-evenly">
                    <div 
                    className="relative h-8 w-8 flex items-center justify-center rounded-full 
                        border border-black border-2 hover:cursor-pointer hover:scale-105
                        ">
                        <img src={Facebook} className="absolute h-4"/>
                    </div>
                    <div className="relative h-8 w-8 flex items-center justify-center rounded-full
                     border border-black border-2 hover:cursor-pointer hover:scale-105
                     ">
                        <img src={Google} className="absolute h-4"/>
                    </div>
                    <div className="relative h-8 w-8 flex items-center justify-center rounded-full 
                    border border-black border-2 hover:cursor-pointer hover:scale-105
                    ">
                        <img src={Github} className="absolute h-4"/>
                    </div>

                </div>
                <p className="my-0 h-6 text-center mb-2 bs:b-0"> Or use your email for registration </p>
                <div className="h-50p w-85p flex flex-col items-center">
                    <form>
                        <div className="h-8 mt-2 relative flex flex-row items-center">
                            {
                                !userName &&
                                <span className="absolute flex text-gray-400 pointer-events-none">
                                    <User className="mr-2 ml-1"
                                    />
                                    Username
                                </span>
                            }
                            <input 
                            onChange={(e) => {handleNameChange(e)}}
                            value={userName}
                            className="rounded h-full bg-darkPink focus:outline-rose-400 p-2"
                            type="text"
                            />
                        </div>
                        <div className="h-8 mt-2 relative flex items-center">
                            {
                                !userEmail &&
                                <span className="absolute flex text-gray-400 pointer-events-none">
                                    <Mail 
                                        className="mr-2 ml-1"
                                    /> 
                                    Email
                                </span>
                            }
                            <input 
                            onChange={(e) => {handleEmailChange(e)}}
                            value={userEmail}
                            className="rounded h-full bg-darkPink focus:outline-rose-400 p-2"
                            type="email" />
                        </div>
                        <div className="mt-2 relative flex flex-col">
                            <div className="h-8 relative flex items-center">
                                {
                                    !userPassword &&
                                    <span className="absolute flex text-gray-400 pointer-events-none">
                                        <LockKeyhole className="mr-2 ml-1"
                                        />
                                        Password 
                                    </span> 
                                }
                                <input 
                                onChange={(e) => {handlePasswordChange(e)}}
                                value={userPassword}
                                className="rounded h-full bg-darkPink focus:outline-rose-400 p-2"
                                type="password" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <Button
                                onClick={handleSubmitButton}
                                className="hover:cursor-pointer"
                                sx={{color: 'deepPink', borderColor: 'deepPink'}}
                                variant="outlined"
                            > Sign Up </Button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp; 