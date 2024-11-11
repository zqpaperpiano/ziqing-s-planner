import React, { useState } from "react";
import OverviewIcon from '../../../images/overview-icon.png';
import QuestIcon from '../../../images/quest-icon.png';
import AdventureIcon from '../../../images/adventure-icon.png';
import ShopIcon from '../../../images/shop.png';
import InnIcon from '../../../images/inn.png';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const HamburgerMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggleOpen = () => {
        if(isOpen){
            setIsOpen(false);
        }else{
            setIsOpen(true);
        }
    }

    return(
        <div className={`inset-0 relative h-full ${isOpen ? "w-15vw" : "w-7.5vw"} overflow-hidden z-30`}>
            {
                isOpen ? 
                <div className="h-screen w-full flex flex-col bg-bgPink bg-opacity-30 backdrop-blur-sm">
                    <div 
                    onClick={() => {handleToggleOpen()}}
                    className="mt-2 ml-2">
                        <CloseIcon 
                        className="hover:cursor-pointer"
                        fontSize="medium"/>
                    </div>
                    <div className="h-85vh w-full flex flex-col">
                        <Link to={'/'} className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center"> 
                                <p>Overview</p>
                            </div>
                        </Link>

                        <Link to={'/dungeon-board/1'} className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center">
                                <p>Dungeons</p>
                            </div>
                        </Link>

                        <div className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center">
                                <p>Adventure</p>
                            </div>
                        </div>

                        <div className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center">
                                <p>Shop</p>
                            </div>
                        </div>

                        <Link to={'/inn'} className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center">
                                <p>Inn</p>
                            </div>
                        </Link>
                    </div>
                </div>
                : <div 
                    onClick={() => {handleToggleOpen()}}
                    className="mt-2 ml-2">
                        <MenuIcon fontSize="medium"  
                        className="hover:cursor-pointer" />
                </div>
            }

        </div>
        // <div className="
        // h-85p w-full flex flex-col font-bold mt-4
        // grid grid-rows-5
        // ">

            

        // </div>
    )
}

export default HamburgerMenu;