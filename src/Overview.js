import './Overview.css';
import AdventureLog from './components/AdventureLog/AdventureLog';
import cover from './images/cover2.png'
import React from 'react';

const Overview = () => {

  return(
    <div className="container">
      <div className="cover">
        <img src={cover} className="cover-image"/>
      </div>
      <div className="frame">
        <AdventureLog />
         <div className="player-details">
            <div className="player-frame">
                <div className="player-picture">
                </div>
                <div className="player-summary">
                </div>
            </div>
            <div className="player-stats">
                <div className="damage-counter">
                </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Overview;
