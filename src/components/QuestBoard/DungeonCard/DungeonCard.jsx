import React, {useEffect, useState} from "react";
import { Button, CardActions, CardMedia } from "@mui/material";
import Dungeon from '../../../images/Dungeon1.png';
import {motion} from 'framer-motion';
import './DungeonCard.css';
import { useNavigate } from "react-router";

const DungeonCard = ({dungeon, page, handleRemoveDungeon}) => {
    const [selected, setSelected] = useState(false);
    const navigate = useNavigate();
    const gradientStart = dungeon[1]?.color ? Object.keys(dungeon[1].color) : '#d6cdd0';
    const gradientEnd = dungeon[1]?.color ? Object.values(dungeon[1].color)[0] : '#b8a9b1';

    return(
            <motion.div   
            initial={false}
            animate={ selected ? {
                position: 'fixed',
                top: '50%',
                left: '50%', 
                translateX: "-50%",
                translateY: "-50%",
                width: "75vw",
                height: "80vh",
                rotateY: 180
            }: {}}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 1.5,
                rotateY: {delay: 0.1, duration: 0.75}
            }}
            style={{
                backgroundImage: `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd})`,
              }}
            className={`relative h-full overflow-hidden  backface-hidden dungeon-card rounded-lg ${selected ? 'z-50' : 'z-10'}`}>
                <div 
                className="absolute inset-0 flex flex-col items-center tf:p-4">
                    <div className="h-full w-full text-center flex flex-col pointer-event-none justify-center items-center font-silkscreen py-2">
                        <div className="h-[75px] w-[75px]">
                            <img src={Dungeon} className="h-full w-full object-fit" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs tf:text-xl">{dungeon[1].dungeonName}</p>
                            <p className="text-xs italic text-slate-700 font-grapeNuts hidden h-sm:block">{dungeon.dungeonDescription}</p>
                            <p className="text-xs tf:text-l h-sm:text-l">Completed: {(dungeon[1].completionProgress * 100).toFixed(1)}%</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 h-fit w-full font-silkscreen p-2 flex flex-col tf:flex-row justify-around">
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => {
                                setSelected(true);
                                setTimeout(() => {
                                    navigate(`/dungeon-board/${page}/dungeon/${dungeon[0]}`)
                                }, 300)
                                }}
                            sx={{
                                fontSize: '0.75rem',
                                color: '#475569',
                                '&:hover':{
                                    color: 'white'
                                },
                                fontFamily: 'silkscreen'
                            }}>Details</Button>
                        <Button 
                            onClick={() => {handleRemoveDungeon(dungeon[0])}}
                            variant="text"
                            size="small"
                            sx={{
                                fontSize: '0.75rem',
                                color: '#475569',
                                '&:hover':{
                                    color: 'red'
                                },
                                fontFamily: 'silkscreen'
                            }}>Abandon</Button>
                    </div>
                </div>
            </motion.div>   
    );
}

export default DungeonCard;