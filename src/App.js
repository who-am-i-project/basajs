// Write react application that creates a scoreboard
import React from 'react';
import './App.css';

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
    const scoreboard = require('./scoreboard.json');
    let scoreboardInfo = JSON.parse(JSON.stringify(scoreboard));
    let scoreboardItems = scoreboardInfo.scoreboardItems;

    scoreboardItems.sort(function(a, b) {
      return b.score - a.score;
    });

    let scoreboardDivs = scoreboardItems.map(function(item, index) {
      if (index < 5)
        return (
          <div key={index}>
            <div>
              {item.name}: <span>{item.score}</span>
            </div>
          </div>
        );
      else
        return null;
    });

    return (
      <div className="App">
        <div className="App-header">
          <div class="Scoreboard-wrapper">
            <h2>Scoreboard</h2>
            <div className="Scoreboard">
              <div className="Scoreboard-header">
                <div>
                  Name <span>Score</span>
                </div>
              </div>
              <div className="Scoreboard-body">{scoreboardDivs}</div>
            </div>
          </div>
          <div class="NewsAndEvent-wrapper">
            <h2>News and Event</h2>
            <div className="NewsAndEvent">
              <ul>
                <li>
                  <b>News1 Title: </b>
                  <span>News1 Description</span>
                </li>
                <li>
                  <b>News2 Title: </b>
                  <span>News2 Description</span>
                </li>
                <li>
                  <b>Event1 Title: </b>
                  <span>Event1 Description</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
} export default App;
