import React from "react";
import Coin from '../../images/Coin.png'
import ShopCard from "./shopComponents/ShopCard";

const Shop = () => {
    return(
        <div className="h-full w-full p-2 flex flex-col">
            <div className="relative h-8 w-full">
                <div className="absolute right-8 h-full w-fit flex items-center">
                    <img src={Coin} className="h-full object-fit" />
                    <p className="font-tiny5 text-2xl">1000</p>
                </div>
            </div>
            <div className="w-full flex-1 border-yellow-900 border-2 grid grid-cols-4 grid-rows-2">
                <ShopCard />
            </div>
            <div className="w-full h-10p">
            </div>
        </div>
    );
}

export default Shop;