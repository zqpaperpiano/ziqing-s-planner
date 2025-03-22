import React, { useEffect } from "react";
import { XIcon } from "raster-react";
import explorationEndAlert from './exploration-end-alert.wav';
import completedStamp from '../../../images/CompleteStamp.png';
import abandonedStamp from '../../../images/AbandonedStamp.png';
import stampSoundEffect from '../../../sounds/traditional-stamp-44189.mp3'
import { motion } from "framer-motion";

const ExplorationEndPage = ({ details, onExitSumamry, timeLeft }) => {
    const elapsedTimeInSeconds = details.duration * 60 - timeLeft;
    const elapsedMinutes = Math.floor(elapsedTimeInSeconds / 60);
    const elapsedSeconds = elapsedTimeInSeconds % 60;  
    
    const playSound = () => {
        const sound = new Audio(explorationEndAlert);
        sound.play();
    }

    const playStampSound = () => {
        const stampSound = new Audio(stampSoundEffect);
        stampSound.play();
    }

    useEffect(() => {
        playSound();

        setTimeout(() => {
            playStampSound();
        }, 1500)
    }, [])

    return(
        <div className="inset-0 fixed bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="relative bg-bgPink w-2/5 h-2/3 rounded-lg">

                <div className="bg-deepPink w-full rounded-t-lg flex items-center px-2 text-black" style={{height: '12%', fontFamily: 'source-code-pro'}}>
                    <p className="text-xl font-bold">Exploration Summary</p>
                    <XIcon 
                    onClick={onExitSumamry}
                    size={50} color="" strokeWidth={0.25} radius={1} style={{height: '12%'}} className="absolute right-0 rounded-tr-lg w-12 hover:cursor-pointer hover:bg-white hover:bg-opacity-30"/>
                </div>

                <div className="relative w-full rounded-b-lg flex flex-col gap-2 justify-center  items-center p2 text-black" style={{height: '88%', fontFamily: 'source-code-pro'}}>
                    <p>Exploration Purpose: {details.purpose}</p>
                    {
                        details.dungeon && <p>Dungeon: {details.dungeon.dungeonName}</p>
                    }
                    <p>Time Elapsed: {elapsedMinutes}:{elapsedSeconds < 10 ? '0' + elapsedSeconds : elapsedSeconds}</p>
                    <motion.img
                        src={timeLeft === 0 ? completedStamp : abandonedStamp}
                        className="absolute right-0 bottom-0 h-1/3"
                        initial={{ y: -100, opacity: 0, rotate: -10, scale: 2 }} // Starts off-screen
                        animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }} // Drops down
                        transition={{ 
                            type: "spring", 
                            stiffness: 100, 
                            damping: 10, 
                            delay: 1.5 // <-- Delays animation by 1.5 seconds
                        }}
        />

                    <button onClick={onExitSumamry} className="absolute bottom-4 bg-deepPink rounded-lg px-4 py-2 mt-4">OK</button>
                </div>

            </div>
        </div>
    )
}

export default ExplorationEndPage;