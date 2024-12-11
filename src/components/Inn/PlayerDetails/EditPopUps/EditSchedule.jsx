import React, {useState} from "react";
import { Button } from "@mui/material";
import Scheduler from "../../../Scheduler/Scheduler";

const EditSchedule = ({ onClose }) => {
    const [newSchedule, setSchedule] = useState([]);

    const setNewSchedule = (sched) => {
        setSchedule(sched);
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
            <div className="relative h-90p w-95p bg-white">
                <div className="absolute top-0 right-0">
                    <Button onClick={onClose} sx={{color: 'black'}}>X</Button>
                </div>
                <div className="h-full w-full bg-bgBrown">
                    <Scheduler newWidth="95%" handleSetSchedule={setNewSchedule} handleNextPage={onClose}/>
                </div>
            </div>
        </div>
    );
}

export default EditSchedule;