import Options from './Options';
import {  useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderEntry() {
  // main start page, reveals the start of the 
  const [orderDetails] = useOrderDetails();
  return (
  <div>
    <h1>Order your sundae!</h1>
    <Options optionType='scoops' />
    <Options optionType='toppings' />
    <h2>Grand total: {orderDetails.totals.grandTotal} </h2>
  </div>);
}