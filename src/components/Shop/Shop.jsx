import React, { useState } from "react";
import Coin from '../../images/Coin.png'
import ShopCategoriesTab from "./shopComponents/ShopCategoriesTab";
import PurchaseLogTab from "./shopComponents/PurchaseLogTab";


const Shop = () => {
    const [shoppingLog, setShoppingLog] = useState([]);
    const [selectedTab, setSelectedTab] = useState('shopCat')

    const addToShoppingLog = (itemName, price) => {
        const newItem = {[itemName]: price}
        setShoppingLog(prev => ([
            ...prev, newItem
        ]));
    }

    const onSelectTab = (newTab) => {
        setSelectedTab(newTab);
    }

    return(
        <div className="h-full w-full p-2 flex flex-col items-center justify-center">
            <div className="relative h-8 w-full">
                <div className="absolute right-8 h-full w-fit flex items-center">
                    <img src={Coin} className="h-full object-fit" />
                    <p className="font-tiny5 text-2xl">1000</p>
                </div>
                <div className="absolute left-8 h-full w-fit hover:cursor-pointer hover:bg-turqoiseGreen rounded-lg p-2 flex items-center justify-center">
                    <p className="font-tiny5 text-l ">Add money</p>
                </div>
            </div>
            <div className="relative w-full flex-1 flex items-center justify-center">
                <div className={`absolute h-full w-95p ${selectedTab === 'shopCat' ? 'z-50' : 'z-20'}`}>
                    <ShopCategoriesTab onSelectTab={onSelectTab} addToShoppingLog={addToShoppingLog} tabColor={selectedTab === 'shopCat' ? 'bg-darkPink' : 'bg-midPink'} />
                </div>
                <div className={`absolute h-full w-full ${selectedTab === 'purchaseLog' ? 'z-50' : 'z-20'}`}>
                    <PurchaseLogTab onSelectTab={onSelectTab} tabColor={selectedTab === 'purchaseLog' ? 'bg-darkPink' : 'bg-midPink'}/>
                </div>
            </div>
        </div>
    );
}

export default Shop;