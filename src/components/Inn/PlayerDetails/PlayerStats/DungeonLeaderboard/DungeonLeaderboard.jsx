import React from "react";

const DungeonLeaderboard = () => {
    const [selectedDisplay, setSelectedDisplay] = useState("Longest Dungeons");

    const onClickLD = () => {
        setSelectedDisplay("Longest Dungeons");
    }

    const onClickRC = () => {
        setSelectedDisplay("Recent Clears");
    }

    const onClickFC = () => {
        setSelectedDisplay("Fastest Clears");   
    }
    return(
        <div className="h-2/3 qp:h-full w-full qp:w-1/3 flex flex-col border-none qp:border-solid qp:border-l-2 border-darkPink"> 
                <div className="w-full h-10 qp:h-12 border-b-2 border-darkPink flex"> 
                    <div className="w-full h-full grid grid-cols-3 flex items-center ">
                        <p 
                        onClick={() => {onClickLD()}}
                        className={`text-center hover:underline decoration-deepPink hover:cursor-pointer
                        ${selectedDisplay === "Longest Dungeons" ? "underline" : null}
                        `}>Longest Dungeons</p>
                        <p 
                        onClick={() => {onClickRC()}}
                        className={`text-center hover:underline decoration-deepPink hover:cursor-pointer
                        ${selectedDisplay === "Recent Clears" ? "underline" : null}
                        `}>Recent Clears</p>
                        <p 
                        onClick={() => {onClickFC()}}
                        className={`text-center hover:underline decoration-deepPink hover:cursor-pointer
                        ${selectedDisplay === "Fastest Clears" ? "underline" : null}
                        `}>Fastest Clears</p>
                    </div>
                </div> 
            </div> 
    );
}

export default DungeonLeaderboard;