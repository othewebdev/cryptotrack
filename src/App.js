import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';
/*

*/


function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
      setCoins(res.data);
    }).catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input className="coin-input" type="text" placeholder="Search"
            onChange={handleChange} />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin key={coin.id} volume={coin.total_volume} priceChange={coin.price_change_percentage_24h} name={coin.name} symbol={coin.symbol} price={coin.current_price} marketcap={coin.market_cap} image={coin.image} />
        )
      })}
    </div>
  );
}

export default App;
