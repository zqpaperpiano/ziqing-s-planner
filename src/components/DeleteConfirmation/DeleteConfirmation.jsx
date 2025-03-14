import { Button } from "@mui/material";
import React from "react";

const DeleteConfirmation = ({event, onClickDelete, onClickUndo}) => {


    return(
        <div className="inset-0 fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="h-1/3 w-1/5 bg-white rounded-lg" style={{fontFamily: 'source-code-pro'}}>
                <div className="relative w-full bg-deepPink rounded-t-lg px-2 py-1 " style={{height: '12%'}}>
                    Delete {event}?
                    <div 
                    onClick={onClickUndo}
                    className="w-8 h-full absolute right-0 top-0 hover:bg-black rounded-tr-lg hover:cursor-pointer hover:bg-opacity-20 flex justify-center items-center">X</div>
                </div> 
                <div 
                style={{height: '88%'}}
                className="w-full rounded-b-lg px-2 py-1 flex flex-col text-center justify-center items-center">
                    <p className="h-1/2 w-full flex justify-center items-center ">This action is not reversible. Proceed?</p>

                    <div className="flex-1 w-full px-2 py-4 flex justify-evenly items-end">
                        <div
                        onClick={onClickUndo}
                        className="h-fit w-1/3 rounded-lg hover:cursor-pointer">Cancel</div>
                        <div 
                        onClick={onClickDelete}
                        className="h-fit w-1/3 rounded-lg text-white hover:cursor-pointer" style={{backgroundColor: 'red'}}>Delete</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmation;