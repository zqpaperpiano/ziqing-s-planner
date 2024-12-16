import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { DungeonContext } from "../DungeonContext/DungeonContext";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

// completionPercentage
// : 
// "0.00"
// dungeonCheckpoints
// : 
// [{…}]
// dungeonDescription
// : 
// "sadcsxc"
// dungeonName
// : 
// "sacx"

const DungeonDetailCard = () => {
    const [dungeon, setDungeon] = useState(null);
    const { dungeonID } = useParams();
    const { dungeonList } = useContext(DungeonContext);

    useEffect(() => {
        setDungeon(dungeonList[dungeonID]);
    }, [dungeon])

    return(
        <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{duration: 0.3}}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            {
                !dungeon ? 
                <CircularProgress /> :
                <div className="h-4/5 w-3/4 bg-gradient-to-b from-[#d6cdd0] to-[#b8a9b1] rounded-lg">
                    <p>{dungeon.dungeonName}</p>
                    <p>{dungeon.dungeonDescription}</p>
                    <p>{dungeon.completionPercentage}</p>
                </div>
            }
        </motion.div>
    );
}

export default DungeonDetailCard;