import React, { useContext, useEffect, useState } from "react";
import { XIcon } from "raster-react";
import explorationEndAlert from './exploration-end-alert.wav';
import completedStamp from '../../../images/CompleteStamp.png';
import abandonedStamp from '../../../images/AbandonedStamp.png';
import stampSoundEffect from '../../../sounds/traditional-stamp-44189.mp3'
import { motion } from "framer-motion";
import { UserStatContext } from "../../../contexts/userStatContext";
import config from '../../../config/config.json';
import { AuthContext } from "../../../contexts/authContext";

const ExplorationEndPage = ({ details, onExitSumamry, timeLeft }) => {
    const { userStats, setUserStats, difficultyModifier } = useContext(UserStatContext);
    const { tokenRefresh } = useContext(AuthContext);
    const elapsedTimeInSeconds = details.duration * 60 - timeLeft;
    const elapsedMinutes = Math.floor(elapsedTimeInSeconds / 60);
    const elapsedSeconds = elapsedTimeInSeconds % 60;  

    const toNextLevel = userStats.toNextLevel;
    const currXp = userStats.xp;
    const gain = elapsedMinutes * difficultyModifier;
    const bonus = timeLeft === 0 ? elapsedMinutes * 0.5 : 0;
    const [displayXp, setDisplayXp] = useState(userStats.xp);
    const [phase, setPhase] = useState(1);
    
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

    useEffect(() => {
        const newXp = currXp + gain;
        if (newXp >= toNextLevel) {
            setDisplayXp(toNextLevel);
        } else {
            setDisplayXp(newXp);
        }
    
        // Step 2: Delay for 2 seconds, then animate extra bonus EXP
        setTimeout(() => {
            if (timeLeft === 0) {
                setPhase(2);
                setDisplayXp((prevXp) => {
                    let afterBonusXp = prevXp + bonus;
                    return afterBonusXp >= toNextLevel ? toNextLevel : afterBonusXp;
                });
            }
        }, 2000);
    }, [gain, bonus, timeLeft]);

    const handleXpGain = () => {
        const newXp = currXp + gain + bonus;
        console.log('currXp: ', currXp, ' gain: ', gain, ' bonus: ', bonus, ' newXp: ', newXp);

        if(newXp < toNextLevel){
            const updates = {
                xp: newXp
            }
            handleUserStatChanges(updates, false);
        }else{
            const updates = {
                level: userStats.level + 1,
                xp: newXp - toNextLevel,
                toNextLevel: 100 + 50 * (userStats.level + 1)^2
            }
            handleUserStatChanges(updates, false);
        }

    }

    const handleUserStatChanges = async(updates, retry) => {
        try{
            console.log('hello')
            const resp = await fetch(`${config.development.apiURL}userStats/update`, {
                method: 'POST', 
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    updates: updates
                })
            });

            if(resp.status === 401){
                if(retry){
                    await tokenRefresh();
                    handleUserStatChanges(updates, true);
                    return;
                }
                throw new Error('Unauthorized');
            }

            if(resp.ok){
                const data = await resp.json();
                setUserStats(data);
            }
            
        }catch(err){
            console.log('an error has occured: ', err);
        }
    }

    useEffect(() => {handleXpGain()}, [])



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
                    <p className="flex">Exp gained: { gain }  
                        <motion.div
                        className="pl-2"
                        initial={{ y: -100, opacity: 0, rotate: -10, scale: 2 }} // Starts off-screen
                        animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }} // Drops down
                        transition={{ 
                            type: "spring", 
                            stiffness: 100, 
                            damping: 10, 
                            delay: 2 // <-- Delays animation by 1.5 seconds
                        }}> +{bonus}</motion.div>
                    </p>
                    <div className="h-4 w-4/5 rounded-lg bg-white">
                        <motion.div 
                        key={phase}
                        initial={{width: `${currXp / toNextLevel * 100}%`}}
                        animate={{width: `${displayXp / toNextLevel * 100}%`}}
                        transition={{duration: 1}}
                        className="rounded-lg h-full bg-deepPink"/>
                    </div>
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