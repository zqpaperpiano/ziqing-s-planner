import React from "react";
import './AdventureLog.css';
import OverviewIcon from '../../images/overview-icon.png';
import QuestIcon from '../../images/quest-icon.png';
import AdventureIcon from '../../images/adventure-icon.png';
import ShopIcon from '../../images/shop.png';
import InnIcon from '../../images/inn.png';
import { Link } from "react-router-dom";

const AdventureLog = () => {
    return(
        //navbar container
        <div className="h-7vh w-85vw bg-darkPink flex justify-around items-center font-bold ">
            <Link to={"/"} className="item">
                <div className="navbar-icon">
                    <img src={OverviewIcon} className="icon"    />
                </div>
                
                <p>Overview</p>
            </Link>
                
            <Link to={"/quest-board/quest-page/1"} className="item">
                <div className="navbar-icon">
                    <img src={QuestIcon} className="icon"/>
                </div> 
                
                <a>Quest Board</a>
            </Link>
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
            <Link to={"/inn"} className="item">
                <div className="navbar-icon">
                    <img src={InnIcon} className="icon"/>
                </div>
                <p>Inn</p>
            </Link>
        </div>
    )
}

export default AdventureLog;