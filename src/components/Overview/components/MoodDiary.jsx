import React, { useContext } from "react";
import { FrownIcon, SmileIcon, MehIcon } from "raster-react";
import { UserStatContext } from "../../../contexts/userStatContext";
import { ToastContainer, toast } from "react-toastify";

const MoodDiary = () => {
    const { difficultyModifier, setDifficultyModifier } = useContext(UserStatContext);

    const handleMoodSelection = ( modifyValue ) => {

        const toastId = 'mood-selection-toast';
        if(!toast.isActive(toastId)) toast.success('Mood has been recorded in diary!', {toastId});

        const today = new Date().toISOString().split("T")[0]
        var originalModifier = Object.values(difficultyModifier)[0] || 1;

        if(Object.keys(difficultyModifier)[0] !== today){
            const newValue = modifyValue === 0.75 ? 1 : modifyValue
            setDifficultyModifier({[today]: newValue});
        }else{
            setDifficultyModifier({[today]: Math.max(originalModifier * modifyValue, 1)});
        }
    }


    return(
        <div className="h-full w-full bg-darkPink flex flex-col justify-center items-center font-silkscnree justify-between">
            <p className="h-fit text-xl text-center">How are you feeling?</p>
              <div className="flex-1 items-center justify-between w-full flex bg-bgPink rounded-lg">

                <div onClick={() => {handleMoodSelection(1.2)}} title="upset" className="h-full w-1/3 flex justify-center items-center hover:cursor-pointer">
                <FrownIcon size={75} color="#1E3A8A" strokeWidth={0.25} radius={1} />
                </div>

                <div onClick={() => {handleMoodSelection(1.4)}} title="unmotivated" className="h-full w-1/3 flex justify-center items-center hover:cursor-pointer">
                  <MehIcon size={75} color="#6B7280" strokeWidth={0.25} radius={1} />
                </div>

                <div onClick={() => {handleMoodSelection(0.9)}} title="happy" className="h-full w-1/3 flex justify-center items-center hover:cursor-pointer">
                  <SmileIcon size={75} color="#F59E0B" strokeWidth={0.25} radius={1} />
                </div>
            </div>
        </div>
    )
}

export default MoodDiary;