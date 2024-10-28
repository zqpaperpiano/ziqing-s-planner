import React from "react";
import './landingPage.css';
import AdventureLog from "./components/AdventureLog/AdventureLog";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Overview from "./components/Overview/Overview";
import Inn from "./components/Inn/Inn";
import cover from './images/cover2.png'
import QuestBoard from "./components/QuestBoard/QuestBoard";

const LandingPage = () => {
    return(
        <div className="container">
            <div className= "cover"> 
                <img src={cover} className="cover-image" />
            </div>
            <Router>
                <AdventureLog />
                <div className="frame">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/quest-board" element={<QuestBoard />} />
                        <Route path="/inn" element={<Inn />} />
                    </Routes>
                </div>
            </Router>
            

        </div>
    );
}

export default LandingPage