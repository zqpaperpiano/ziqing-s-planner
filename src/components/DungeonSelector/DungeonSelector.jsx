import React, { useState, useContext, useEffect } from "react";
import { DungeonContext } from "../QuestBoard/DungeonContext/DungeonContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DungeonSelector = ({bgColor, font, height, onDungeonChange}) => {
    const {dungeonList} = useContext(DungeonContext);
    const [selectedDungeon, setSelectedDungeon] = useState("");

    const onSelectDungeon = (e) => {
        let dungeonId = e.target.value;
        let dungeonInfo = dungeonList[dungeonId];
        console.log(dungeonList);
    }

    
    const newBgColor = bgColor || '#f5f5f5';
    const newfont = font || 'PatrickHand' ;
    const newHeight = height || '40px';

    return(
        <div className="h-full w-full">
            <FormControl fullWidth>
                <InputLabel
                    id="dungeon-selector"
                    sx={{
                        marginBottom: '10px',
                        fontFamily: newfont
                    }}
                >Dungeon</InputLabel>
                <Select
                    onChange={onSelectDungeon}
                    labelId="dungeon-selector"
                    value={selectedDungeon}
                    label="Dungeon"
                    fullWidth
                    sx={{
                        height: newHeight,
                        backgroundColor: newBgColor,
                        fontFamily: newfont
                    }}
                >
                    {
                        dungeonList.map((dungeon, index) => {
                            return(
                                <MenuItem
                            sx={{
                                fontFamily: newfont
                            }}
                                value={dungeon[0].dungeonID}>
                                    {dungeon[0].dungeonName}
                            </MenuItem>
                            )

                        })
                    }
                </Select>
            </FormControl>
        </div>
    );
}

export default DungeonSelector;