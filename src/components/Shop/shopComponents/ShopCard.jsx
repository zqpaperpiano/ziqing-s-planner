import React, {useState, useEffect} from "react";
import {motion} from 'framer-motion';
import './ShopCard.css';
import { Button } from "@mui/material";

const ShopCard = ({categoryName, itemIcon, purchaseItem}) => {
    const [isFlipped, setIsFlipped] = useState(true);
    const [isAnimate, setIsAnimate] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);

    const handleOnClick =(e) => {
        const element = e.target.tagName
        if(!isAnimate && element !== "INPUT"){
            setIsFlipped(!isFlipped);
            setIsAnimate(true);
        }
    }

    const onChangeItemName = (e) => {
        setItemName(e.target.value);
    }

    const onChangeItemPrice = (e) => {
        setItemPrice(e.target.value);
    }

    const onPurchaseItem = () => {
        purchaseItem(itemName, itemPrice);
    }

    return(
        <div className="h-full w-full p-2">
            <div 
            onClick={(e) => handleOnClick(e)}
            className={`relative h-full w-full rounded-lg perspective-1000`}>
                <motion.div
                    className="flip-card-inner h-full w-full rounded-lg"
                    initial={false}
                    animate={{rotateY: isFlipped ? 180 : 360}}
                    transition={{duration: 0.6, animationDirection: "normal"}}
                    onAnimationComplete={() => setIsAnimate(false)}
                >
                    <div className="absolute inset-0 transform rotate-y-180 h-full w-full rounded-lg  bg-gradient-to-b from-[#fbd4de] to-deepPink ">
                        <div className="relative h-full w-full flex flex-col items-center justify-center">
                            <div className="absolute top-4 h-[100px] w-[100px]">
                                <img src={itemIcon} className="h-full w-full object-fit" />
                            </div>
                            <p className="absolute bottom-8 font-silkscreen text-2xl text-center ">{categoryName}</p>
                        </div>
                    </div>

                    <div className="tranform rotate-y-180 absolute inset-0 backface-hidden h-full w-full rounded-lg bg-gradient-to-b from-[#fbd4de] to-deepPink">
                        <div className="h-full w-full flex flex-col items-center justify-center font-silkscreen text-sm p-2">
                            <div className="flex-1 w-95p">
                                <p>Item Ordered:</p>
                                <input 
                                    onChange={onChangeItemName}
                                    type="text"
                                    className=" p-2  w-full rounded-lg border-none outline-none bg-bgPink" />
                            </div>
                            <div className="flex-1 w-95p">
                                <p>Cost:</p>
                                <input 
                                    onChange={onChangeItemPrice}
                                    type="number"
                                    className="p-2  w-full rounded-lg border-none outline-none bg-bgPink" />
                            </div>
                            <div className="flex-1 w-full flex items-center justify-center">
                                <Button
                                    sx={{
                                        backgroundColor: '#8bd4bc',
                                        color: '#2b3e3b',
                                        fontFamily: 'silkscreen'
                                    }}>
                                        Purchase
                                    </Button>
                            </div>

                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}

export default ShopCard;