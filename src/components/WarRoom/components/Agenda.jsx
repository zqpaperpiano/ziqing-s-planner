import { FormControl, TextField, useFormControl } from "@mui/material";
import React, { useState } from "react";

const Agenda = () => {
    const [beforeEvent, setBeforeEvent] = useState([]);
    const [afterEvent, setAfterEvent] = useState([]);
    const [agenda, setAgenda] = useState([]);

    return(
        <div className="h-fit w-full flex flex-col border border-black p-2 rounded-lg">
            <div className="w-full flex-1">
                <div className="pl-4 font-bold text-xl">
                    <p className="">Agenda</p>
                </div>
            </div>
            <div className="w-full flex-1">
            <div className="pl-4 font-bold text-xl">
                    <p className="">Before Event Checklist</p>
                </div>
            </div>
            <div className="w-full flex-1">
            <div className="pl-4 font-bold text-xl">
                    <p className="">After Event Followup</p>
                </div>
            </div>
        </div>
    );
}

export default Agenda;