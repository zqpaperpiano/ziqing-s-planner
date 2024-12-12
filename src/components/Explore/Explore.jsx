import React, { useEffect, useState } from "react";
import AdventureDetails from "./Components/AdventureDetails";
import Exploration from "./Components/Exploration";

const Explore = () => {
    const [adventureDeets, setAdventureDeets] = useState(null);
    const [inExploration, setInExploration] = useState(false);

    const handleNewAdventureDeets = (duration, purpose, dungeon) => {
        setAdventureDeets({
            "duration": duration,
            "purpose": purpose,
            "dungeon": dungeon
        });
        setInExploration(true);
    }

    useEffect(() => {
        console.log(adventureDeets);
    }, [adventureDeets])


    return(
        <div className="h-full w-full">
            {
                !adventureDeets && !inExploration &&
                <AdventureDetails onStartExploration={handleNewAdventureDeets}/>
                // <Exploration />
            }

        </div>
    );
}

export default Explore; 