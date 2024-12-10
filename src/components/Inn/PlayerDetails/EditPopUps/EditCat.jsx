import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { EventContext } from "../../../WarRoom/components/EventContext";
import { X } from "lucide-react";

import CategoryBar from "./Components/CategoryBar";

const EditCat = ({ onClose }) => {
    const {categories, setCategories} = useContext(EventContext);
    const [currInput, setCurrInput] = useState(null);
    const [tempList, setTempList] = useState(categories);


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
                    
                    <div className="h-fit text-center">
                        <h3 className="font-silkscreen text-3xl">Categories</h3>
                    </div>
                    
                    
                    <div className=" w-3/4 flex-1 flex flex-col justify-around gap-2    ">
                        {
                            Object.entries(tempList).map((cat) => {
                                return(
                                    <CategoryBar cat={cat} onChangeName={onChangeName}/>
                                )

                            })
                        }
                    </div>
                    <Button>+ Add Categories</Button>
                    <Button>Save</Button>
                </div>
            }
            
        </div>
    );
}

export default EditCat;