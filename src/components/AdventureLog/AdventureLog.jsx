import React from "react";
import './AdventureLog.css';
import OverviewIcon from '../../images/overview-icon.png';
import QuestIcon from '../../images/quest-icon.png';
import AdventureIcon from '../../images/adventure-icon.png';
import ShopIcon from '../../images/shop.png';
import InnIcon from '../../images/inn.png';
import { Link } from "react-router-dom";
import { StoreIcon } from "lucide-react";

const AdventureLog = () => {

    return(
        <div className="
        h-85p w-full flex flex-col font-bold mt-4
        grid grid-rows-5
        ">

            <div className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                <div className="h-full w-full ml-2 flex items-center">
                    <div className="w-15p h-70p ">
                        <img src={OverviewIcon} className="h-full w-full object-contain"    />
                    </div>
                        
                    <p>Overview</p>
                </div>
            </div>

            <div className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                <div className="h-full w-full ml-2 flex items-center">
                    <div className="w-15p h-70p ">
                        <img src={QuestIcon} className="h-full w-full object-contain"    />
                    </div>
                        
                    <p>Dungeon Board</p>
                </div>
            </div>

            <div className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                <div className="h-full w-full ml-2 flex items-center">
                    <div className="w-15p h-70p ">
                        <img src={AdventureIcon} className="h-full w-full object-contain"    />
                    </div>
                        
                    <p>Adventure</p>
                </div>
            </div>

            <div className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                <div className="h-full w-full ml-2 flex items-center">
                    <div className="w-15p h-70p ">
                        <img src={ShopIcon} className="h-full w-full object-contain"    />
                    </div>
                        
                    <p>Shop</p>
                </div>
            </div>

            <div className="h-full w-full  hover:bg-turqoiseGreen hover:cursor-pointer">
                <div className="h-full w-full ml-2 flex items-center">
                    <div className="w-15p h-70p ">
                        <img src={InnIcon} className="h-full w-full object-contain"    />
                    </div>
                        
                    <p>Inn</p>
                </div>
            </div>

        </div>
    )
}

export default AdventureLog;