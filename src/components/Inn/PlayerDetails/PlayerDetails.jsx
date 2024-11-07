import React, { useState } from "react";
import ProfileOverview from "./ProfileOverview/ProfileOverview";

const PlayerDetails = () => {
    const [selectedPage, setSelectedPage] = useState("Profile Overview");

    return(
        <div className="h-full w-full flex">
            <div className="relative h-full w-15p border-r-2 border-darkPink flex flex-col text-left">
                <div className={`my-2 rounded w-85p h-auto mx-auto p-1 hover:cursor-pointer hover:bg-turqoiseGreen
                    ${selectedPage === 'Profile Overview' ? "bg-darkPink" : null}`}>
                    <p>Profile overview</p>
                </div>
                <div className={`my-2 rounded w-85p h-auto mx-auto p-1 hover:cursor-pointer hover:bg-turqoiseGreen
                    ${selectedPage === 'Stats' ? "bg-darkPink" : null}`}>
                    <p>Stats</p>
                </div>
                <div className={`my-2 rounded w-85p h-auto mx-auto p-1 hover:cursor-pointer hover:bg-turqoiseGreen
                    ${selectedPage === 'Account settings' ? "bg-darkPink" : null}`}>
                    <p>Account settings</p>
                </div>
            </div>
            <div className="h-full w-85p">
                <ProfileOverview />
            </div>
        </div>
    );
}

export default PlayerDetails;