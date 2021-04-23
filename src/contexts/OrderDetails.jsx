import  { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants/index';

const OrderDetails = createContext();

//create custom hook  to see if in provider or not

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if(!context) {
    throw new Error('userOrderDetails must be used within an OrderDetailsProvider');
  }

  return context;
}

function calculateSubTotal(optionType, optionCounts) {
  let optionCount = 0;
  for(const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
})

const [totals, setTotals] = useState({
  scopps: 0,
  toppings: 0,
  grandTotal: 0,
})

useEffect( () => {
  const scoopsSubTotal = calculateSubTotal('scoops', optionCounts);
  const toppingsSubTotal = calculateSubTotal('toppings', optionCounts);
  const grandTotal = scoopsSubTotal + toppingsSubTotal;
  setTotals({
    scoops: scoopsSubTotal,
    toppings: toppingsSubTotal,
    grandTotal,
  })
}, [optionCounts]);

  const value = useMemo(() => {

    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    //getter: value of internal state, options of scoops and topping, also contains subtotals and totals
    //setter: just the option counts, we will update total option counts within the consumer component
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}

