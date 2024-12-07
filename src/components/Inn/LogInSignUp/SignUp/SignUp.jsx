import { Button } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { LockKeyhole, Mail, User } from 'lucide-react'
import Facebook from '../../../../images/facebook-app-symbol.png';
import Google from '../../../../images/google-plus.png';
import Github from '../../../../images/github.png';
import { ToastContainer, toast } from "react-toastify";
import { redirect, useNavigate } from "react-router";
import { auth, signUpWEmail, signUpWithGPopUp } from "../../../../config/firebase";
import { AuthContext } from "../../../../config/authContext";
import { browserLocalPersistence, setPersistence } from "firebase/auth";

const SignUp  = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();

    const verifyUserToken = (token) => {
        fetch('http://localhost:3001/users/new-user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email: userEmail,
                name: userName
            })
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            signIn(data);
            setUserEmail("");
            setUserPassword("");
            setUserName("");
            return navigate('/newPlayer');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const logGUser = async () => {
        const resp = await signUpWithGPopUp();
        const respID = await resp.user.getIdToken();
        verifyUserToken(respID);
    }

    const logEmailUser = async () => {
        try{
            await setPersistence(auth, browserLocalPersistence);

            const resp = await signUpWEmail(userEmail, userPassword);
            const respID = await resp.user.getIdToken();
            verifyUserToken(respID);
            
        }catch(err){
            if(err.code === "auth/email-already-in-use"){
                console.log('Email already exists!');
            }else{
                console.log(err);
            }
        }
    }

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const handleSubmitButton = () => {
        if(userName !== "" && userEmail !== "" && userPassword !== ""){
            if(!validateEmail(userEmail)){
                toast.error('Please key in a valid email');
            }else if(userPassword.length >= 6){
                //post to database
                //upon successful posting

                logEmailUser(userEmail, userPassword);
            
            }else{
                toast.error('Your password needs a minimum of 6 letters')
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
                    <div 
                    onClick={logGUser}
                    className="relative h-8 w-8 flex items-center justify-center rounded-full
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
                                onClick={logEmailUser}
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