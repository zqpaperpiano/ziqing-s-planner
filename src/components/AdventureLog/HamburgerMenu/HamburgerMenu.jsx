import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const HamburgerMenu = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleOpen = () => {
        setIsOpen(prevState => !prevState);
    };

    // Do not render the menu for specific routes like "/logIn" or "/signUp"
    if (location.pathname === '/logIn' || location.pathname === '/signUp') {
        return null;
    }

    return (
        <div className={`inset-0 relative h-full ${isOpen ? "w-14vw" : "w-7vw"} font-silkscreen text-l overflow-hidden z-30`}>
            {isOpen ? (
                <div className="h-screen w-full flex flex-col bg-bgPink bg-opacity-30 backdrop-blur-sm">
                    <div onClick={handleToggleOpen} className="mt-2 ml-2">
                        <CloseIcon className="hover:cursor-pointer" fontSize="medium" />
                    </div>
                    <div className="h-85vh w-full flex flex-col">
                        <Link to="/" className="h-full w-full hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center">
                                <p>Overview</p>
                            </div>
                        </Link>

                        <Link to="/dungeon-board/1" className="h-full w-full hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center">
                                <p>Dungeons</p>
                            </div>
                        </Link>

                        <Link to="/warRoom" className="h-full w-full hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center">
                                <p>War Room</p>
                            </div>
                        </Link>

                        <Link to="/explore" className="h-full w-full hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center">
                                <p>Explore</p>
                            </div>
                        </Link>

                        {/* <Link to="/shop" className="h-full w-full hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center">
                                <p>Shop</p>
                            </div>
                        </Link> */}

                        <Link to="/inn" className="h-full w-full hover:bg-turqoiseGreen hover:cursor-pointer">
                            <div className="h-full w-full ml-2 flex items-center">
                                <p>Inn</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ) : (
                <div onClick={handleToggleOpen} className="mt-2 ml-2">
                    <MenuIcon fontSize="medium" className="hover:cursor-pointer" />
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
