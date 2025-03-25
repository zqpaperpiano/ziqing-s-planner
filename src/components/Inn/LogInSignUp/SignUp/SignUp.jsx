import { Button } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { LockKeyhole, Mail, User } from 'lucide-react'
import Google from '../../../../images/google-plus.png';
import { useNavigate } from "react-router";
import { AuthContext } from "../../../../contexts/authContext";
import { browserLocalPersistence, deleteUser, setPersistence } from "firebase/auth";
import config from '../../../../config/config.json';
import { auth, signUpWEmail, signUpWithGPopUp } from "../../../../config/firebase";
import { toast, ToastContainer } from "react-toastify";

const SignUp  = ({onSignUp, logGUser, invalidEmail, emptyFields, repeatedEmail, invalidPassword, setLoading}) => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' && onSignUp){
                handleSubmitButton();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [onSignUp, userName, userEmail, userPassword])

    


    const verifyUserToken = (token, email, name) => {
        setLoading(true);
        fetch(`${config.development.apiURL}users/new-user`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                token: token
            })
        })
        .then(async (res) => {
            if(res.status !== 201){
                const errTxt = await res.text();

                //rollback
                if(auth.currentUser){
                    
                    await deleteUser(auth.currentUser)
                    .then(() => {
                        toast.error('An error has occured. Please try again or contact an administrator if the issue persists.');
                    })

                    .catch((err) => {console.log('Rollback met an issue: ', err)});

                    
                }

                throw new Error(`Error ${res.status}`, errTxt);
            }
            return res.json();
        })
        .then((data) => {
            signIn(data);
            setUserEmail("");
            setUserPassword("");
            setUserName("");
            return navigate('/');
            // return navigate('/newPlayer');
        })
        .catch((err) => {
            console.log('Failed: ',err)
        })
    }

    //uid taken directly from user object in backend
    const logEmailUser = async () => {
        try{
            await setPersistence(auth, browserLocalPersistence);
            const resp = await signUpWEmail(userEmail, userPassword);
            const respID = await resp.user.getIdToken();

            verifyUserToken(respID, userEmail, userName);
        }catch(err){
            if(err.code === "auth/email-already-in-use"){
                repeatedEmail();
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
        if(userName === "" || userEmail === "" || userPassword === ""){
            console.log('here in signup');
            emptyFields();
        }else if(!validateEmail(userEmail)){
            invalidEmail();
        }else if(userPassword.length < 6){
            invalidPassword();
        }else{
            logEmailUser(userEmail, userPassword);
        }
    }



    return(
        <div className="absolute h-full w-full flex right-0 rounded">
            <div className="h-full w-full flex flex-col items-center justify-center">
                <div className="w-fit">
                    <h1 className="header font-bold text-center">Create Account</h1>
                    <div className="mt-2 h-10 w-full rounded-lg border border-black p-2 flex justify-between px-4 items-center hover:cursor-pointer hover:bg-sky-100">
                        <div className="h-full aspect-square">
                            <img src={Google} className="h-full w-full cover-fit" />
                        </div>
                        <p 
                    onClick={logGUser}
                    className="text-sm font-bold">Continue with Google</p>
                    </div>

                </div>
                <p className="mt-2 h-6 text-center mb-2 bs:b-0"> Or use your email for registration </p>
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