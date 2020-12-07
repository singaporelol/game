import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playground: new Array(3).fill("").map((u) => new Array(3).fill("")),
      player1: new Player("player1", "X"),
      player2: new Player("player2", "O"),
      playerList: [],
      winner: new Player(),
    };
  }
  componentDidMount() {
    this.state.playerList.push(this.state.player1);
    this.state.playerList.push(this.state.player2);
  }
  playHandler(rowIndex, colIndex) {
    let { playerList } = this.state;
    let currentPlayer = playerList.shift();
    let tempPlayground = this.state.playground;
    tempPlayground[rowIndex][colIndex] = currentPlayer.sign;
    this.setState(
      {
        playerList: [...playerList, currentPlayer],
        playground: [...tempPlayground],
      },
      () => {
        let winner = this.judgeWinner(tempPlayground);
        console.log(winner);
        if (winner) {
          this.setState({
            winner,
          });
        }
      }
    );
  }

  judgeWinner(tempPlayground) {
    //first row winner
    
    console.log(tempPlayground);
    if (
      tempPlayground[0][0] === tempPlayground[0][1] &&
      tempPlayground[0][1] === tempPlayground[0][2] &&
      tempPlayground[0][0] &&
      tempPlayground[0][1] &&
      tempPlayground[0][2]
    ) {
      let sign = tempPlayground[0][0];
      console.log(sign);
      return this.findWinner(sign);
    }
    if (
      tempPlayground[1][0] === tempPlayground[1][1] &&
      tempPlayground[1][1] === tempPlayground[1][2] &&
      tempPlayground[1][0] &&
      tempPlayground[1][1] &&
      tempPlayground[1][2]
    ) {
      let sign = tempPlayground[1][0];
      return this.findWinner(sign);
    }
    if (
      tempPlayground[2][0] === tempPlayground[2][1] &&
      tempPlayground[2][1] === tempPlayground[2][2] &&
      tempPlayground[2][0] &&
      tempPlayground[2][1] &&
      tempPlayground[2][2]
    ) {
      let sign = tempPlayground[2][0];
      return this.findWinner(sign);
    }
    //first col winner
    if (
      tempPlayground[0][0] === tempPlayground[1][0] &&
      tempPlayground[1][0] === tempPlayground[2][0] &&
      tempPlayground[0][0] &&
      tempPlayground[1][0] &&
      tempPlayground[2][0]
    ) {
      let sign = tempPlayground[0][0];
      return this.findWinner(sign);
    }
    if (
      tempPlayground[0][1] === tempPlayground[1][1] &&
      tempPlayground[1][1] === tempPlayground[2][1] &&
      tempPlayground[0][1] &&
      tempPlayground[1][1] &&
      tempPlayground[2][1]
    ) {
      let sign = tempPlayground[0][1];
      return this.findWinner(sign);
    }
    if (
      tempPlayground[0][2] === tempPlayground[1][2] &&
      tempPlayground[1][2] === tempPlayground[2][2] &&
      tempPlayground[0][2] &&
      tempPlayground[1][2] &&
      tempPlayground[2][2]
    ) {
      let sign = tempPlayground[0][2];
      return this.findWinner(sign);
    }
    //diagonal
    if (
      tempPlayground[0][0] === tempPlayground[1][1] &&
      tempPlayground[1][1] === tempPlayground[2][2] &&
      tempPlayground[0][0] &&
      tempPlayground[1][1] &&
      tempPlayground[2][2]
    ) {
      let sign = tempPlayground[0][0];
      return this.findWinner(sign);
    }
    if (
      tempPlayground[0][2] === tempPlayground[1][1] &&
      tempPlayground[1][1] === tempPlayground[2][0] &&
      tempPlayground[0][2] &&
      tempPlayground[1][1] &&
      tempPlayground[2][0]
    ) {
      let sign = tempPlayground[0][2];
      return this.findWinner(sign);
    }
    return null;
  }

  findWinner(sign) {
    var winner;
    this.state.playerList.forEach((u) => {
      if (u.sign === sign) {
        winner = u;
      }
    });
    return winner;
  }
  render() {
    return (
      <div>
        {this.state.winner.name && (
          <span>winner is {this.state.winner.name}</span>
        )}
        {this.state.playground.map((u, rowIndex) => {
          return (
            <div
              key={`row${rowIndex}`}
              style={{
                height: "30px",
                width: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {u.map((v, colIndex) => {
                return (
                  <div
                    key={`row${rowIndex}${colIndex}`}
                    style={{
                      backgroundColor: "pink",
                      height: "30px",
                      width: "100%",
                      textAlign: "center",
                      border: "1px solid #000",
                    }}
                    onClick={() => this.playHandler(rowIndex, colIndex)}
                  >
                    {v}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

class Player {
  constructor(name, sign) {
    this.name = name;
    this.sign = sign;
  }
}
