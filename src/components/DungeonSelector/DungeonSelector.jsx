import React, { useState, useContext, useEffect } from "react";
import { DungeonContext } from "../QuestBoard/DungeonContext/DungeonContext";
import { MenuItem, Select } from "@mui/material";

const DungeonSelector = ({  }) => {
    const {dungeonList, setDungeonList} = useContext(DungeonContext);
    const [selectedDungeon, setSelectedDungeon] = useState("");
    const onSelectDungeon = (e) => {
        setSelectedDungeon(e.target.value);
    }

    useEffect(() => {
        console.log(selectedDungeon);
    }, [selectedDungeon]);

    return(
        <div className="h-full w-full">
            <Select
                onChange={onSelectDungeon}
                value={selectedDungeon}
                label="Choose the dungeon to clear"
                fullWidth
                sx={{
                    fontFamily: 'PatrickHand'
                }}
            >
                {
                    dungeonList.map((dungeon, index) => {
                        return(
                            <MenuItem
                        sx={{
                            fontFamily: 'PatrickHand'
                        }}
                            value={dungeon[0].dungeonID}>
                                {dungeon[0].dungeonName}
                        </MenuItem>
                        )

                    })
                }
            </Select>
        </div>
    );
}

export default DungeonSelector;