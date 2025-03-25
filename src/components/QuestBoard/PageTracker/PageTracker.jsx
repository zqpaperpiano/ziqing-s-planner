import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const PageTracker = ({ maxPages, currPage }) => {
    const [tracking, setTracking] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let tempArr = []
        for(let i = 0; i < maxPages; ++i){
            if(i===(currPage - 1)){
                tempArr.push({[i] :true});
            }else{
                tempArr.push({ [i] : false});
            }
        }
        setTracking(tempArr);
    }, [maxPages])

    const handleClickedNavigator = (num) => {
        navigate(`/dungeon-board/${num}`)
    }

    return(
        <div className="h-85p w-30p mx-auto flex justify-center">
            {tracking.map((tracks, index) => {
                const isActive = Object.values(tracks)[0];
                return(
                    <div
                        className="w-30p h-full text-xs mb-2 hover:cursor-pointer"
                        key={index}
                        onClick={() => handleClickedNavigator(parseInt(index) + 1)}
                    > 
                        <p
                        style={{
                            color: isActive ? "#003366" : "#555555"
                        }}
                        >{parseInt(Object.keys(tracks))+ 1}</p>
                    </div>
                )
            }
            )}
        </div>
    );
}

export default PageTracker;