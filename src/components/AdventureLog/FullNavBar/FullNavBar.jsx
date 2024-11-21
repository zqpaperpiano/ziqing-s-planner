import React from "react";
import './FullNavBar.css';
import { Link } from "react-router-dom";

const FullNavBar = () => {

    return(
        //navbar container
        <div className="h-full w-full bg-darkPink font-silkscreen text-l flex justify-around items-center">
            <Link to={'/'} className="item">
                <p>Overview</p>
            </Link>
                
            <Link to={'/dungeon-board/1'} className="item">
                
                <a>Dungeons</a>
            </Link>
            <Link to={'/warRoom'} className="item">
                
                <a>War Room</a>
            </Link>
            <div className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                <div className="h-full w-full ml-2 flex items-center justify-center">
                    <p>Explore</p>
                </div>
            </div>
            <Link to={'/shop'} className="item">
                <a>Shop</a>
            </Link>
            <Link to={'/inn'} className="item">
                <p>Inn</p>
            </Link>
        </div>
    )
}

export default FullNavBar;