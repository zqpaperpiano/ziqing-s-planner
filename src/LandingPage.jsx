import React, { useState } from "react";
import './landingPage.css';
import AdventureLog from "./components/AdventureLog/AdventureLog";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Overview from "./components/Overview/Overview";
import Inn from "./components/Inn/Inn";
import cover from './images/cover2.png'
import DungeonBoard from "./components/QuestBoard/DungeonBoard";
import { DungeonProvider } from "./components/QuestBoard/DungeonContext/DungeonContext";

const LandingPage = () => {
    const defPlayer = {
        "playerID": -1,
        "playerEmail": "",
        "playerName": "",
    }

    const [player, setPlayer] = useState(defPlayer);

    const handleUserLogIn = (player) => {
        
    }

    return(
        //container
        <div className="container flex flex-col h-screen items-center"> 
            {/*cover*/}
            <div className= "w-85vw h-30vh p-0 m-0"> 
                <img src={cover} className="h-full w-full object-fill" />
            </div>
            <Router>
                <div className="w-85vw h-7vh">
                    <AdventureLog />
                </div> 
                <div className="w-85vw h-63vh bg-bgPink flex flex-col">
                <DungeonProvider>
                    <Routes>
                            <Route path="/" element={<Overview />} />
                            <Route path="/dungeon-board/:page-number" element={<DungeonBoard />} />  
                            <Route path="/inn" element={<Inn player={player}/>} />
                    </Routes>
                    </DungeonProvider>
                </div>
            </Router>
            

        </div>
    );
}

export default LandingPage