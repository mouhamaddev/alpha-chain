import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';

function FetchJson() {
  const [data,setData]=useState([]);
  const getData=()=>{
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])
  return (

       data && data.length>0 && data.map((item)=><Text>{item.name}  :  {item.current_price}</Text>)
       

  );
}

export default FetchJson;