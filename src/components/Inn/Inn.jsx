import React, { useState } from 'react'
import LogInSignUp from './LogInSignUp/LogInSignUp';

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
            {
                player.playerID === -1 &&
                <LogInSignUp />
            }
            
        </div>
    );
}

export default Inn;