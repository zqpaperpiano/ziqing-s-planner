import React, { useState } from 'react'
import LogInSignUp from './LogInSignUp/LogInSignUp';
import PlayerDetails from './PlayerDetails/PlayerDetails';

const Inn = ({player}) => {
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
                 <PlayerDetails player={player}/>
        </div>
    );
}

export default Inn;