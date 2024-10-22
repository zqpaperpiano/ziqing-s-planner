import React from "react";
import './AdventureLog.css';
import OverviewIcon from '../../images/overview-icon.png';
import QuestIcon from '../../images/quest-icon.png';
import AdventureIcon from '../../images/adventure-icon.png';
import ShopIcon from '../../images/shop.png';

const AdventureLog = () => {
    return(
        <div className="navbar-container">
            <div className="item">
                <div className="navbar-icon">
                    <img src={OverviewIcon} className="icon"    />
                </div>
                
                <a>Overview</a>
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
        </div>
    )
}

export default AdventureLog;