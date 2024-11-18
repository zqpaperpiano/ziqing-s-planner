import React, { useState } from "react";
import ProfileOverview from "./ProfileOverview/ProfileOverview";
import PlayerStats from "./PlayerStats/PlayerStats";
import AccountSettings from "./AccountSettings/AccountSettings";

const PlayerDetails = ( {player, setUser} ) => {
    const [selectedPage, setSelectedPage] = useState("Profile Overview");

    const handleClickedProfileOverview = () => {
        setSelectedPage("Profile Overview");
    }

    const handleClickedStats = () => {
        setSelectedPage("Stats");
    }

    const handleClickedAccountSettings = () => {
        setSelectedPage("Account Settings");
    }

    const onClickLogOut = () => {
        const user = {
            "email": -1,
            "name": "",
            "displayName": "",
            "pfp": "",
            "status": ""
        };
        setUser(user);
    }

    return(
        <div className="h-full w-full flex">
            <div className="relative h-full w-15p border-r-2 border-darkPink flex flex-col text-left">
                <div className={`my-2 rounded w-85p h-auto mx-auto p-1 hover:cursor-pointer hover:bg-turqoiseGreen
                    ${selectedPage === 'Profile Overview' ? "bg-darkPink" : null}`}
                    onClick={() => {handleClickedProfileOverview()}}
                    >
                    <p>Profile overview</p>
                </div>
                <div className={`my-2 rounded w-85p h-auto mx-auto p-1 hover:cursor-pointer hover:bg-turqoiseGreen
                    ${selectedPage === 'Stats' ? "bg-darkPink" : null}`}
                    onClick={() => {handleClickedStats()}}
                    >
                    <p>Stats</p>
                </div>
                <div className={`my-2 rounded w-85p h-auto mx-auto p-1 hover:cursor-pointer hover:bg-turqoiseGreen
                    ${selectedPage === 'Account Settings' ? "bg-darkPink" : null}`}
                    onClick={() => {handleClickedAccountSettings()}}
                    >
                    <p>Account settings</p>
                </div>
                <div className={`my-2 rounded w-85p h-auto mx-auto p-1 hover:cursor-pointer hover:bg-turqoiseGreen
                    `}
                    onClick={() => {onClickLogOut()}}
                    >
                    <p>Log out</p>
                </div>
            </div>
            <div className="h-full w-85p">
                {
                    selectedPage === "Profile Overview" &&
                    <ProfileOverview player={player}/>
                }
                {
                    selectedPage === "Stats" &&
                    <PlayerStats />
                }
                {
                    selectedPage === "Account Settings" &&
                    <AccountSettings />
                }
            </div>
        </div>
    );
}

export default PlayerDetails;