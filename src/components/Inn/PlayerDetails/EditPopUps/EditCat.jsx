import { Button, CircularProgress} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { X } from "lucide-react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import config from "../../../../config/config.json";
import CategoryBar from "./Components/CategoryBar";
import { AuthContext } from "../../../../contexts/authContext";
import { auth } from "../../../../config/firebase";
import DeleteConfirmation from "../../../DeleteConfirmation/DeleteConfirmation";
import LoadingScreen from "../../../LoadingScreen/LoadingScreen";
import { toast, ToastContainer } from "react-toastify";

const EditCat = ({ onClose }) => {
    const { player, setPlayer, tokenRefresh } = useContext(AuthContext);
    const [currInput, setCurrInput] = useState(null);
    const [tempList, setTempList] = useState(player?.preferences?.categories);
    const [clickedDelete, setClickedDelete] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChangeColor = (color, key) => {
        setTempList((prevList) => ({
            ...prevList,
            [key]:{
                ...prevList[key],
                color: color
            }
        }));
    }

    const onChangeName = (e) => {
        const key = e.target.id.split("-")[0];
        setTempList((prevList) => ({
            ...prevList,
            [key]: {
                ...prevList[key],
                name: e.target.value
            }
        }));
    }

    const onSaveChanges = async (retry) => {
        try{
            setLoading(true);
            const resp = await fetch(`${config.development.apiURL}users/updateUserEventCategories`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: auth.currentUser.uid,
                    categories: tempList
                })
            });

            if(resp.status === 401){
                if(!retry){
                    await tokenRefresh();
                    onSaveChanges(true);
                    return;
                }else{
                    setLoading(false);
                    toast.error("An error has occured. Please try logging out and back in again. ")
                }
                
            }

            if(resp.ok){
                const data = await resp.json();
                setPlayer(data);
                setLoading(false);
                onClose();
            }

            
        }catch(err){
            setLoading(false);
            toast.error('An error has occured. Please try again later.')
        }
    }

    const onAddCategory = (e) => {
        let keys = Object.keys(tempList);
        let lastKey = keys[keys.length - 1];
        let count = parseInt(lastKey[lastKey.length - 1]) + 1;
        setTempList((prevList) => ({
            ...prevList,
            [`cat${count}`]: {
                name: "",
                color: "#FFFFFF"
            }
        }));
    }

    const onClickDelete = (e) => {
        setClickedDelete(true);
        let delKey = e.target.id.split("-")[0];
        setSelectedKey(delKey);
    }

    const onDeleteCategory = (e) => {
        const filtered = Object.keys(tempList).reduce((acc, key) => {
            if(key !== selectedKey){
                acc[key] = tempList[key];
            }
            return acc;
        }, {})
        setTempList(filtered);
        setSelectedKey(null);
        setClickedDelete(false);
    }


    return(
        <div className="fixed inset-0 bg-black z-40 bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
            <ToastContainer />
            {
                loading && <LoadingScreen />
            }
            {
                !player?.preferences?.categories || player?.preferences?.categories === "" ?
                <div className="h-screen w-screen flex items-center justify-center">
                    <CircularProgress size="large" color="black"/>
                </div> :
                <div className={`relative h-3/4 w-3/4 bg-white rounded-lg overflow-auto flex flex-col items-center p-2 gap-2`}>

                    {/* <DeleteConfirmation onClickDelete={onDeleteCategory} onClickUndo={handleDialogClose} event="category"/> */}

                    <Button
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right:0,
                            color: 'black',
                        }}
                    ><X /></Button>

                    {
                        clickedDelete &&
                        <DeleteConfirmation onClickDelete={onDeleteCategory} onClickUndo={() => {setClickedDelete(false)}} event="Delete this category"/>
                    }

                    <div className="h-fit text-center">
                        <h3 className="font-silkscreen text-3xl">Categories</h3>
                    </div>
                    
                    
                    <div className=" w-3/4 flex-1 flex flex-col justify-around gap-2    ">
                        {
                            Object.entries(tempList).map((cat, index) => {
                                return(
                                    <CategoryBar key={index} cat={cat} onChangeName={onChangeName} onChangeColor={onChangeColor} onDeleteCat={onClickDelete}/>
                                )

                            })
                        }
                    </div>
                    <Button
                        onClick={onAddCategory}
                    >+ Add Categories</Button>
                    <Button
                    onClick={() => {onSaveChanges(false)}}
                    >Save</Button>
                </div>
            }
            
        </div>
    );
}

export default EditCat;