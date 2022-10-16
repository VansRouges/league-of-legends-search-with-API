import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_Key = "RGAPI-8b46fd94-ae28-4b2e-b032-55dabcdfb5d7"

  function searchForPlayer(event){
    var APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ searchText + "?api_keys" + API_Key;
    // Handle API Call
    axios.get(APICallString).then(function (response) {
       // Success
       console.log(response);
       setPlayerData(response.data);
    }).catch(function(error) {
      // Error
      console.log(error);
    });
  }

  console.log(playerData);
  return (
    <div className="App">
      <div className='container'>
        <h5>League of Legends Player Searcher</h5>
        <input type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button onClick={e => searchForPlayer(e)}>Search for Player</button>
      </div>
      { JSON.stringify(playerData) !== '{}' ?
        <>
          <p>{playerData.name}</p>
          <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.19.1/img/profileicon/" + playerData.profileIconId + ".png"} alt=""></img>
          <p>Summnoner Level: {playerData.summonerLevel}</p>
        </>
        :
        <><p>No Player data</p></>
      }
    </div>
  );
}

export default App;
