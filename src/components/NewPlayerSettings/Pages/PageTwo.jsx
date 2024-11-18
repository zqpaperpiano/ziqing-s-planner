import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { ReactTyped } from "react-typed";
import BackArrow from "../../BackArrow/BackArrow";


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
                    <div className={`absolute top-16 h-full w-full flex font-silkscreen flex flex-col text-2xl text-center items-center whitespace-pre-line 
                        leading-none ${changeName ? "opacity-0 pointer-events-none" : "opacity-1"}`}>
                        <ReactTyped
                            className="silkscreen"
                            cursorChar="|"
                            strings={[`Hello adventurer,\n 
                                    when we first met, you said your name was\n 
                                    ...\n 
                                    would you still like to be addressed as such?`]}
                            backSpeed={0}
                            typeSpeed={25}
                        />
                    </div>
                    <div className={`absolute bottom-8 h-1/4 w-2/3 flex flex-col bg-[#ffcdac] border border-yellow-900 border-2
                        ${changeName ? "opacity-0 pointer-events-none" : "opacity-1"} font-silkscreen text-xl gap-0`}>
                        <div 
                        onClick={handleNextPage}
                        className="h-1/2 w-full hover:cursor-pointer hover:border hover:border-b-2 hover:border-yellow-900 hover:border-2 flex items-center">
                            <p>Yes, that's fine</p>
                        </div>
                        <div 
                        onClick={toggleChangeName}
                        className="h-1/2 w-full hover:cursor-pointer hover:border hover:border-t-2 hover:border-yellow-900 hover:border-2 flex items-center">
                            <p>No, I have a different preferred name.</p>
                        </div>
                    </div>
                    {
                        changeName &&
                        <div className="h-full w-full flex flex-col items-center justify-center text-2xl font-silkscreen">
                            <BackArrow handleClickedBack={toggleChangeName} />
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