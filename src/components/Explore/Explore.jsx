import React, { useEffect, useState } from "react";
import AdventureDetails from "./Components/AdventureDetails";
import Exploration from "./Components/Exploration";
import { config } from "process";

const Explore = () => {
    const [adventureDeets, setAdventureDeets] = useState(null);
    const [inExploration, setInExploration] = useState(false);

    const handleNewAdventureDeets = (duration, purpose, dungeon) => {
        if(!dungeon){
            setAdventureDeets({
                "duration": duration,
                "purpose": purpose
            });
        }else{
            setAdventureDeets({
                "duration": duration,
                "purpose": purpose,
                "dungeon": dungeon
            });
        }
        setInExploration(true);
    }



    const exitExplortaion = () => {
        setInExploration(false);
        setAdventureDeets(null);
    }


    return(
        <div className="h-full w-full">
            {
                !adventureDeets && !inExploration ?
                <AdventureDetails onStartExploration={handleNewAdventureDeets}/> :
                <Exploration details={adventureDeets} handleExitExploration={exitExplortaion}/>
            }

        </div>
    );
}

export default Explore; 