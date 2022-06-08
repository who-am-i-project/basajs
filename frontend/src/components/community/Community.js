import React, { useEffect, useState } from 'react';
import '../../styles/Community.css';

const Community = () => {
  const [scoreboardItems, setScoreboardItems] = useState([]);

  useEffect(() => {
    fetch("/scoreboard/scoreboardItems").then(res => res.json())
      .then(parsed => parsed.sort((a, b) => b.score - a.score))
      .then(sorted => setScoreboardItems(sorted));
  }, []);

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
