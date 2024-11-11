import React, { useState } from "react";
import './landingPage.css';
import AdventureLog from "./components/AdventureLog/AdventureLog";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Overview from "./components/Overview/Overview";
import Inn from "./components/Inn/Inn";
import cover from './images/cover2.png'
import DungeonBoard from "./components/QuestBoard/DungeonBoard";
import { DungeonProvider } from "./components/QuestBoard/DungeonContext/DungeonContext";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const LandingPage = () => {
    const defPlayer = {
        "playerID": -1,
        "playerEmail": "",
        "playerName": "",
    }

    const [player, setPlayer] = useState(defPlayer);
    const [menuOpen, setMenuOpen] = useState(false);


    const onToggleMenu = () => {
        if(menuOpen){
            setMenuOpen(false);
        }else{
            setMenuOpen(true);
        }
    }

    const handleUserLogIn = (player) => {
        
    }

    return(
        //container
        <div className="container relative h-screen w-screen flex justify-center overflow-hidden"> 
            {
                menuOpen ?
                <div className="absolute left-0 w-15vw h-screen bg-bgPink bg-opacity-30 backdrop-blur-sm
                ">
                    <CloseIcon 
                    onClick={() => {onToggleMenu()}}
                    fontSize="large" className="mt-1 ml-2 hover:cusor-pointer" />
                    <AdventureLog />
                </div>
                : <div 
                    onClick={() => {onToggleMenu()}}
                    className="h-screen flex justify-center absolute left-2 top-2 hover:cursor-pointer"
                >
                    <MenuIcon fontSize="large" />
                </div>
            }
            <div className={` ${menuOpen ? "absolute right-0" : null } w-85vw h-screen bg-bgPink flex flex-col`}>
                <Router>
                    <DungeonProvider>
                        <Routes>
                            <Route path="/" element={<Overview />} />
                            <Route path="/dungeon-board/:page-number" element={<DungeonBoard />} />  
                            <Route path="/inn" element={<Inn player={player}/>} />
                        </Routes>   
                    </DungeonProvider>
                </Router>
            </div>

            {/*cover*/}
            {/* <div className= "w-85vw h-30vh p-0 m-0"> 
                <img src={cover} className="h-full w-full object-fill" />
            </div> */}
        </div>
    );
}

export default LandingPage;