import React, { useState } from "react";
import './landingPage.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Overview from "./components/Overview/Overview";
import Inn from "./components/Inn/Inn";
import cover from './images/cover2.png'
import DungeonBoard from "./components/QuestBoard/DungeonBoard";
import { DungeonProvider } from "./components/QuestBoard/DungeonContext/DungeonContext";
import HamburgerMenu from "./components/AdventureLog/HamburgerMenu/HamburgerMenu";
import FullNavBar from "./components/AdventureLog/FullNavBar/FullNavBar";
import NewPlayerSettings from "./components/NewPlayerSettings/NewPlayerSettings";
import Shop from "./components/Shop/Shop";
import WarRoom from "./components/WarRoom/WarRoom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventCreator from "./components/WarRoom/components/EventCreator";
import LogInSignUp from "./components/Inn/LogInSignUp/LogInSignUp";

const LandingPage = () => {
    const defPlayer = {
        "playerID": 1,
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
        <div className="h-screen w-screen bg-gradient-to-b from-gradientStart via-gradientMid to-gradientEnd">
            
            <Router>
                <div className="relative h-screen w-screen flex md:flex-col md:justify-center md:items-center overflow-hidden ">
                    <div className="md:w-85vw md:h-7vh hidden md:block">
                        <FullNavBar />
                    </div>

                    <div className="md:hidden">
                        <HamburgerMenu />
                    </div>

                    <div className="md:h-screen h-93vh w-85vw bg-bgPink overflow-hidden">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DungeonProvider>
                                <Routes>
                                    <Route path="/" element={<Overview />} />
                                    <Route path="/dungeon-board/:page-number" element={<DungeonBoard />} />  
                                    <Route path="/inn" element={<Inn player={player}/>} />
                                    <Route path="/newPlayer/" element={<NewPlayerSettings  player={player}/>}/>
                                    <Route path="/shop/" element={<Shop />} />
                                    <Route path="/warRoom" element={<WarRoom />} />
                                    <Route path="/logIn" element={<LogInSignUp />} />
                                </Routes>   
                            </DungeonProvider>
                        </LocalizationProvider>
                    </div>
                </div>
            </Router>
            
            

            {/*cover*/}
            {/* <div className= "w-85vw h-30vh p-0 m-0"> 
                <img src={cover} className="h-full w-full object-fill" />
            </div> */}
            
        </div>
    );
}

export default LandingPage;