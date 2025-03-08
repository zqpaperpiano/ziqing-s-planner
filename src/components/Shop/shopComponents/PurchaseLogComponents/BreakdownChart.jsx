import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../../../contexts/ShopContext'
import { PieChart } from '@mui/x-charts/PieChart';

export default function BreakdownChart() {
    const { purchaseHistory, shopCategories } = useContext(ShopContext);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        let mapping = new Map();

        Object.entries(shopCategories).map((cat) => {
            mapping.set(cat[0], 0);
        })

        purchaseHistory.map((tsc) => {
            if(mapping.has(tsc.category)){
                const newVal = mapping.get(tsc.category) + 1;
                mapping.set(tsc.category, newVal);
            }
        })

        let tempArr = []

        mapping.forEach((val, key) => {
            // console.log(shopCategories[key].categoryColor);
            let temp = {
                id: key,
                value: val,
                label: shopCategories[key].categoryName,
                color: `${shopCategories[key].categoryColor}`
            }
            tempArr.push(temp);
        })

        setChartData(tempArr);
    }, [purchaseHistory])

    // useEffect(() => {
    //     console.log(chartData);
    // }, [chartData])

  return (
    <div className="h-full w-full flex items-center justify-center">
        <PieChart 
            series={[
                {
                    data: chartData
                }
            ]}
        />    
    </div>
  )
}
