import { TextField, Button } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../contexts/authContext";
import config from '../../../../config/config.json';
import { auth } from "../../../../config/firebase";
import LoadingScreen from "../../../LoadingScreen/LoadingScreen";
import { toast, ToastContainer } from "react-toastify";

const EditDetails = ({handleClose}) => {
    const { player, setPlayer, tokenRefresh, logOut } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(player.name);
    const [status, setStatus] = useState(player.status);
    const [loading, setLoading] = useState(false);

        useEffect(() =>{
            let timeoutId;
    
            if(loading){
                timeoutId = setTimeout(() => {
                    const toastId = 'edit-details-error-time-out'
                    if(!toast.isActive(toastId)) toast.error('An error has occured. Please try logging in again.', {toastId});
                    logOut();
                }, 60000)
            }
    
            return () => {
                if(timeoutId){
                    clearTimeout(timeoutId);
                }
            }
        }, [loading])

    const handleEditDisplayName = (e) => {
        setDisplayName(e.target.value);
    }

    const handleEditStatus = (e) => {
        setStatus(e.target.value);
    }

    const onClickSave = async (retry) => {
        try{
            setLoading(true);
            const resp = await fetch(`${config.development.apiURL}users/updateDisplayInfo`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    uid: auth.currentUser.uid,
                    displayName: displayName,
                    status: status
                })
            })

            if(resp.status === 401){
                if(!retry){
                    await tokenRefresh();
                    onClickSave(true);
                    return;
                }else{
                    setLoading(false);
                    const toastId = 'edit-details-error-unauthorized';
                    if(!toast.isActive(toastId)) 
                    toast.error('An error has occured. Please try logging out and in again.', {toastId});
                }
            }

            if(resp.ok){
                const data = await resp.json();
                setPlayer(data);
                setLoading(false);
                handleClose();
            }
        }catch(err){
            setLoading(false);
            const toastId = 'edit-details-error-server';
            if(!toast.isActive(toastId)) 
            toast.error('An error has occured. Please try again later.', {toastId});
        }
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <ToastContainer />
            {loading && <LoadingScreen />}
            <div className="relative h-2/3 w-1/3 bg-white flex flex-col items-center  gap-2 z-50 p-2">
                <div className="h-fit w-full ">
                    <p className="font-silkscreen text-l text-center">Edit Profile Details</p>
                </div>

                <div className="absolute top-0 right-0">
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: 'black',
                        }}
                    >X</Button>
                </div>

                <div className="h-4/5 flex flex-col w-3/4 items-center f">
                    <div className="h-1/3 flex-auto w-85p flex-col font-silkscreen">
                        <p>Display Name:</p>
                        <input className="w-full font-tiny5 px-2 border border-black border-2 z-50" type="text" value={displayName} onChange={handleEditDisplayName}/>
                    </div>
                    <div className="flex-auto h-2/3 w-85p flex-col font-silkscreen">
                        <p>Status</p>
                        <TextField 
                        fullWidth
                        value={status}
                        onChange={handleEditStatus}
                         sx={{
                            '& .MuiInputBase-input': {
                                fontFamily: 'tiny5',
                            },
                        }}
                        multiline rows={4} />
                    </div>
                </div>

                <div className="flex-1 w-1/4">
                        <Button
                        onClick={() => {onClickSave(false)}}
                            sx={{
                                color: 'black',
                                fontFamily: 'silkscreen',
                            }}
                        >Save</Button>
                </div>
            </div>
        </div>
    );
}

export default EditDetails;