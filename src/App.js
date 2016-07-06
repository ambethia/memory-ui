import React, { Component } from 'react';
import 'whatwg-fetch';

import Card from './Card';

const API_BASE = '192.168.128.111:4567';

const SYMBOLS = [
  '👹','💩','🤖','🎩','🍑','🍍','👾','🎼','🏹',
  '🎣','⛵','⌚','📱','🔫','💣','🎉','🎎',
  '🃏','🀄','🎴','👁','☠','⌛','🍬','🍭',
  '🍫','🍿','🍩','🍪','🍓','🍈','🍒','🌹','🌷',
  '🌼','🌸','💐','🍄','🌰','🎃','🐚','🐾','🐉',
  '🐲','🌵','🎄','🌲','🌳','🌴','🌱','🌿','☘',
  '🍀','🎍','🎋','🍃','🍂','🍁','🌾','🚣',
  '🛀','🏄','🏇','🏊','⛹','🏋','🚴','🚵'
];

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      board: [],
      revealed: 0,
      turns: 0,
    };
  }

  clickHandler = (index) => {
    if (this.state.revealed >= 2)
      return;

    this.setState({
      revealed: this.state.revealed + 1
    });
    this.doTurn(index);

    if (this.state.revealed == 1) {
      setTimeout(() => {
        this.doTurn(null);
        this.setState({
          turns: this.state.turns + 1,
          revealed: 0
        });
      }, 2000);
    }
  }

  doTurn = (index) => {
    fetch(`http://${API_BASE}/turn?index=${index}`, {
      method: 'POST',
      credentials: 'include'
    }).then((response) => {
      return response.json();
    }).then((json) => {
      let cards = json.map((value, index) => {
        return <Card
          value={SYMBOLS[value] || value}
          clickHandler={this.clickHandler}
          index={index}
          key={index}
        />;
      });
      this.setState({ board: cards });
    });
  }

  componentDidMount() {
    fetch(`http://${API_BASE}/new`, {
      credentials: 'include',
      method: 'POST'
    }).then((response) => {
      return response.json();
    }).then((json) => {
      let cards = json.map((value, index) => {
        return <Card
          value={SYMBOLS[value] || value}
          clickHandler={this.clickHandler}
          index={index}
          key={index}
        />;
      });
      this.setState({ board: cards });
    });
  }

  render() {
    return (
      <div>
        <h1>A Game of Memory</h1>
        <div className="cards">
          {this.state.board}
        </div>
        <p className="turns">You have taken {this.state.turns} turns.</p>

        <button onClick={this.endTurn}>End Turn.</button>
      </div>
    );
  }
}
