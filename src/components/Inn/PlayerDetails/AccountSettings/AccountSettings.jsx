import { IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';


const AccountSettings = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrPassword, setShowCurrPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [currPassword, setCurrPassword] = useState("");

    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const onChangeCurrPassword= (e) => {
        setCurrPassword(e.target.value);
    }

    const handleToggleNewVisibility = () => {
        if(showNewPassword){
            setShowNewPassword(false);
        }else{
            setShowNewPassword(true);
        }
    }

    const handleToggleCurrVisibility = () => {
        if(showCurrPassword){
            setShowCurrPassword(false);
        }else{
            setShowCurrPassword(true);
        }
    }


    return(
        <div className="h-full w-85p mx-auto">
            <h1 className="text-3xl font-bold">Account Settings</h1>

            <div>
                <h3 className="text-xl font-bold">Email Address</h3>
                <div className="flex">
                    <p>insert email address here</p>
                    <p className="text-sky-600 hover:underline hover:decoration-sky-400 hover:cursor-pointer hover:text-sky-400"> Change </p>
                </div>
            </div>

            <div className="w-full">
                <h3 className="text-xl font-bold">Password</h3>

                <div className="flex w-85p gap-4">
                    <div className="flex flex-col">
                        <InputLabel >New Password</InputLabel>
                        <TextField variant="outlined" size="small"
                            type={showNewPassword ? "text" : "password"}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => {handleToggleNewVisibility()}}
                                        >
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    )
                                }
                            }}
                        />
                        
                    </div>

                    <div className="flex flex-col">
                    <InputLabel >Current Password</InputLabel>
                    <TextField variant="outlined" size="small"
                            type={showCurrPassword ? "text" : "password"}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => {handleToggleCurrVisibility()}}
                                        >
                                            {showCurrPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    )
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="flex">
                    <p>Can't remember your current password?</p>
                    <p className="text-blue-500 underline decoration-blue-500 hover:decoration-blue-400 hover:text-blue-300 hover:cursor-pointer">Reset here</p>
                </div>

                <div>
                    <Button>Save changes</Button>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-xl">Delete Account</h3>
                <p className="text-s">Are you sure you would like to delete your account?</p>
                <p className="text-xs">
                    This account contains number of dungeons, of which number have been cleared. 
                    Deleting your account will remove all content associated with it. 
                </p>
                <p className="text-red-600 underline decoration:text-red-600 hover:cursor-pointer hover:text-red-300 hover:decoration:text-red-300">
                    I want to delete my account
                </p>
            </div>


        </div>
    );
}

export default AccountSettings;