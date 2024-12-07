import React, { useState, useContext, useEffect } from "react";
import { DungeonContext } from "../QuestBoard/DungeonContext/DungeonContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
            <FormControl fullWidth>
                <InputLabel
                    id="dungeon-selector"
                    sx={{
                        marginBottom: '10px'
                    }}
                >Dungeon</InputLabel>
                <Select
                    onChange={onSelectDungeon}
                    labelId="dungeon-selector"
                    value={selectedDungeon}
                    label="Dungeon"
                    fullWidth
                    sx={{
                        height: '40px',
                        backgroundColor: '#f5f5f5',
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
            </FormControl>
        </div>
    );
}

export default DungeonSelector;