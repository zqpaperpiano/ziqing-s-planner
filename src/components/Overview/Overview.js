import './Overview.css';
import AdventureLog from '../AdventureLog/AdventureLog';
import cover from '../../images/cover2.png'
import React, {useState} from 'react';
import profilePic from '../../images/profile-pic.jpg';
import FlipClock from '../FlipClock/FlipClock';



const Overview = () => {
  const [HP, setHP]= useState(100)
  const [SP, setSP] = useState(70)

  const handleHPDmg = () => {
    setHP((prevVal) => prevVal - 10)
  }
  
  const handleSPDmg = () => {
    setSP((prevVal) => prevVal - 10)
  }

  return(
    <div className="">
      <div className="frame">
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

                  </div>
                  <div className="damage-log">
                    <h2>Log</h2>
                  </div>
                </div>
                <div className="third-box">
                  <div className="day-tracker">
                    <FlipClock />
                  </div>
                  <div className="damage-counter">
                    <div className="physical-dmg dmg-box">
                      {/* <button className="dmg-btn" onClick={handleHPDmg} /> */}
                    </div>
                    <div className="san-dmg dmg-box">
                    {/* <button className="dmg-btn" onClick={handleSPDmg} /> */}
                    </div>
                  </div>
                </div>
            </div>
            
         </div>
      </div>
    </div>
  )
}

export default Overview;
