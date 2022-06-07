import React, { useState } from 'react';
import '../../styles/Community.css';

const Community = (props) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('Click to start');
  const [color, setColor] = useState('black');
  const [backgroundColor, setBackgroundColor] = useState('white');

  const handleClick = () => {
    setScore((prevScore) => prevScore + 1);
    setMessage('Good job!');
    setColor('green');
    setBackgroundColor('lightgreen');
    if (score > highScore) {
      setHighScore(score);
      setMessage('New high score!');
      setColor('green');
      setBackgroundColor('lightgreen');
    }
  }

  const scoreboard = require('scoreboard.json');
  let scoreboardInfo = JSON.parse(JSON.stringify(scoreboard));
  let scoreboardItems = scoreboardInfo.scoreboardItems;

  scoreboardItems.sort(function (a, b) {
    return b.score - a.score;
  });

  let scoreboardDivs = scoreboardItems.map(function (item, index) {
    if (index < 5)
      return (
        <div key={index}>
          <div>
            {item.name.toUpperCase()} : {item.score}
          </div>
        </div>
      );
    else
      return null;
  });

  return (
    <div className="App-header">
      <div className="Scoreboard-wrapper">
        <div className="Header">Scoreboard</div>
        <div className="Scoreboard">
          <div className="Scoreboard-body">{scoreboardDivs}</div>
        </div>
      </div>
      <div className="NewsAndEvent-wrapper">
        <div className="Header">NEWS AND EVENTS</div>
        <div className="NewsAndEvent">
          <ul>
            <li>
              <b>First release: </b>
              <span className="strikeThrough">On Friday, 3rd June</span>
              <span> On Wednesday, 8th June</span>
            </li>
            <li>
              <b>Source code: </b>
              <span>Available on <a href="https://github.com/viktorpovazhuk/basajs">GitHub</a></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Community;
