import { Button } from "@mui/material";
import React, { useState } from "react";
import {Mail, LockKeyhole } from 'lucide-react';
import Github from '../../../../images/github.png';
import Facebook from '../../../../images/facebook-app-symbol.png';
import Google from '../../../../images/google-plus.png';
import './LogIn.css';
import { toast, ToastContainer } from "react-toastify";

const LogIn = ({ setUser }) => {
    const [playerEmail, setPlayerEmail] = useState("");
    const [playerPassword, setPlayerPassword] = useState("");

    const handleEmailInput = (e) => {
        setPlayerEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPlayerPassword(e.target.value);
    }  

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    const onClickSubmit = () => {
        if(!validateEmail(playerEmail)){
            toast.error("Please enter a valid email!");
        }else if(playerPassword.length === 0){
            toast.error("Please enter a password");
        }else{
            try{
                fetch('http://localhost:3001/users/log-in', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: playerEmail,
                        password: playerPassword
                    })
                })
                .then(resp => {
                    if(resp.status === 400 || resp.status === 404){
                        const err = new Error('Password and emails do not match!');
                        err.statusCode = 400;
                        throw err;
                    }
                    return resp.json();
                })
                .then(data => {
                    console.log('data: ', data);
                    setUser(data);
                    return data;
                })
                .catch(err => {
                    if(err.statusCode === 400){
                        toast.error("Password and emails do not match");
                    }
                })
            }catch(err){
                console.log('error:', err);
            }
        }
    }


    return(
        <div className="absolute h-full w-full flex left-0 rounded">
            <div className="h-full w-full flex flex-col items-center justify-evenly mt-4">
                <ToastContainer />
                <h1 className="header font-bold text-center">Welcome back,</h1>
                <div className="flex rainbow-wave">
                    <span className="font-bold text-center header">A</span>
                    <span className="font-bold text-center header">d</span>
                    <span className="font-bold text-center header">v</span>
                    <span className="font-bold text-center header">e</span>
                    <span className="font-bold text-center header">n</span>
                    <span className="font-bold text-center header">t</span>
                    <span className="font-bold text-center header">u</span>
                    <span className="font-bold text-center header">r</span>
                    <span className="font-bold text-center header">e</span>
                    <span className="font-bold text-center header">r</span>
                </div>
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
                <p className="my-0 h-6"> Or log in with your email </p>
                <div className="h-50p w-85p flex flex-col items-center">
                    <form>
                        <div className="h-8 mt-2 relative flex items-center">
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
                                onClick={() => {onClickSubmit()}}
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