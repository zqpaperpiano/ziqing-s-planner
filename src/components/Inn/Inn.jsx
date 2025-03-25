import React, { useState } from 'react'
import LogInSignUp from './LogInSignUp/LogInSignUp';
import PlayerDetails from './PlayerDetails/PlayerDetails';

const Inn = () => {

    return(
        <div className="relative h-full w-full">
            <PlayerDetails  />
        </div>
    );
}

export default Inn;