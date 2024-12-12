import React, { useEffect, useState } from "react";
import CircularSlider from '@fseehawer/react-circular-slider';
import { Button } from "@mui/material";

const TimePicker = ({handleChangeDuration}) => {
    const [duration, setDuration] = useState("25:00");

    const onDurationChange = (value) => {
        setDuration(value);
        handleChangeDuration(value);
    }


    return(
        <div className="h-full w-full flex flex-col justify-center items-center text-center">
            <CircularSlider
                id="spec-slider"
                className="font-tester"
                onChange={onDurationChange}
                min={'10:00'}
                max={'120:00'}
                data={['10:00', '15:00' ,'20:00', '25:00', '30:00', '35:00', '40:00', '45:00',
                     '50:00', '55:00', '60:00', 
                    '65:00', '70:00', '75:00', '80:00', '85:00', '90:00', '95:00', '100:00', '105:00',
                    '110:00', '115:00', '120:00'
                ]}
                hideKnobRing
                hideLabelValue
                labelColor="#333333"
                labelFontSize="1.5rem"
                progressColorFrom="#f8bdd1"
                progressColorTo="#fdebf1"
                trackColor="#e6c3c9"
                knobColor="#B25D7B"
            />
            <div className="absolute h-fit w-fit flex flex-col items-center justify-center">
                <div className="w-fit h-fit flex flex-col items-center justify-center font-silkscreen text-2xl">
                    <p>Duration</p>
                    <p>(Minutes)</p>
                </div>
                <p className="font-tiny5 text-4xl">{duration}</p>
            </div>
        </div>
    )
}

export default TimePicker;