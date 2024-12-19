import React, {useEffect, useState} from "react";
import Checkbox from '@mui/material/Checkbox';
import DynamicInputBox from "../../DynamicInputBox";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";

const Checkpoints = ({checkpoints, handleSubmit, btnColor}) => {
    const bColor = btnColor || 'primary'
    const [checkpointList, setCheckpointList] = useState(checkpoints);

    useEffect(() => {
        handleSubmit(checkpointList);
    }, [checkpointList])

    const handleCheckboxCheckChange = (e, index) => {
        const checked = e.target.checked;

        setCheckpointList((prevList) => {
            const newList = prevList.map((cpt, i) => {
                if(i === index){
                    let key = Object.keys(cpt)[0];
                    return {[key]: {
                        ...cpt[key],
                        completion: e.target.checked
                    }};
                }
                return cpt;
            })
            return newList;
        })
    }

    const handleCheckpointNameChange = (newName, index) => {
        const key = Object.keys(checkpointList[index])[0];
        setCheckpointList((prev) => {
            const newList = prev.map((cpt, idx) => {
                if(idx === index){
                    return {[key]: {
                        ...prev[key], 
                        checkpointName: newName}};
                }
                return cpt;
            })

            return newList;
        });
    }

    const handleAddCheckpoint = () => {
        const length = checkpointList.length - 1;
        const finalKey = Object.keys(checkpointList[length])[0];
        const nextCount = parseInt(finalKey.slice(1, finalKey.length)) + 1;
        
        setCheckpointList((prevList) => [
            ...prevList,
            {[`C${nextCount}`]: {
                checkpointName: `Checkpoint ${nextCount}`,
                completion: false
            }}
        ]);
    }

    const handleDeleteCheckpoint = (index) => {
        if(checkpointList.length <= 1){
            toast.error('You need at least 1 checkpoint!', {
                position: "top-left",
                autoClose: 1500,
                closeOnClick: true
            })
        }else{
            const delKey = Object.keys(checkpointList[index])[0];
            const newList = checkpointList.filter((cpt) => {
                if(delKey !== Object.keys(cpt)[0]){
                    return cpt;
                }
            })
            setCheckpointList(newList);
        }
    }




    return(
        <div className="w-full flex flex-col items-center justify-center">
            <ToastContainer />
            {checkpoints && checkpointList.map((checkpoint, index) => {
                const checked =Object.values(checkpoint)[0].completion;
                return(
                <form key={index} className="flex items-center justify-center w-full gap-2">
                    <Checkbox 
                    sx={{
                        color: 'gray',
                        '&.Mui-checked':{
                            color: 'gray'
                        }
                    }}
                    checked={checked}
                    onChange={(e) => {handleCheckboxCheckChange(e, index)}}
                    />
                    <DynamicInputBox 
                    index={index}
                    handleChange={handleCheckpointNameChange}
                    placeholderText={Object.values(checkpoint)[0].checkpointName} />
                    <DeleteIcon 
                        onClick={() => {handleDeleteCheckpoint(index)}}
                        sx={{
                            height: '20px',
                            width: '20px',
                            '&:hover':{
                                cursor: 'pointer',
                                color: 'red'
                            }
                        }}
                    />
                    
                </form>
            )})}
            <Button
            onClick={handleAddCheckpoint}
            sx={{
                fontFamily: 'silkscreen',
                color: bColor,
            }}>Add Checkpoint</Button>
        </div>
    );
}

export default Checkpoints;