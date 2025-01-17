import React, { useContext, useEffect, useState } from "react";
import './landingPage.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Overview from "./components/Overview/Overview";
import Inn from "./components/Inn/Inn";
import DungeonBoard from "./components/QuestBoard/DungeonBoard";
import { DungeonProvider } from "./components/QuestBoard/DungeonContext/DungeonContext";
import HamburgerMenu from "./components/AdventureLog/HamburgerMenu/HamburgerMenu";
import FullNavBar from "./components/AdventureLog/FullNavBar/FullNavBar";
import NewPlayerSettings from "./components/NewPlayerSettings/NewPlayerSettings";
import Shop from "./components/Shop/Shop";
import WarRoom from "./components/WarRoom/WarRoom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthProvider } from "./config/authContext";
import LogInSignUp from "./components/Inn/LogInSignUp/LogInSignUp";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { EventProvider } from "./components/WarRoom/components/EventContext";
import Explore from "./components/Explore/Explore";
import DungeonDetailCard from "./components/QuestBoard/DungeonDetail/DungeonDetailCard";
import { ShopProvider } from "./components/Shop/shopComponents/ShopContext";

const LandingPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);


    const onToggleMenu = () => {
        if(menuOpen){
            setMenuOpen(false);
        }else{
            setMenuOpen(true);
        }
    }

    return(
        //container
        <div className="h-screen w-screen bg-gradient-to-b from-gradientStart via-gradientMid to-gradientEnd">
            <AuthProvider>
            <EventProvider>
            <DungeonProvider>
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
                            <EventProvider>
                            <ShopProvider>
                            <Routes>
                                <Route path="/logIn" element={<LogInSignUp />} />

                                <Route element={<ProtectedRoute />}>
                                    <Route path="/" element={<Overview />} />
                                    <Route path="/dungeon-board/:page-number" element={<DungeonBoard />} />  
                                    <Route path="/dungeon-board/:page-number/dungeon/:dungeonID" element={<DungeonDetailCard />} />
                                    <Route path="/inn" element={<Inn />} />
                                    <Route path="/newPlayer" element={<NewPlayerSettings />}/>
                                    <Route path="/shop/" element={<Shop />} />
                                    <Route path="/warRoom" element={<WarRoom />} />
                                    <Route path="/explore" element={<Explore />} />
                                </Route>
                            </Routes>     
                            </ShopProvider>  
                            </EventProvider>
                            </DungeonProvider>
                        </LocalizationProvider>
                    </div>
                </div>
            </Router>
            </DungeonProvider>
            </EventProvider>
            </AuthProvider>
        </div>
    );
}

export default LandingPage;
