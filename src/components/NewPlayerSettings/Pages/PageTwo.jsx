import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { ReactTyped } from "react-typed";


const PageTwo = ({currPage, handleNextPage}) => {
    const [changeName, setChangeName] = useState(false);
    const [newName, setNewName] = useState("");

    const toggleChangeName = () => {
        if(changeName){
            setChangeName(false);
        }else{
            setChangeName(true);
        }
    }

    const onChangeName = (e) => {
        setNewName(e.target.value);
    }



    return(
        <div className="h-full backgrounds w-1/5">
            {
                currPage === 2 &&
                <div className="relative h-full w-full flex flex-col items-center ">
                    <div className={`absolute h-full w-full flex font-silkscreen flex flex-col text-2xl text-center justify-center items-center whitespace-pre-line 
                        ${changeName ? "opacity-0 pointer-events-none" : "opacity-1"}`}>
                        <ReactTyped
                            className="silkscreen"
                            cursorChar="|"
                            strings={[`Hello adventurer,\n 
                                    when we first met, you said your name was\n 
                                    ...\n 
                                    would you still like to be called as such?`]}
                            backSpeed={0}
                            typeSpeed={25}
                        />
                    </div>
                    <div className={`absolute top-3/4 h-1/5 w-1/3 flex justify-between ${changeName ? "opacity-0 pointer-events-none" : "opacity-1"}`}>
                        <div className="w-1/2 h-fit p-8">
                            <Button 
                                onClick={handleNextPage}
                                sx={{
                                    backgroundColor: "red"
                                }}
                                variant="contained"
                                size="large">Yes</Button>
                        </div>
                        <div className="w-1/2 h-fit p-8">
                            <Button 
                                onClick={toggleChangeName}
                                sx={{
                                    backgroundColor: "red"
                                }}
                                variant="contained"
                                size="large">No</Button>
                        </div>
                    </div>
                    {
                        changeName &&
                        <div className="h-full w-full flex flex-col items-center justify-center text-2xl font-silkscreen">
                            <ReactTyped
                            strings={['What would you liked to be addressed as?']}
                            backSpeed={0}
                            typeSpeed={25}
                            startWhenVisible
                            />
                            <input
                                className="bg-slate-200 mt-8 rounded-lg h-12 w-1/3 text-m outline-none text-center"
                                type="text"
                            />
                            <div className="h-fit w-fit p-2 mt-4">
                                <Button
                                    onClick={handleNextPage}
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: "red",
                                        color: "white",
                                    }}
                                >Confirm</Button>
                            </div>
                        </div>
                    }

                </div>
            }
        </div>
    );
}

export default PageTwo;