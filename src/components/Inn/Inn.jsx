import React, { useState } from 'react'
import LogInSignUp from './LogInSignUp/LogInSignUp';
import PlayerDetails from './PlayerDetails/PlayerDetails';

const Inn = ( {player, setUser}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [onSignUp, setOnSignUp] = useState(false);

    const handleLoginSignupToggle = () => {
        if(onSignUp){
            setOnSignUp(false);
        }else{
            setOnSignUp(true);
        }
    }

    return(
        <div className="relative h-full w-full">
            {
                player.email === -1 ?
                <LogInSignUp setUser={setUser}/>
                :
                 <PlayerDetails player={player} setUser={setUser} />
            }
            
        </div>
    );
}

export default Inn;