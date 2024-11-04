import React from 'react'
import SignUp from './SignUp/SignUp';

const Inn = ({player}) => {

    return(
        <div className="relative h-full w-full">
            {
                player.playerID === -1 &&
                <SignUp />
            }
            
        </div>
    );
}

export default Inn;