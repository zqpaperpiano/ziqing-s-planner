import React, { useEffect } from "react";

const TabBar = ({tab, width, onMaximiseTab}) => {

    return(
        <div 
        onClick={() => onMaximiseTab(tab[0])}
        style={{width: `${width}px`}}
        className="h-3/4 items-end bg-white border-2 border-black rounded-tr-lg overflow-hidden text-elipsis whitespace-nowrap hover:cursor-pointer hover:bg-slate-400 hover:bg-opacity-50">
            <p className="truncate text-sm">{tab[1].title}</p>
        </div>
    );
}

export default TabBar;