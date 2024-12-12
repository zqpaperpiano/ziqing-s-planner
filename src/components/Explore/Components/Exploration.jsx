import React from "react";
import ToDoList from "../../ToDoList/ToDoList";

const Exploration = ({ time, dungeon }) => {
    

    return(
        <div className="fixed inset-0 bg-black z-50 flex justify-center items-center font-silkscreen text-white">
            <div className="h-full w-full flex justify-center items-center font-tiny5 text-9xl">
                <p className="tracking-widest">25:00</p>
            </div>
            <div className="h-full w-1/4 absolute right-0 top-0 flex flex-col ">
                {
                    dungeon &&
                    <div className="h-1/4 w-full flex items-center jutify-center">
                
                 </div>
                }
                <div className={`w-full flex items-center justify-center ${dungeon ? 'h-3/4' : 'h-full'}`}>
                    <ToDoList />
                </div>
            </div>

        </div>
    )
}

export default Exploration; 