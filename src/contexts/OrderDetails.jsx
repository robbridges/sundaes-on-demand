import  { createContext, useContext, useState, useMemo } from 'react';

const OrderDetails = createContext();

//create custom hook  to see if in provider or not

function useOrderDetails() {
  const context = useContext(OrderDetails);

  if(!context) {
    throw new Error('userOrderDetails must be used within an OrderDetailsProvider');
  }

  return context;
}

function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
})

const

  const value = useMemo(() => {

    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    //getter: value of internal state, options of scoops and topping, also contains subtotals and totals
    //setter: just the option counts, we will update total option counts within the consumer
    return [{ ...optionCounts }, updateItemCount];
  }, [optionCounts]);
  return <OrderDetails.Provider value={value} {...props} />;
}

