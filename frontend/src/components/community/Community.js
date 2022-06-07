// Write react application that creates a scoreboard
import React from 'react';
import '../../styles/Community.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      highScore: 0,
      message: 'Click to start',
      color: 'black',
      backgroundColor: 'white'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      score: this.state.score + 1,
      message: 'Good job!',
      color: 'green',
      backgroundColor: 'lightgreen'
    });
    if (this.state.score > this.state.highScore) {
      this.setState({
        highScore: this.state.score,
        message: 'New high score!',
        color: 'green',
        backgroundColor: 'lightgreen'
      });
    }
  }
  render() {
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
} export default App;
