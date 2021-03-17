import React,{useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './coin.js';

function App() {
  const [coins,setCoins]=useState([]);
  const [search,setSearch]=useState('');
useEffect(()=>{
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res=>{
    setCoins(res.data);
    
  }).catch(error=>alert('error'));},[]);
 const handleChange = (e) =>{
   setSearch(e.target.value)
 }
 const filteredCoins =coins.filter((coin)=>coin.name.toLowerCase().includes(search.toLocaleLowerCase()))
  return (
    <div className="App">
      <div className="App-search">
        search a currency
        <form>
          <input type="text" placeholder="search" className="App-input" onChange={handleChange} />

        </form>
      </div>
    {filteredCoins.map((coin)=>{
    return(
      <Coin
       key ={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} volume={coin.market_cap} price={coin.current_price} priceChange={coin.price_change_percentage_24h}/>
    )
    })}
    </div>
  );
}

export default App;
