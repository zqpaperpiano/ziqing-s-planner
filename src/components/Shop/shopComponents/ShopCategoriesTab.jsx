import React from "react";
import ShopCard from "./ShopCategoryComponents/ShopCard";
import FoodIcon from '../../../images/FoodIcon.png';
import DrinkIcon from '../../../images/DrinkIcon.png';
import TransportIcon from '../../../images/TransportIcon.png';
import BasketIcon from '../../../images/BasketIcon.png';
import ShoppingIcon from '../../../images/ShoppingIcon.png';
import SuppliesIcon from '../../../images/SuppliesIcon.png';
import UtilityIcon from '../../../images/UtilityIcon.png';
import EntertainmentIcon from '../../../images/EntertainmentIcon.png';
import { StepBack, StepForward } from "lucide-react";

const ShopCategoriesTab = ({ addToShoppingLog, tabColor, onSelectTab}) => {

    return(
        <div 
        className="h-full w-full bg-darkPink flex justify-center items-center">
            <div 
            onClick={()=> {onSelectTab('shopCat')}}
            className={`absolute h-full w-40 -top-7 ${tabColor} rounded-lg left-0 flex justify-center hover:cursor-pointer`}>
                <p className="font-silkscreen text-sm text-center pointer-event-none">Categories</p>
            </div>
            <div className="absolute h-full w-full flex flex-col justify-center items-center">
                <div className="h-95p w-full flex">
                    <div className="h-full w-2.5p flex items-center justify-center hover:cursor-pointer">
                        <StepBack />
                    </div>
                    <div className="h-full w-full grid grid-cols-4 grid-rows-2  rounded-lg justify-center items-center">
                        <ShopCard categoryName={"Food"} itemIcon={FoodIcon} purchaseItem={addToShoppingLog}/>
                        <ShopCard categoryName={"Drinks"} itemIcon={DrinkIcon} purchaseItem={addToShoppingLog} />
                        <ShopCard categoryName={"Transport"} itemIcon={TransportIcon} purchaseItem={addToShoppingLog} />
                        <ShopCard categoryName={"Groceries"} itemIcon={BasketIcon} purchaseItem={addToShoppingLog} />
                        <ShopCard categoryName={"Shopping"} itemIcon={ShoppingIcon} purchaseItem={addToShoppingLog} />
                        <ShopCard categoryName={"Supplies"} itemIcon={SuppliesIcon} purchaseItem={addToShoppingLog} />
                        <ShopCard categoryName={"Bills"} itemIcon={UtilityIcon} purchaseItem={addToShoppingLog} />
                        <ShopCard categoryName={"Entertainment"} itemIcon={EntertainmentIcon} purchaseItem={addToShoppingLog} />
                    </div>  
                    <div className="h-full w-2.5p flex items-center justify-center hover:cursor-pointer">
                        <StepForward />
                    </div>
                </div>
                <div className="h-5p w-full flex justify-center items-center">
                    Page Tracker
                </div>
            </div>
        </div>
    );
}

export default ShopCategoriesTab;