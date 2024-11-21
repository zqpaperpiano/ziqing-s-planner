import React, {useState} from "react";
import { Button, CardActions, CardMedia } from "@mui/material";
import Dungeon from '../../../images/Dungeon1.png';

const DungeonCard = ({dungeon}) => {
    return(
            <div className=" h-full bg-gradient-to-b from-[#d6cdd0] to-[#b8a9b1] rounded-lg overflow-hidden">
                <div className="relative h-full w-full flex flex-col items-center tf:p-4">
                    <div className="h-full w-full text-center flex flex-col justify-center items-center font-silkscreen py-2">
                        <div className="h-[75px] w-[75px]">
                            <img src={Dungeon} className="h-full w-full object-fit" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs tf:text-xl">{dungeon.dungeonName}</p>
                            <p className="text-xs italic text-slate-700 font-grapeNuts hidden h-sm:block">{dungeon.dungeonDescription}</p>
                            <p className="text-xs tf:text-l h-sm:text-l">Completed: {dungeon.completionPercentage * 100}%</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 h-fit w-full font-silkscreen p-2 flex flex-col tf:flex-row justify-around">
                        <Button
                            variant="text"
                            size="small"
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
            </div>
    );
}

export default DungeonCard;