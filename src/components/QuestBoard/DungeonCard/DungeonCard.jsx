import React, {useState} from "react";
import { Button, CardActions, CardMedia } from "@mui/material";
import Dungeon from '../../../images/Dungeon1.png';
import {motion} from 'framer-motion';
import './DungeonCard.css';
import { useNavigate } from "react-router";

const DungeonCard = ({dungeon}) => {
    const [selected, setSelected] = useState(false);
    const navigate = useNavigate();

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
            }: {}}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 1
            }}
            className="h-full bg-gradient-to-b from-[#d6cdd0] to-[#b8a9b1] rounded-lg overflow-hidden selected-animation">
                <div className="relative h-full w-full flex flex-col items-center tf:p-4">
                    <div className="h-full w-full text-center flex flex-col pointer-event-none justify-center items-center font-silkscreen py-2">
                        <div className="h-[75px] w-[75px]">
                            <img src={Dungeon} className="h-full w-full object-fit" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs tf:text-xl">{dungeon[1].dungeonName}</p>
                            <p className="text-xs italic text-slate-700 font-grapeNuts hidden h-sm:block">{dungeon.dungeonDescription}</p>
                            <p className="text-xs tf:text-l h-sm:text-l">Completed: {dungeon[1].completionPercentage * 100}%</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 h-fit w-full font-silkscreen p-2 flex flex-col tf:flex-row justify-around">
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => {
                                setSelected(true);
                                setTimeout(() => {
                                    navigate(`/dungeon/${dungeon[0]}`)
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