import React, { useEffect, useRef, useState } from "react";
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField } from "@mui/material";

const BraindumpTab = ({tab, onAddTabs, onDeleteTabs, onMinimiseTabs, onMaximiseTabs, onChangeName, onChangeContent}) => {
    const [tabName, setTabName] = useState(tab[1].title);
    const [content, setContent] = useState(tab[1].content);
    const [isDragging, setIsDragging] = useState(false);
    const [offSet, setOffSet] = useState({x: 0, y: 0});
    const [position, setPosition] = useState({x: tab[1].start.x, y: tab[1].start.y})
    const tabNameDiv = useRef(null);
    const tabContentDiv = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.key === 'Enter'){
                event.preventDefault();
                tabContentDiv.current?.focus();
            }
        }

        const divA = tabNameDiv.current;
        if(divA){
            divA.addEventListener("keydown", handleKeyDown);
        }

        return ()=> {
            if(divA){
                divA.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, [])

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setOffSet({
            x: event.clientX - position.x,
            y: event.clientY - position.y
        })
    }

    const handleMouseMove = (event) => {
        if(!isDragging) return;
        setPosition({
            x: event.clientX - offSet.x,
            y: event.clientY - offSet.y
        })
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }




    return(
        <div 
        style={{position: 'absolute', top: `${position.y}px`, left: `${position.x}px`, width: `${tab.width}px`, height: `${tab.height}px`}}
        className="h-full w-full bg-bgPink rounded-lg">
            <div 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="relative w-full bg-deepPink rounded-t-lg px-2" style={{height: '12%'}}>
                <div 
                onClick={onAddTabs}
                className="absolute left-0 rounded-tl-lg h-full w-8 flex items-center justify-center p-2 hover:cursor-pointer hover:bg-black hover:bg-opacity-10 hover:backdrop-blur-sm">
                    +
                </div>

                <div className="h-full w-1/2 flex items-center absolute left-12 overflow-hidden text-ellipsis whitespace-nowrap">
                    <p 
                    style={{fontFamily: 'source-code-pro'}}
                    className="font-semibold truncate">{tab[1].title}</p>
                </div>
                


                <div className="absolute right-0 w-16 rounded-tr-lg h-full flex justify-around items-center
                        ">
                    <div 
                    
                    className="w-8 h-full hover:cursor-pointer hover:bg-black hover:bg-opacity-10 hover:backdrop-blur-sm flex justify-center items-center"><MinimizeIcon /></div>
                    <div 
                    onClick={() => {onDeleteTabs(tab[0])}}
                    className="w-8 h-full rounded-tr-lg hover:cursor-pointer hover:bg-black hover:bg-opacity-10 hover:backdrop-blur-sm flex justify-center items-center"><CloseIcon /></div>
                    
                </div>

                
            </div>
            <div 
                style={{fontFamily: 'source-code-pro', height: '88%'}}
                className=" w-full">
                    <input
                        ref={tabNameDiv}
                        type="text"
                        style={{height: '10%', boxShadow: 'none', outline: 'none'}}
                        value={tab[1].title} 
                        onChange={(e) => onChangeName(tab[0], e.target.value)}
                        className="w-full bg-bgPink p-1 rounded-t-lg font-bold" />    
                    <textarea
                        ref={tabContentDiv}
                        type="text"
                        value={tab[1].content}
                        onChange={(e) => onChangeContent(tab[0], e.target.value)}
                        style={{resize: 'none', boxShadow: 'none', outline: 'none'}}
                        placeholder="What's on your mind?"
                        className="w-full h-90p bg-bgPink align-top p-1 rounded-b-lg" />
                </div>
        </div>
    );
}

export default BraindumpTab;