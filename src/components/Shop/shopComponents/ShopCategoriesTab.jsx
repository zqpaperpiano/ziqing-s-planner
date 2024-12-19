import React from "react";
import ShopCard from "./ShopCard";
import FoodIcon from '../../../images/FoodIcon.png';
import DrinkIcon from '../../../images/DrinkIcon.png';
import TransportIcon from '../../../images/TransportIcon.png';
import BasketIcon from '../../../images/BasketIcon.png';
import ShoppingIcon from '../../../images/ShoppingIcon.png';
import SuppliesIcon from '../../../images/SuppliesIcon.png';
import UtilityIcon from '../../../images/UtilityIcon.png';
import EntertainmentIcon from '../../../images/EntertainmentIcon.png';

const ShopCategoriesTab = ({ addToShoppingLog, tabColor, onSelectTab}) => {

    return(
        <div 
        className="h-full w-full grid grid-cols-4 grid-rows-2 bg-darkPink rounded-lg">
            <div 
            onClick={()=> {onSelectTab('shopCat')}}
            className={`absolute h-full w-40 -top-7 ${tabColor} rounded-lg left-0 flex justify-center hover:cursor-pointer`}>
                <p className="font-silkscreen text-sm text-center pointer-event-none">Categories</p>
            </div>
            <ShopCard categoryName={"Food"} itemIcon={FoodIcon} purchaseItem={addToShoppingLog}/>
            <ShopCard categoryName={"Drinks"} itemIcon={DrinkIcon} purchaseItem={addToShoppingLog} />
            <ShopCard categoryName={"Transport"} itemIcon={TransportIcon} purchaseItem={addToShoppingLog} />
            <ShopCard categoryName={"Groceries"} itemIcon={BasketIcon} purchaseItem={addToShoppingLog} />
            <ShopCard categoryName={"Shopping"} itemIcon={ShoppingIcon} purchaseItem={addToShoppingLog} />
            <ShopCard categoryName={"Supplies"} itemIcon={SuppliesIcon} purchaseItem={addToShoppingLog} />
            <ShopCard categoryName={"Bills"} itemIcon={UtilityIcon} purchaseItem={addToShoppingLog} />
            <ShopCard categoryName={"Entertainment"} itemIcon={EntertainmentIcon} purchaseItem={addToShoppingLog} />
        </div>
    );
}

export default ShopCategoriesTab;