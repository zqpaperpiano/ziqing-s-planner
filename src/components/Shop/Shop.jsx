import React, { useState } from "react";
import Coin from '../../images/Coin.png'
import ShopCard from "./shopComponents/ShopCard";
import FoodIcon from '../../images/FoodIcon.png';
import DrinkIcon from '../../images/DrinkIcon.png';
import TransportIcon from '../../images/TransportIcon.png';
import BasketIcon from '../../images/BasketIcon.png';
import ShoppingIcon from '../../images/ShoppingIcon.png';
import SuppliesIcon from '../../images/SuppliesIcon.png';
import UtilityIcon from '../../images/UtilityIcon.png';
import EntertainmentIcon from '../../images/EntertainmentIcon.png';
import { Button } from "@mui/material";

const Shop = () => {
    const [shoppingLog, setShoppingLog] = useState([]);

    const addToShoppingLog = (itemName, price) => {
        const newItem = {[itemName]: price}
        setShoppingLog(prev => ([
            ...prev, newItem
        ]));
    }

    return(
        <div className="h-full w-full p-2 flex flex-col">
            <div className="relative h-8 w-full">
                <div className="absolute right-8 h-full w-fit flex items-center">
                    <img src={Coin} className="h-full object-fit" />
                    <p className="font-tiny5 text-2xl">1000</p>
                </div>
            </div>
            <div className="w-full flex-1 grid grid-cols-4 grid-rows-2">
                <ShopCard categoryName={"Food"} itemIcon={FoodIcon} purchaseItem={addToShoppingLog}/>
                <ShopCard categoryName={"Drinks"} itemIcon={DrinkIcon} purchaseItem={addToShoppingLog} />
                <ShopCard categoryName={"Transport"} itemIcon={TransportIcon} purchaseItem={addToShoppingLog} />
                <ShopCard categoryName={"Groceries"} itemIcon={BasketIcon} purchaseItem={addToShoppingLog} />
                <ShopCard categoryName={"Shopping"} itemIcon={ShoppingIcon} purchaseItem={addToShoppingLog} />
                <ShopCard categoryName={"Supplies"} itemIcon={SuppliesIcon} purchaseItem={addToShoppingLog} />
                <ShopCard categoryName={"Bills"} itemIcon={UtilityIcon} purchaseItem={addToShoppingLog} />
                <ShopCard categoryName={"Entertainment"} itemIcon={EntertainmentIcon} purchaseItem={addToShoppingLog} />
            </div>
        </div>
    );
}

export default Shop;