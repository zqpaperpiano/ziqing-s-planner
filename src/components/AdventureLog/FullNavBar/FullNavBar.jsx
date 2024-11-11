import React from "react";
import './FullNavBar.css';
import OverviewIcon from '../../../images/overview-icon.png';
import QuestIcon from '../../../images/quest-icon.png';
import AdventureIcon from '../../../images/adventure-icon.png';
import ShopIcon from '../../../images/shop.png';
import InnIcon from '../../../images/inn.png';
import { div } from "react-router-dom";

const FullNavBar = () => {

    return(
        //navbar container
        <div className="h-full w-full bg-darkPink flex justify-around items-center font-bold ">
            <div className="item">
                <div className="navbar-icon">
                    <img src={OverviewIcon} className="icon"    />
                </div>
                
                <p>Overview</p>
            </div>
                
            <div className="item">
                <div className="navbar-icon">
                    <img src={QuestIcon} className="icon"/>
                </div> 
                
                <a>Quest Board</a>
            </div>
            <div className="item">
                <div className="navbar-icon">
                    <img src={AdventureIcon} className="icon"/>
                </div>
                
                <a>Adventure!</a>
            </div>
            <div className="item">
                <div className="navbar-icon">
                    <img src={ShopIcon} className="icon"/>
                </div>
                <a>Store</a>
            </div>
            <div className="item">
                <div className="navbar-icon">
                    <img src={InnIcon} className="icon"/>
                </div>
                <p>Inn</p>
            </div>
        </div>
    )
}

export default FullNavBar;