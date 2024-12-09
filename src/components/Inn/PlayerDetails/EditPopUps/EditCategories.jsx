import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { EventContext } from "../../../WarRoom/components/EventContext";
import { X } from "lucide-react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EditCategories = ({cat}) => {
    const {categories, setCategories} = useContext(EventContext);
    const [name, setName] = useState(categories[cat].name);
    const [color, setColor] = useState(categories[cat].color);

    const onChangeCatName = (e) => {
        setName(e.target.value);
    }


    return(
        <div className="fixed inset-0 bg-black z-40 bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
            <div className="h-1/4 w-1/4 bg-white rounded-lg">
                {
                    !cat ?
                    <CircularProgress /> :
                    <div className="h-full w-full relative">
                        <div className="absolute top-0 right-0 rounded-lg hover:cursor-pointer">
                            <X />
                        </div>
                        <div className="relative h-full w-full flex flex-col items-center justify-center px-4">
                            <div className="w-full h-12 border bg-[#f5f5f5] flex rounded-lg">
                                <div className="w-20 h-full flex items-center justify-center hover:cursor-pointer">
                                    <div className="h-8 w-8 rounded-full" style={{backgroundColor: color}}>
                                    </div>
                                    <ExpandMoreIcon />
                                </div>
                                <div className="h-full w-0 border border-white"></div>
                                <div className="flex-auto full">
                                    <input
                                        onChange={onChangeCatName}
                                        value={name}
                                        className="h-full w-full bg-[#f5f5f5] p-2"
                                        type="text" />
                                </div>
                            </div>
                            <div className="absolute bottom-0">
                                <Button size="small">Save</Button>
                            </div>
                        </div>
                        
                    </div>
                }
            </div>
        </div>
    );
}

export default EditCategories;