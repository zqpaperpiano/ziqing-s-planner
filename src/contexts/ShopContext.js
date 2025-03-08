import { m } from "framer-motion";
import React, { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({children}) => {
    const [shopCategories, setShopCategories] = useState({
            "sc1": {
                categoryName: 'food',
                categoryColor: '#ff6b6b'
            },
            "sc2": {
                categoryName: 'drinks',
                categoryColor: '#ffb72b',
            },
            "sc3": {
                categoryName: 'transport',
                categoryColor: '#f3d250',
            },
            "sc4": {
                categoryName: 'groceries',
                categoryColor: '#8ac926',
            },
            "sc5": {
                categoryName: 'shopping',
                categoryColor: '#1fa2ff',
            },
            "sc6": {
                categoryName: 'supplies',
                categoryColor: '#9b5de5',
            },
            "sc7": {
                categoryName: 'bills',
                categoryColor: '#ff4d6d',
            },
            "sc8": {
                categoryName: 'entertainment',
                categoryColor: '#00b4d8',
            }
        })
    const [purchaseHistory, setPurchaseHistory] = useState([
        {
            transactionId: '2023112301',
            transactionDate: '2023-11-23',
            amount: 29.99,
            itemName: 'Groceries',
            category: 'sc8'
          },
          {
            transactionId: '2023112401',
            transactionDate: '2023-11-24',
            amount: 19.99,
            itemName: 'Movie Ticket',
            category: 'sc3'
          },
          {
            transactionId: '2023112501',
            transactionDate: '2023-11-25',
            amount: 50.00,
            itemName: 'Rent',
            category: 'sc4'
          },
          {
            transactionId: '2023112601',
            transactionDate: '2023-11-26',
            amount: 30.00,
            itemName: 'Coffee',
            category: 'sc7'
          },
          {
            transactionId: '2023112701',
            transactionDate: '2023-11-27',
            amount: 15.99,
            itemName: 'Book',
            category: 'sc6'
          },
          {
            transactionId: '2023112801',
            transactionDate: '2023-11-28',
            amount: 25.00,
            itemName: 'Dinner',
            category: 'sc1'
          },
          {
            transactionId: '2023112901',
            transactionDate: '2023-11-29',
            amount: 10.00,
            itemName: 'Bus Fare',
            category: 'sc5'
          },
          {
            transactionId: '2023113001',
            transactionDate: '2023-11-30',
            amount: 50.00,
            itemName: 'Phone Bill',
            category: 'sc3'
          },
          {
            transactionId: '2023120101',
            transactionDate: '2023-12-01',
            amount: 20.00,
            itemName: 'Concert Ticket',
            category: 'sc2'
          },
          {
            transactionId: '2023120201',
            transactionDate: '2023-12-02',
            amount: 10.00,
            itemName: 'Snack',
            category: 'sc5'
          }
    ]);

    return(
        <ShopContext.Provider
            value={{purchaseHistory, setPurchaseHistory, shopCategories, setShopCategories}}>
                {children}
            </ShopContext.Provider>
    )
}

