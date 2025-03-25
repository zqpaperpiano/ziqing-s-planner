import { IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { AuthContext } from "../../../../contexts/authContext";


const AccountSettings = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrPassword, setShowCurrPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [currPassword, setCurrPassword] = useState("");
    const { player } = useContext(AuthContext);

    console.log(player);

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
        <div className="h-full w-85p mx-auto px-4 py-2" style={{fontFamily: 'Silkscreen'}}>
            <h1 className="text-3xl">Account Settings</h1>

            <div className="flex-1 flex-col gap-2 mt-4">
                <h3 className="text-xl  ">Email Address</h3>
                <div className="flex">
                    <p className="font-tiny5">{player.email}</p>
                    <p className="text-sky-600 hover:underline hover:decoration-sky-400 hover:cursor-pointer hover:text-sky-400"> Change </p>
                </div>
            </div>

            <div className="w-full flex-1 flex flex-col gap-2 mt-4">
                <h3 className="text-xl  ">Password</h3>

                <div className="flex w-85p gap-4">
                    <div className="flex flex-col">
                        <InputLabel sx={{fontFamily: 'source-code-pro'}}>New Password</InputLabel>
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
                    <InputLabel sx={{fontFamily: 'source-code-pro'}}>Current Password</InputLabel>
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
                <h3 className=" flex-1 text-xl">Delete Account</h3>
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