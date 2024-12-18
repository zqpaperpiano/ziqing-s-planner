import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { DungeonContext } from "../DungeonContext/DungeonContext";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import Checkpoints from "./Checkpoints";
import { Check } from "lucide-react";

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
        console.log(dungeon)
        setDungeon(dungeonList[dungeonID]);
    }, [dungeon])

    return(
        <motion.div 
        initial={{ opacity: 0, rotateY: 90}}
        animate={{ opacity: 1, rotateY: 180}}
        transition={{duration: 0.3}}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            {
                !dungeon ? 
                <CircularProgress /> :
                <div className="h-4/5 w-3/4 transform rotate-y-180 bg-gradient-to-b from-[#d6cdd0] to-[#b8a9b1] rounded-lg">
                    <div className="h-full w-full flex items-center justify-center font silkscreen flex-col">
                        <p className="text-3xl">{dungeon.dungeonName}</p>
                        <p className="italic">{dungeon.dungeonDescription}</p>
                        <Checkpoints checkpoints={dungeon.dungeonCheckpoints} />
                    </div>
                </div>
            }
        </motion.div>
    );
}

export default DungeonDetailCard;