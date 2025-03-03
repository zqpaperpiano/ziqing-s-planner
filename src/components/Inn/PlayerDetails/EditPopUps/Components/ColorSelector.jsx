import React, { useRef, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import './ColorSelector.css';
import { Button, Input } from "@mui/material";
import {ToastContainer, Toast, toast} from 'react-toastify';

const presetColors = [
    '#F7EA48', '#FFD700', '#F2A900', '#C09214', '#73531D',
    '#FFCC85', '#F0A85B', '#FF953F', '#F97645', '#DF7765',
    '#AEDEF0', '#A6C8E9', '#7BB0DC', '#63C5DA', '#0492C2',
    '#8DB7B4', '#BCE5CB', '#64D6C1', '#1EC2D1', '#1E9FAA'
]

const ColorSelector = ({ handleClose, handleColorChange }) => {
    const [onMore, setOnMore] = useState(false);
    const [defColor, setDefColor] = useState("#F7EA48");
    const [hexInput, setHexInput] = useState("#F7EA48");

    useEffect(() => {
        handleColorChange(defColor);
    }, [defColor])

    const handleClickMore = () => {
        setOnMore(true);
    }

    const onColorChange = (e) => {
        setDefColor(e);
        setHexInput(e); 
    }

    const handleClickPreset = () => {
        setOnMore(false);
    }

    const onChangeHex = (e) => {
        setHexInput(e.target.value);
    }
    
    const checkValidHex = (str) => {
        if(str.charAt(0) === '#'){
            str = str.slice(1, str.length);
        }

        if(str.length !== 3 && str.length !== 6){
            console.log('length not correct');
            return false;
        }

        const hexRegex = /^[0-9a-fA-F]+$/
        return hexRegex.test(str);
    }

    const onClickOk = () => {
        if(!checkValidHex(hexInput)){
            toast.warning('Hex input is not valid!');
        }else{
            setDefColor(hexInput);
            handleColorChange(defColor);
            handleClose();
        }
    }

    const onClickPreColor = (e) => {
        setDefColor(e.target.id);
        // handleColorChange(defColor);
        handleClose();
    }

    return(
        <div 
        className={` h-48 w-36 aspect-square rounded-lg flex justify-center items-center ${onMore ? `h-80 w-80`: null}`}>
            {
                onMore ? 
                <div className="h-full w-full flex flex-col items-center">
                <ToastContainer />
                <p className="font-silkscreen text-xs text-center">Custom colors</p>
                <div className="h-4/5 w-full flex items-center justify-center px-2">
                    <div className="colorpicker h-4/5 w-2/3 border border-black border-1 rounded-lg flex">
                        <HexColorPicker 
                        color={defColor} onChange={onColorChange} />
                    </div>
                    <div className="h-full w-1/3 flex flex-col justify-center items-center font-silkscreen text-xs text-center">
                            <div className="w-full h-1/3 flex flex-col justify-center items-center">
                                <p>Current:</p>
                                <div className="h-12 w-12 aspect-square" style={{backgroundColor: defColor}}></div>
                            </div>
                            <div className="w-full h-1/3 flex flex-col justify-center items-center">
                                <p>Hex:</p>
                                <input 
                                onChange={onChangeHex}
                                className="h-fit w-20 bg-[#f5f5f5] border border-black border-1" value={hexInput} />
                            </div>
                            <div className="w-2/3 h-1/3 flex items-center justify-center">
                                <Button
                                onClick={onClickOk}
                                sx={{fontFamily: 'silkscreen'}}
                                >OK</Button>
                            </div>
                    </div>
                </div>
                <div 
                onClick={handleClickPreset}
                className="h-12 flex justify-center items-center font-silkscreen text-xs text-center w-full hover:cursor-pointer hover:bg-sky-100">
                    Preset Colors
                </div>
            </div> :
            <div className="h-full w-full flex flex-col items-center justify-center gap-1">
                    <p className="font-silkscreen text-xs text-cernter">Preset Colors</p>
                <div className="h-32 w-32 aspect-square grid grid-cols-5 grid-rows-4 gap-1">
                    {
                        presetColors.map((color) => {
                            return(
                        <div 
                        key={color}
                        onClick={onClickPreColor}
                        id={color}
                        className="h-full w-full hover:border hover:border-2 hover:border-orange-300 hover:cursor-pointer"
                        style={{backgroundColor: color}}></div>
                            )
                        })
                    }
                </div>
                <div 
                onClick={handleClickMore}
                className="h-fit w-28 hover:bg-sky-100 hover:cursor-pointer">
                    <p className="font-silkscreen text-xs text-center">More colors</p>
                </div>
            </div>
            }
        </div>
    );
}

export default ColorSelector;