import React from "react";
import { useLocation, useParams } from "react-router";
import QuestCard from "../QuestCard/QuestCard";

const QuestPage = ({questList, page}) => {
    // console.log('my page is', page);
    const questsPerPage = 3;
    const startIndex = (page - 1) * questsPerPage;
    // console.log(`my start index is ${startIndex}`);

    if(startIndex < 0 || startIndex >= questList.length){
        return <div>There is nothing on this page....</div>
    }

    const shownQuests = questList.slice(startIndex, startIndex + questsPerPage)
    // console.log(shownQuests);

    return(
        <div className="absolute h-full w-full grid grid-cols-3 gap-4">
            {shownQuests.map((quest, index) => {
                return <QuestCard key={index} quest={quest[0]} />
            })}
        </div>

    );
}

export default QuestPage;