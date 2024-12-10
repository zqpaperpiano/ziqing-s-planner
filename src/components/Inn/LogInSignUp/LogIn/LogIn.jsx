import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import {Mail, LockKeyhole } from 'lucide-react';
import Google from '../../../../images/google-plus.png';
import './LogIn.css';
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../../../config/authContext";
import { signUpWithGPopUp } from "../../../../config/firebase";
import { useNavigate } from "react-router-dom";
import config from '../../../../config/config.json'

const LogIn = ({ logGUser }) => {
    const [playerEmail, setPlayerEmail] = useState("");
    const [playerPassword, setPlayerPassword] = useState(""); 
    const { signIn, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

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

    const loginGoogle = async() => {
        const resp = await signUpWithGPopUp();
        const uid = resp.user.uid
        const email = resp.user.email;
        const displayName = resp.user.displayName;
        const respID = await resp.user.getIdToken();
        getUserInfo(respID, uid, email, displayName);
    }

    const getUserInfo = (token, uid, email, displayName) => {
        fetch(`${config.development}users/getUser`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                uid: uid,
                email: email,
                displayName: displayName
            })
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            signIn(data);
            return navigate('/')
        })
        .catch((err) => {
            console.log('an error has occured: ', err);
        })
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
                    signIn(data);
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
            <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                <div className="w-fit">
                    <div className="w-full flex flex-col header font-bold text-center p-2">
                        <h1>Welcome Back </h1>
                        <h1>Adventurer</h1>
                    </div>
                    <div 
                    onClick={logGUser}
                    className="h-10 w-full border border-black p-2 rounded-lg flex px-2 justify-between items-center hover:cursor-pointer hover:bg-sky-200">
                        <div 
                        className="h-full aspect-square">
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