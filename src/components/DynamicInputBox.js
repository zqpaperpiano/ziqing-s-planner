import React, { useRef, useState, useEffect } from "react";

const DynamicInputBox = ({ value, handleChange, index, cancel }) => {
    const [inputWidth, setInputWidth] = useState("auto");
    const inputRef = useRef(null);

    const maxInputWidth = "80%"; // Set maximum width as a percentage of parent container width

    useEffect(() => {
        if (inputRef.current) {
            setInputWidth(`${inputRef.current.scrollWidth + 2}px`);
        }
    }, []);

    const handleInputChange = (e) => {
        
        if(e.target.value !== ""){
            const newWidth = Math.min(
                inputRef.current.scrollWidth + 2,
                inputRef.current.parentElement.clientWidth * 0.8 // Max width as 80% of parent container
            );
            setInputWidth(`${newWidth}px`);
        }else{
            setInputWidth("auto");
        }
        handleChange(e.target.value, index);
    };

    return (
        <input
            ref={inputRef}
            type="text"
            onChange={handleInputChange}
            value={value}
            style={{
                fontFamily: 'PatrickHand',
                width: inputWidth,
                maxWidth: maxInputWidth,
                textDecoration: cancel ? "line-through" : "none", 
                
            }}
            className={`border-b-2 border-gray-300 rounded-lg py-0.5 px-2 focus:outline-none focus:border-blue-500 ${cancel ? "bg-[#e0e0e0]": "bg-white"}`}
        />
    );
};

export default DynamicInputBox;