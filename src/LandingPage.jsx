import React from "react";
import './landingPage.css';
import AdventureLog from "./components/AdventureLog/AdventureLog";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Overview from "./components/Overview/Overview";
import Inn from "./components/Inn/Inn";
import cover from './images/cover2.png'
import QuestBoard from "./components/QuestBoard/QuestBoard";
import { QuestProvider } from "./components/QuestBoard/QuestContext/QuestContext";

const LandingPage = () => {
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
                <div className="w-85vw h-63vh bg-bgPink flex flex-col overflow-hidden">
                <QuestProvider>
                    <Routes>
                            <Route path="/" element={<Overview />} />
                            <Route path="/quest-board/quest-page/:page-number" element={<QuestBoard />} />
                            <Route path="/inn" element={<Inn />} />
                    </Routes>
                    </QuestProvider>
                </div>
            </Router>
            

        </div>
    );
}

export default LandingPage