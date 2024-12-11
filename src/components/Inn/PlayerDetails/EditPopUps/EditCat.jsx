import { Button, CircularProgress} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { EventContext } from "../../../WarRoom/components/EventContext";
import { X } from "lucide-react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import CategoryBar from "./Components/CategoryBar";

const EditCat = ({ onClose }) => {
    const {categories, setCategories} = useContext(EventContext);
    const [currInput, setCurrInput] = useState(null);
    const [tempList, setTempList] = useState(categories);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

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

    const onSaveChanges = () => {
        setCategories(tempList);
        onClose();
    }

    const onAddCategory = (e) => {
        let keys = Object.keys(tempList);
        let lastKey = keys[keys.length - 1];
        let count = parseInt(lastKey[lastKey.length - 1]) + 1;
        setTempList((prevList) => ({
            ...prevList,
            [`custom${count}`]:{
                name: "",
                color: "#FFFFFF"
            }
        }));
    }

    const onClickDelete = (e) => {
        handleDialogOpen();
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
        handleDialogClose();
    }


    return(
        <div className="fixed inset-0 bg-black z-40 bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
            {
                !categories || categories === "" ?
                <div className="h-screen w-screen flex items-center justify-center">
                    <CircularProgress size="large" color="black"/>
                </div> :
                <div className={`relative h-3/4 w-3/4 bg-white rounded-lg overflow-auto flex flex-col items-center p-2 gap-2`}>
                    <Button
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right:0,
                            color: 'black',
                        }}
                    ><X /></Button>

                    <Dialog
                        open={dialogOpen}
                        onClose={handleDialogClose}
                    >
                        <DialogTitle
                        sx={{
                            fontFamily: 'silkscreen',
                        }}
                        >{"Delete this category?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText
                                sx={{
                                    fontFamily: 'silkscreen'
                                }}
                            >
                                Are you sure you would like to delete this category? All events previously color-coded by this category
                                will remain. 
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                            sx={{
                                fontFamily: 'silkscreen',
                                color: 'white',
                                backgroundColor: 'red'
                            }}
                            onClick={onDeleteCategory}>Delete</Button>
                            <Button 
                            sx={{
                                fontFamily: 'silkscreen',
                                color: 'black'
                            }}
                            onClick={handleDialogClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    
                    <div className="h-fit text-center">
                        <h3 className="font-silkscreen text-3xl">Categories</h3>
                    </div>
                    
                    
                    <div className=" w-3/4 flex-1 flex flex-col justify-around gap-2    ">
                        {
                            Object.entries(tempList).map((cat) => {
                                return(
                                    <CategoryBar cat={cat} onChangeName={onChangeName} onChangeColor={onChangeColor} onDeleteCat={onClickDelete}/>
                                )

                            })
                        }
                    </div>
                    <Button
                        onClick={onAddCategory}
                    >+ Add Categories</Button>
                    <Button
                    onClick={onSaveChanges}
                    >Save</Button>
                </div>
            }
            
        </div>
    );
}

export default EditCat;