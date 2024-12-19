import React, { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({childre}) => {
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    return(
        <ShopContext.Provider
            value={{purchaseHistory, setPurchaseHistory}}>
                {children}
            </ShopContext.Provider>
    )
}