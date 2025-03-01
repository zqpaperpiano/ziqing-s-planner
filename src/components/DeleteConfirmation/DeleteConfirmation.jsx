import { Button } from "@mui/material";
import React from "react";

const DeleteConfirmation = ({event, onClickDelete, onClickUndo}) => {
    return(
        <div className="inset-0 fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg font-silkscreen flex flex-col">
                <p className="bold text-3xl">Delete this {event}</p>
                <p className="text-xl">This action is irreversible. </p>
                <div className="flex justify-center gap-4">
                    <Button variant="contained"
                    onClick={onClickDelete}
                    sx={{
                        color: 'white',
                        backgroundColor: 'red'
                    }}
                    >Delete</Button>
                    <Button
                    onClick={onClickUndo}
                    >Undo</Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmation;