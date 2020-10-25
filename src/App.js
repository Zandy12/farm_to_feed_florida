// Import libraries
import React from 'react';

// Import images
import officeDepot from './images/office-depot.jpg';
import bocaCode from './images/boca-code.png';
import aws from './images/aws.jpg';
import fpl from './images/fpl.jpg';
import fsfHeader from './images/fsf-header.png';
import hamburgerIcon from './images/hamburger-icon.png';

// Import CSS
import './App.css';

let seeds = 0;
let peopleFed = 0;
let player = 'Zane';

// Assign handler to message event
if ( window.addEventListener ) {
    window.addEventListener('message', handleMessage, false);
} else if ( window.attachEvent ) { // ie8
    window.attachEvent('onmessage', handleMessage);
}

function handleMessage(e) {
  // Reference to element for data display
  document.innerHTML = e.data;
console.log(e.data);
seeds = e.data.number;
//bubble_fn_1(e.data.command);
//bubble_fn_2(e.data.number);
//bubble_fn_3(e.data.string);
}

function initializeSeeds(n) {
  document.getElementById("app-frame").contentWindow.postMessage({
    command: "b-seedCounterUpdate",
    number: n.toString()
  }, "https://playcanv.as");
}

function App() {

  return (
    <div className="app">
      <div className="menu-ui">
        <img className="fsf-logo" srcSet={fsfHeader} alt="Feeding South Florida logo" />
        <br />
        <div className="menu-icon">
          <img className="hamburger-icon" srcSet={hamburgerIcon} alt="Hamburger icon" />
          <p>MENU</p>
        </div>
        <br />
          <div className="leaderboard">
            <table>
              <caption>LEADERBOARD</caption>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Meals</th>
              </tr>
              <tr>
                <td>#1</td>
                <td>User</td>
                <td>500</td>
              </tr>
              <tr>
                <td>#2</td>
                <td>User</td>
                <td>187</td>
              </tr>
              <tr>
                <td>#3</td>
                <td>User</td>
                <td>99</td>
              </tr>
              <tr>
                <td>#4</td>
                <td>User</td>
                <td>67</td>
              </tr>
              <tr>
                <td>#5</td>
                <td>User</td>
                <td>55</td>
              </tr>
              <tr>
                <td>#6</td>
                <td>User</td>
                <td>32</td>
              </tr>
              <thead>YOUR RANK</thead>
              <tr>
                <td>#100</td>
                <td>You</td>
                <td>0</td>
              </tr>
            </table>
          </div>
          <form action="https://volunteer.feedingsouthflorida.org/" target="_blank">
            <input type="submit" value="VOLUNTEER NOW" />
          </form>
      </div>
      <div className="vr"></div>
      <div className="main-ui">
        <h1>Farm to Feed Florida</h1>
        <div className="game-ui">
          <div className="seeds">
            <div className="score">
              <p>{seeds} SEEDS</p>
            </div>
            <p>START PLANTING!</p>
          </div>
          <iframe title="Farm to Feed Florida" id="app-frame" src="https://playcanv.as/e/p/BtcoDAra/" width="600" height="450"></iframe>
          { initializeSeeds(100) }
          <div className="people-fed">
            <p className="score">YOU'VE PROVIDED MEALS FOR {peopleFed} SO FAR!</p>
          </div>
        </div>
        {/*<div class="scores">
          <p class="score">Player: {player}</p>
        </div>*/}
        <div className="sponsors">
          <p><u>SPONSOR LEADERBOARD</u></p>
          <div className="ads">
            <svg fill="gray" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/><text x="5" y="16" fill="white">#1</text></svg>
            <img className="ad" srcSet={officeDepot} alt="Advertising will be shown here."/>
            
            <svg fill="gray" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/><text x="5" y="16" fill="white">#2</text></svg>
            <img className="ad" srcSet={bocaCode} alt="Advertising will be shown here."/>
            
            <svg fill="gray" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/><text x="5" y="16" fill="white">#3</text></svg>
            <img className="ad" srcSet={aws} alt="Advertising will be shown here."/>
            
            <svg fill="gray" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/><text x="5" y="16" fill="white">#4</text></svg>
            <img className="ad" srcSet={fpl} alt="Advertising will be shown here."/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
