import { Button } from "@mui/material";
import React, { useState } from "react";
import {Mail, LockKeyhole } from 'lucide-react';
import Github from '../../../../images/github.png';
import Facebook from '../../../../images/facebook-app-symbol.png';
import Google from '../../../../images/google-plus.png';
import './LogIn.css';

const LogIn = () => {
    const [playerEmail, setPlayerEmail] = useState("");
    const [playerPassword, setPlayerPassword] = useState("");

    const handleEmailInput = (e) => {
        setPlayerEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPlayerPassword(e.target.value);
    }   


    return(
        <div className="absolute h-full w-full flex left-0 rounded">
            <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                <div className="w-fit">
                    <div className="w-full flex flex-col header font-bold text-center p-2">
                        <h1>Welcome Back </h1>
                        <h1>Adventurer</h1>
                    </div>
                    <div className="h-10 w-full border border-black p-2 rounded-lg flex px-2 justify-between items-center hover:cursor-pointer hover:bg-sky-200">
                        <div className="h-full aspect-square">
                            <img src={Google} className="h-full w-full cover-fit" />
                        </div>
                        <p className="text-sm font-bold">Continue with Google</p>
                    </div>
                </div>  
                <p className="my-0 h-6"> Or log in with your email </p>
                <div className="h-50p w-85p flex flex-col items-center">
                    <form>
                        <div className="h-8 relative flex items-center">
                            {
                                !playerEmail &&
                                <span className="absolute flex text-gray-400 pointer-events-none">
                                    <Mail 
                                        className="mr-2 ml-1"
                                    /> 
                                    Email
                                </span>
                            }
                            <input 
                            onChange={(e) => {handleEmailInput(e)}}
                            value={playerEmail}
                            className="rounded h-full bg-darkPink focus:outline-rose-400 p-2"
                            type="email" />
                        </div>
                        <div className="mt-2 relative flex flex-col">
                            <div className="h-8 relative flex items-center">
                                {
                                    !playerPassword &&
                                    <span className="absolute flex text-gray-400 pointer-events-none">
                                        <LockKeyhole className="mr-2 ml-1"
                                        />
                                        Password 
                                    </span> 
                                }
                                <input 
                                onChange={(e) => {handlePasswordInput(e)}}
                                value={playerPassword}
                                className="rounded h-full bg-darkPink focus:outline-rose-400 p-2"
                                type="password" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <Button
                                className="hover:cursor-pointer"
                                sx={{color: 'deepPink', borderColor: 'deepPink'}}
                                variant="outlined"
                            > Log in </Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;