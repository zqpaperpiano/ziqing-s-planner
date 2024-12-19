import React from "react";

const PurchaseLogTab = ({ tabColor, onSelectTab }) => {
    return(
        <div className="relative h-full w-full rounded-lg bg-darkPink">
            <div 
            onClick={() => {onSelectTab('purchaseLog')}}
            className={`absolute -top-7 left-36 rounded-lg w-40 h-full ${tabColor} hover:cursor-pointer z-0`}>
                <p className="font-silkscreen text-sm text-center pointer-event-none">Log</p>
            </div>
            <div className="absolute h-full w-1/2 rounded-lg flex flex-col items-center justify-center z-50">
                <p>Overview</p>
                <div className="h-12 w-3/4 flex grid grid-cols-4 justify-center items-center text-center">
                    <p className="hover:cursor-pointer">This week</p>
                    <p className="hover:cursor-pointer">This month</p>
                    <p className="hover:cursor-pointer">This year</p>
                    <p className="hover:cursor-pointer">All time</p>
                </div>
                <div className="h-2/3 w-3/4 border border-black">
                </div>

            </div>
        </div>
    );
}

export default PurchaseLogTab