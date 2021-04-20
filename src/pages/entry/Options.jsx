import axios from 'axios';
import { useEffect, useState } from 'react';
import  Row  from 'react-bootstrap/Row';

import ScoopOptions from './ScoopOptions';

export default function Options({optionType}) {
  const [items, setItems] = useState([]);

  //options is scoops or toppings
  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
    .then(response => setItems(response.data))
    .catch(error => {
      console.log(`There was an error ${error}`);
    });
  }, [optionType]);

  // TODO replace with toppings once made
  const ItemComponent = optionType === 'scoops' ? ScoopOptions : null;

  const optionItems = items.map( (item) => (
    <ItemComponent 
    key={item.name} 
    name={item.name} 
    imagePath={item.imagePath} 

    />
  ));
  return <Row>{optionItems}</Row>;
}