import React, { useContext, useEffect, useState } from "react";
import PlayerStats from "./PlayerStats/PlayerStats";
import AccountSettings from "./AccountSettings/AccountSettings";
import ProfilePreferences from "./ProfilePreferences/ProfilePreferences";
import NewPlayerSettings from "../../NewPlayerSettings/NewPlayerSettings";
import { AuthContext } from "../../../contexts/authContext";
import DeleteConfirmation from "../../DeleteConfirmation/DeleteConfirmation";

const PlayerDetails = () => {
    const [selectedPage, setSelectedPage] = useState("Profile Preferences");
    const {logOut} = useContext(AuthContext);
    const [clickLogout, setClickLogout] = useState(false);

    const handleClickedProfilePreferences = () => {
        setSelectedPage("Profile Preferences");
    }

    const handleClickedStats = () => {
        setSelectedPage("Stats");
    }

    const handleClickedAccountSettings = () => {
        setSelectedPage("Account Settings");
    }

    const handleOnClickLogout = () => {
        setClickLogout(true);
    }

    const handleUndoLogout = () => {
        setClickLogout(false);
    }



    return(
        <div className="h-full w-full">
            <div className="absolute h-full w-full flex">
                <div className="relative h-full w-15p border-r-2 border-darkPink flex flex-col text-left">
                    <div className={`my-2 rounded w-85p h-auto mx-auto p-0 bs:p-1 hover:cursor-pointer hover:bg-turqoiseGreen
                        ${selectedPage === 'Profile Preferences' ? "bg-darkPink" : null}`}
                        onClick={() => {handleClickedProfilePreferences()}}
                        >
                        <p className="text-xs bs:text-m">Profile Preferences</p>
                    </div>
                    {/* <div className={`my-2 rounded w-85p h-auto mx-auto p-0 bs:p-1 hover:cursor-pointer hover:bg-turqoiseGreen
                        ${selectedPage === 'Stats' ? "bg-darkPink" : null}`}
                        onClick={() => {handleClickedStats()}}
                        >
                        <p className="text-xs bs:text-m">Stats</p>
                    </div> */}
                    {/* <div className={`my-2 rounded w-85p h-auto mx-auto p-0 bs:p-1 hover:cursor-pointer hover:bg-turqoiseGreen
                        ${selectedPage === 'Account Settings' ? "bg-darkPink" : null}`}
                        onClick={() => {handleClickedAccountSettings()}}
                        >
                        <p className="text-xs bs:text-m">Account settings</p>
                    </div> */}
                    <div className={`my-2 rounded w-85p h-auto mx-auto p-0 bs:p-1 text-red-500 hover:cursor-pointer hover:bg-turqoiseGreen
                        `}
                        onClick={handleOnClickLogout}
                        >
                        <p className="text-xs bs:text-m">Log Out</p>
                    </div>
                </div>
                <div className="h-full w-85p">
                    {
                        selectedPage === "Profile Preferences" &&
                        <ProfilePreferences />
                    }
                    {/* {
                        selectedPage === "Stats" &&
                        <PlayerStats />
                    } */}
                    {
                        selectedPage === "Account Settings" &&
                        <AccountSettings />
                    }
                </div>
            </div>
            {
                clickLogout &&
                <DeleteConfirmation onClickDelete={logOut} onClickUndo={handleUndoLogout} event="Log Out" primaryBtn="Log out" msg={"You may lose your braindump tabs. Procced?"} />
            }
        </div>
    );
}

export default PlayerDetails;