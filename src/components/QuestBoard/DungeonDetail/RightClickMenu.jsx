import React from "react";

const RightClickMenu = ({ position }) => {
    return(
        <div className="absolute bg-bgPink rounded-lg" style={{top: `${position.y}px`, left: `${position.x}px`, height: '150px', width: '100px'}}>

        </div>
    )
}

export default RightClickMenu;