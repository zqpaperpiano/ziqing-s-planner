import { TextField, Button } from "@mui/material";
import React, { useContext } from "react";

const EditDetails = ({handleClose}) => {

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
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
                        <input className="w-full font-tiny5 px-2 border border-black border-2 z-50" type="text" value="hello" />
                    </div>
                    <div className="flex-auto h-2/3 w-85p flex-col font-silkscreen">
                        <p>Status</p>
                        <TextField 
                        fullWidth
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