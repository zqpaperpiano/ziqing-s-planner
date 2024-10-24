import './Overview.css';
import AdventureLog from '../AdventureLog/AdventureLog';
import cover from '../../images/cover2.png'
import React, {useEffect, useState} from 'react';
import profilePic from '../../images/profile-pic.jpg';
import FlipClock from '../FlipClock/FlipClock';
import Anxiety from '../../images/monsters/1.png';
import Failure from '../../images/monsters/2.png';
import Overwhelmed from '../../images/monsters/3.png';
import Rejection from '../../images/monsters/4.png';
import { Tooltip } from '@mui/material';


const Overview = () => {
  const [HP, setHP]= useState(100)
  const [SP, setSP] = useState(70)

  useEffect(() => {
    addLogEntry('Welcome Player')
  }, [])

  useEffect(() => {
    if(HP < 50){
      addLogEntry('Warning! Health is low!');
    }
  }, [HP])

  const handleHPDmg = () => {
    setHP((prevVal) => Math.max(0, prevVal - 10)) 
  }
  
  const handleSPDmg = () => {
    setSP((prevVal) => Math.max(0, prevVal - 10))
  }

  const addLogEntry = (message) => {
    const logDiv = document.getElementsByClassName("damage-log")[0];
    const timestamp = new Date().toLocaleTimeString(); // Generate timestamp
    const newLogEntry = document.createElement('p'); // Create a new paragraph element
    newLogEntry.textContent = `${timestamp} - ${message}`; // Set content with timestamp
    logDiv.appendChild(newLogEntry);
  }

  const dmgHandler = (monster) => {
    handleHPDmg();
    addLogEntry(`Player has taken damage from ${monster}`)
    // console.log(HP);
  }

  const hpBarWidth = `${(HP / 100) * 100}%`;
  const spBarWidth = `${(SP / 70) * 100}%`;

  return(
      <div className="overview-frame">
         <div className="player-details">
            <div className="player-frame">
                <div className="player-picture">
                    <img src={profilePic} className="pfp" />
                </div>
                <div className="player-summary">
                    <p><b>Name: </b>Ziqing</p>
                    <p><b>Status: </b>Looking forward to Bali</p>
                </div>
            </div>
            <div className="player-stats">
                <div className="stats-tracker">
                  <div className="stats-bars">
                      <p>HP</p>
                      <div className="stat-bar">
                        <div className="hp-bar-fill" style={{ width: hpBarWidth}}>
                          <span>{HP}</span>
                        </div>
                      </div>
                      <p>SP</p>
                      <div className="stat-bar">
                        <div className="sp-bar-fill" style={{width: spBarWidth}} >
                          <span>{SP}</span>
                        </div>
                      </div>
                      {/* <p>EXP</p> */}
                  </div>
                  <div className="damage-log">
                    <h2>Log</h2>
                  </div>
                </div>
                <div className="third-box">
                  <div className="day-tracker">
                    <FlipClock />
                  </div>
                  <div className="monster-selection">
                    
                      <div onClick={() => {dmgHandler('Anxiety')}} className="monster-container">
                      <Tooltip title="Anxiety">
                        <img src={Anxiety} className="monster" />
                      </Tooltip>
                      </div>
                      
                      <div onClick={handleHPDmg} className="monster-container">
                        <Tooltip title="Failure">
                          <img src={Failure} className="monster" />
                        </Tooltip>
                      </div>
                      
                      <div onClick={handleHPDmg} className="monster-container">
                        <Tooltip title="Rejection">
                            <img src={Rejection} className="monster" />
                          </Tooltip>
                      </div>
                      
                      <div onClick={handleHPDmg} className="monster-container">
                        <Tooltip title="Overwhelmed">
                            <img src={Overwhelmed} className="monster" />
                        </Tooltip>
                      </div>

                  </div>
                </div>
            </div>
            
         </div>
      </div>

  )
}

export default Overview;
