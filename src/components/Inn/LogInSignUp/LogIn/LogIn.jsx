import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {Mail, LockKeyhole } from 'lucide-react';
import Google from '../../../../images/google-plus.png';
import './LogIn.css';
import { AuthContext } from "../../../../config/authContext";
import { auth } from "../../../../config/firebase";
import { useNavigate } from "react-router-dom";
import config from '../../../../config/config.json'
import { browserLocalPersistence,sendPasswordResetEmail,  setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const LogIn = ({ onSignUp, logGUser, emptyFields, failedLogin, invalidEmail, tooManylogins, successfulResetPassword }) => {
    const [playerEmail, setPlayerEmail] = useState("");
    const [playerPassword, setPlayerPassword] = useState(""); 
    const [resetPassword, setResetPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const { signIn} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
            const handleKeyPress = (event) => {
                if (event.key === 'Enter' && !onSignUp){
                    emailUserLogin();
                }
            };
    
            window.addEventListener('keydown', handleKeyPress);
    
            return () => {
                window.removeEventListener('keydown', handleKeyPress);
            }
    }, [onSignUp, playerEmail, playerPassword])

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

    const emailUserLogin = async () => {
        try{
            console.log('on press enter: ', playerEmail, playerPassword);
            if(playerPassword.length <= 0 || playerEmail.length <= 0){
                console.log('here in log in')
                emptyFields();
            }else if(!validateEmail(playerEmail)){
                invalidEmail();
            }else{
                await setPersistence(auth, browserLocalPersistence);

                const resp = await signInWithEmailAndPassword(auth, playerEmail, playerPassword);
                const respID = await resp.user.getIdToken();
                const uid = resp.user.uid;

                verifyUserLogin(respID, uid);
            }

        }catch(err){
            if(err.code === 'auth/invalid-credential'){
                failedLogin();
            }else if(err.code === 'auth/too-many-requests'){
                tooManylogins();
            }else{
                console.log(err);
            }
            
        }
    }
    
    const verifyUserLogin = (token, uid) => {
        fetch(`${config.development.apiURL}users/log-in`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                uid: uid
            })
        })
        .then( async (res) => {
            if(res.status !== 200){
                const errorTxt = await res.text();
                throw new Error(`Error ${res.status}: ${errorTxt}`)
            }
            return res.json();
        })
        .then((data) => {
            console.log('data received: ', data);
            signIn(data);
            setPlayerEmail("");
            setPlayerPassword('');
            if(data.completedCalibration){
                return navigate('/');
            }
            return navigate('/newPlayer');
            
        })
        .catch((err) => {
            console.log('Failed. ', err);
        })
    }

    const sendResetEmail = () => {
        if(validateEmail(resetEmail)){
            sendPasswordResetEmail(auth, resetEmail)
            .then(() => {
                setResetEmail('');
                successfulResetPassword()
            })
            .catch((err) => {
                console.log(err);
            })
        }else{
            invalidEmail();
        }
    }


    return(
        <div className="absolute h-full w-full flex left-0 rounded"> 
        <div className="fixed inset-0">
        </div>
        
            <div className="h-full w-full">  
                {
                    resetPassword?
                    <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                        
                        <div className="w-full flex header font-bold text-center justify-center items-center">
                            <p>Reset your password here</p>
                        </div>
                        <div className="h-fit w-full flex flex-col items-center justify-center">
                            <p>Please key in your email address here</p>
                            <input
                                value={resetEmail}
                                onChange={(e) => {setResetEmail(e.target.value)}}
                                className="rounded h-full bg-darkPink focus:outline-rose-400 p-2 w-2/3 text-center"
                                />
                        </div>
                        <Button
                        onClick={sendResetEmail}
                        sx={{color: 'deepPink', borderColor: 'deepPink'}}
                        variant="outlined">
                            Reset password
                        </Button>
                        <p 
                        onClick={() => {setResetPassword(false)}}
                        className="text-center underline hover:cursor-pointer hover:text-slate-500">Return to Log in</p>
                    </div> :
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
                            <div 
                            onClick={() => {setResetPassword(true)}}
                            className="h-8 w-fit text-center p-2 hover:cursor-pointer underline text-slate-500 hover:text-slate-300">
                                <p>Forgot your password?</p>
                            </div>
                            <div className="flex items-center justify-center mt-4">
                                <Button
                                    onClick={emailUserLogin}
                                    className="hover:cursor-pointer"
                                    sx={{color: 'deepPink', borderColor: 'deepPink'}}
                                    variant="outlined"
                                > Log in </Button>
                            </div>

                        </form>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default LogIn;