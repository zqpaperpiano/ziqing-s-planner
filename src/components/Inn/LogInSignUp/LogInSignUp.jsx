import React, { useContext, useEffect, useState } from "react";
import './LogInSignUp.css';
import { Button, CircularProgress } from "@mui/material";
import SignUp from "./SignUp/SignUp";
import LogIn from "./LogIn/LogIn";
import { AuthContext } from "../../../contexts/authContext";
import { auth, signUpWithGPopUp } from "../../../config/firebase";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { redirect, useNavigate } from "react-router";
import config from '../../../config/config.json';
import { toast, ToastContainer } from "react-toastify";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";

const LogInSignUp = () => {
    const [onSignup, toggleOnSignUp] = useState(false);
    const { signIn, player } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(true);
    const [ logInLoading, setLogInLoading ] = useState(false);
    const navigate = useNavigate();

    const onToggleLogIn = () => {  
        if(onSignup){
            toggleOnSignUp(false);
        }else{
            toggleOnSignUp(true);
        }
    }

    useEffect(() => {
        if(player && !loading){
            navigate('/');
        }
    }, [])

    const toggleLogInLoading = (bool) => {
        setLogInLoading(bool);
    }
   
    const logGUser = async() => {
        try{
            await setPersistence(auth, browserLocalPersistence);

            const resp = await signUpWithGPopUp();
            const displayName = resp.user.displayName;
            const email = resp.user.email;
            const uid = resp.user.uid;
            const token = await resp.user.getIdToken();

            fetch(`${config.development.apiURL}users/googleUser`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    uid: uid,
                    email: email,
                    name: displayName,
                    token: token
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                signIn(data);
                // if(data.completedCalibration){
                    return navigate('/');
                // }
                // return navigate('/newPlayer');
            })
            .catch((err) => {
                console.log(err);
            })
        }catch(err){
            console.log(err);
        }
    }

    const emptyFields = () => {
        const toastId = 'login-signup-error-empty-fields';
        if(!toast.isActive(toastId)) toast.error('Please ensure all fields have been filled in!', {toastId});
    }

    const failedLogIn = () => {
        const toastId = 'login-signup-error-no-match'
        if(!toast.isActive(toastId)) toast.error('Email and password do not match. Please try again.', {toastId});
    }

    const tooManyLogins = () => {
        const toastId = 'login-signup-error-too-many-logins'
        if(!toast.isActive(toastId)) toast.warning('You have attempted to log in too many times. Please try again later', {toastId});
    }

    const invalidEmail = () => {
        const toastId = 'login-signup-error-invalid-email'
        if(!toast.isActive(toastId)) toast.error('Please enter a valid email.', {toastId});
    }

    const repeatedEmail = () => {
        const toastId = 'login-signup-error-repeated-email'
        if(!toast.isActive(toastId)) toast.error('There is an account associated with this email. Please log in instead.', {toastId});
    }

    const invalidPassword = () => {
        const toastId = 'login-signup-error-short-password'
        if(!toast.isActive(toastId)) toast.error('Please have at least 6 characters for your password', {toastId});
    }

    const successfulResetPassword = () => {
        const toastId = 'login-signup-alert-successful-rest'
        if(!toast.isActive(toastId)) toast.success('A password reset email has been sent to your email if you have an account with us.', {toastId});
    }

    const toggleLoading = (bool) => {
        setLoading(bool);
    }


    return(
        <div className="fixed inset-0 bg-gradient-to-b from-gradientStart via-gradientMid to-gradientEnd h-full w-full flex items-center justify-center">
            <div className="relative h-full w-3/4">
                <ToastContainer />
                <div id="LogInForm"
                    className={`h-full bg-bgPink  w-50p z-40 absolute top-0 left-0 bf:z-20 bf:transition-transform duration-500
                        ${onSignup ? 'translate-x-full z-0 opacity-0 pointer-event-none' : null}`}
                >
                    <LogIn loading={toggleLogInLoading} onSignUp={onSignup} logGUser={logGUser} failedLogin={failedLogIn} tooManylogins={tooManyLogins} successfulResetPassword={successfulResetPassword} emptyFields={emptyFields} invalidEmail={invalidEmail}/>
                </div>

                <div id="SignUpForm"
                    className={`bg-bgPink h-full w-50p absolute bg-bgPink top-0 left-0 bf:transition-transform duration-500
                        ${onSignup  ? "translate-x-full opacity-100 z-50" : "opacity-0 z-10"}`}
                >
                    <SignUp onSignUp={onSignup} logGUser={logGUser} invalidEmail={invalidEmail} invalidPassword={invalidPassword} repeatedEmail={repeatedEmail} emptyFields={emptyFields} setLoading={toggleLogInLoading}/>
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
            {
                logInLoading &&
                <LoadingScreen />
            }
        </div>
    );
}

export default LogInSignUp;