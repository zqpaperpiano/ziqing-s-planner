import React, { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import DynamicInputBox from "../../DynamicInputBox";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Checkpoints = ({ checkpoints, handleSubmit, btnColor, setRightClick, theme }) => {
    const bColor = btnColor || 'primary'
    const [checkpointList, setCheckpointList] = useState(checkpoints);
    const location = useLocation();

    useEffect(() => {
        handleSubmit(checkpointList);
    }, [checkpointList]);

    const handleCheckboxRightClick = (e) => {
        e.preventDefault();
        const regex = /^\/dungeonboard\/([^/]+)\/dungeons\/([^/]+)$/;
        const match = location.pathname.match(regex);
        if(match){
            setRightClick(true);
        }
    }

    const handleCheckboxCheckChange = (e, index) => {
        const checked = e.target.checked;

        setCheckpointList((prevList) => {
            const newList = prevList.map((cpt, i) => {
                if (i === index) {
                    let key = Object.keys(cpt)[0];
                    return {
                        [key]: {
                            ...cpt[key],
                            completion: checked
                        }
                    };
                }
                return cpt;
            });
            return newList;
        });
    };

    const handleCheckpointNameChange = (newName, index) => {
        setCheckpointList((prev) => {
            const newList = prev.map((checkpoint, idx) => {
                if (idx === index) {
                    const checkpointId = Object.keys(checkpoint)[0];
                    return {
                        [checkpointId]: {
                            ...checkpoint[checkpointId],
                            checkpointName: newName
                        }
                    };
                }
                return checkpoint;
            });
            return newList;
        });
    };

    const handleAddCheckpoint = () => {
        const length = checkpointList.length - 1;
        const finalKey = Object.keys(checkpointList[length])[0];
        const nextCount = parseInt(finalKey.slice(1, finalKey.length)) + 1;

        setCheckpointList((prevList) => [
            ...prevList,
            { [`C${nextCount}`]: { checkpointName: `Checkpoint ${nextCount}`, completion: false } }
        ]);
    };

    const handleDeleteCheckpoint = (index) => {
        if (checkpointList.length <= 1) {
            const toastId = 'checkpoints-error-delete-minimum';
            if(!toast.isActive(toastId)) 
            toast.error('You need at least 1 checkpoint!', {
                position: "top-left",
                autoClose: 1500,
                closeOnClick: true,
                toastId: toastId
            });
        } else {
            const delKey = Object.keys(checkpointList[index])[0];
            const newList = checkpointList.filter((cpt) => Object.keys(cpt)[0] !== delKey);
            setCheckpointList(newList);
        }
    };

    return (
        <div className={`w-full flex flex-col ${theme === 'pixel' ? 'items-center justify-center' : 'items-start'}`}>
            <ToastContainer />
            {checkpointList && checkpointList.map((checkpoint, index) => {
                const checked = Object.values(checkpoint)[0].completion ?? false; // Ensure a boolean value for checked
                return (
                    <form key={index} className={`flex ${theme === 'pixel' && ' justify-center'} items-center w-full gap-2`}>
                        <Checkbox
                            sx={{
                                color: 'gray',
                                '&.Mui-checked': {
                                    color: 'gray'
                                }
                            }}
                            checked={checked}
                            onChange={(e) => { handleCheckboxCheckChange(e, index) }}
                        />
                        <DynamicInputBox
                            theme={theme}
                            index={index}
                            handleChange={handleCheckpointNameChange}
                            value={Object.values(checkpoint)[0].checkpointName}
                            cancel={Object.values(checkpoint)[0].completion}
                        />
                        <DeleteIcon
                            onClick={() => { handleDeleteCheckpoint(index) }}
                            sx={{
                                height: '20px',
                                width: '20px',
                                flexShrink: 0,
                                '&:hover': {
                                    cursor: 'pointer',
                                    color: 'red'
                                }
                            }}
                        />
                    </form>
                );
            })}
            <Button
                onClick={handleAddCheckpoint}
                sx={{
                    fontFamily: theme === 'retro' ? 'source-code-pro' : 'Silkscreen',
                    color: bColor,
                }}>Add Checkpoint</Button>
        </div>
    );
};

export default Checkpoints;
