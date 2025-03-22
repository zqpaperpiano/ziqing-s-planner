import React, { useContext, useState } from "react";
import TimePicker from "../../TimePicker/TimePicker";
import { FormControl, InputLabel, MenuItem, Select, Button } from "@mui/material";
import DungeonSelector from "../../DungeonSelector/DungeonSelector";
import { DungeonContext } from "../../../contexts/DungeonContext";
import { ToastContainer, toast } from 'react-toastify';

const AdventureDetails = ({ onStartExploration }) => {
    const [duration, setDuration] = useState(0);
    const [purpose, setPurpose] = useState('misc');
    const [selectedDungeon, setSelectedDungeon] = useState(null);
    const {dungeonList} = useContext(DungeonContext);

    const onDurationChange = (duration) => {
        let mins = parseInt(duration.slice(0, 2));
        setDuration(mins);
    }

    const onPurposeChange = (e) => {
        setPurpose(e.target.value);
    }

    const onDungeonChange = (dungeonId) => {
        const dungeonDeets = dungeonList[dungeonId]
        setSelectedDungeon(dungeonDeets);
    }

    const handleClickStart = () => {
        if(purpose !== 'misc' && !selectedDungeon){
            toast.error('Please select a dungeon first!');
        }else if(purpose === 'misc'){
            onStartExploration(duration, purpose, null);
        }else{
            onStartExploration(duration, purpose, selectedDungeon);
        }
        
    }

    return(
        <div className="relative h-full w-full flex flex-col items-center justify-center">
                <ToastContainer />

            <div className="h-4/5 w-95p flex">
                <div className="relative w-1/2 h-full aspect-square flex flex-col items-center justify-center">
                    <TimePicker handleChangeDuration={onDurationChange}/>
                </div>
                <div className="h-full w-1/2 flex flex-col justify-center items-center px-2 gap-4">
                    <FormControl fullWidth>
                        <InputLabel
                            sx={{fontFamily: 'silkscreen'}}
                            id="exploration-cat-label">
                                Exploration Purpose
                        </InputLabel>
                        <Select
                            id="exploration-cat"
                            labelId="exploration-cat-label"
                            label="Exploration purpose"
                            fullWidth
                            value={purpose}
                            onChange={onPurposeChange}
                            sx={{
                                fontFamily: 'silkscreen'
                            }}
                        >
                            <MenuItem
                                sx={{fontFamily: 'silkscreen'}}
                                value={'misc'}>
                                    <p>General exploration</p>
                            </MenuItem>
                            <MenuItem
                                sx={{fontFamily: 'silkscreen'}}
                                value={'dungeons'}>
                                <p>Dungeon exploration</p>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {
                        purpose === 'dungeons' &&
                       <div className="h-fit w-full">
                         <DungeonSelector font={'silkscreen'} bgColor={'transparent'} height={'100%'} onDungeonChange={onDungeonChange}/>
                        </div>
                    }

                </div>
            </div>
            <Button
                onClick={handleClickStart}
                    sx={{
                        position:'absolute',
                        bottom: 20,
                        color: 'black',
                        backgroundColor: '#F8BDD1',
                        fontFamily: 'silkscreen',
                        '&:hover':{
                            backgroundColor: '#BDF8E4'
                        }
                    }}
                >Start</Button>
        </div>
    );
}

export default AdventureDetails;