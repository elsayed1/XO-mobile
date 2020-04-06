import React, { Component } from "react";
import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import { ListItem } from "react-native-elements";
import GameEnd from "./common/gameEnd";
import Square from "./common/square";
export default class Board extends Component {
  state = {
    board: [...new Array(3).fill(new Array(3).fill(""))],
    player1: null,
    player2: null,
    roomName: null,
    header: `waiting for second player `,
    playTurn: false,
    mark: "X",
    winner: false,
    //score
    X: 0,
    O: 0
  };
  componentDidMount() {
    const roomName = this.props.navigation.getParam("roomName");
    const player1 = this.props.navigation.getParam("player1");
    const player2 = this.props.navigation.getParam("player2");
    this.socket = this.props.navigation.getParam("socket");
    if (player2) this.setState({ mark: "O", header: "waiting for player" });
    this.setState({ player1, roomName, player2 });
    //this mean a second player has joined hte room
    // and this is for  player 1
    this.socket.on("player1", data => {
      this.socket.emit("player2", {
        player1: this.state.player1,
        roomName: this.state.roomName
      });
      this.setState({
        playTurn: true,
        player2: data.player2,
        header: `${data.player2} has joined the room`
      });
    });
    this.socket.on("data", ({ player1 }) => {
      this.setState({ player1 });
    });

    this.socket.on("turnPlayed", data => {
      let board = [...this.state.board];
      let newBoard = board.map((row, rw) => {
        return row.map((column, col) => {
          if (data.tile.r === rw && data.tile.c === col)
            return (column = player1 ? "O" : "X");
          return column;
        });
      });
      this.getWinner(newBoard);
      this.setState({ board: newBoard, playTurn: true, header: "your turn" });
    });
  }
  getWinner = board => {
    let winner = null;
    for (let i = 0; i < 3; i++) {
      let noX1 = 0,
        noO1 = 0,
        noX2 = 0,
        noO2 = 0;
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "X") ++noX1;
        else if (board[i][j] === "O") ++noO1;
        if (board[j][i] === "X") ++noX2;
        else if (board[j][i] === "O") ++noO2;
      }
      if (noX1 === 3 || noX2 === 3) {
        winner = "X";
        break;
      }
      if (noO1 === 3 || noO2 === 3) {
        winner = "O";
        break;
      }
    }
    let noX = 0,
      noO = 0;
    for (let i = 0; i < 3; i++) {
      if (board[i][i] === "X") ++noX;
      else if (board[i][i] === "O") ++noO;
    }
    if (noX === 3) winner = "X";
    else if (noO === 3) winner = "O";
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[2][0] === "X"
    )
      winner = "X";
    else if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[2][0] === "O"
    )
      winner = "O";
    this.setState({ winner, [winner]: this.state[winner] + 1 });
  };
  squareClick = (r, c) => {
    // Emit an event to update other player that you've played your turn.
    if (!this.state.playTurn)
      return ToastAndroid.show("this is not your turn", ToastAndroid.SHORT);

    if (this.state.board[r][c])
      return ToastAndroid.show("this square is filled", ToastAndroid.SHORT);
    this.socket.emit("playTurn", {
      tile: { r, c },
      room: this.state.roomName
    });
    let board = [...this.state.board];
    let newBoard = board.map((row, rw) => {
      return row.map((column, col) => {
        if (r === rw && c === col) return (column = this.state.mark);
        return column;
      });
    });

    this.getWinner(newBoard);
    this.setState({
      board: newBoard,
      playTurn: false,
      header: `waiting for player`
    });
  };

  playAgain = () => {
    this.setState({
      board: [...new Array(3).fill(new Array(3).fill(""))],
      playTurn: this.state.mark === this.state.winner ? true : false,
      header:
        this.state.mark === this.state.winner
          ? "your turn"
          : "waiting for a player",
      winner: false
    });
  };
  renderBoard = board => {
    return board.map((row, r) => {
      return (
        <View style={styles.row} key={r}>
          {row.map((square, c) => {
            return (
              <Square
                key={[r, c]}
                style={styles.square}
                value={square}
                onPress={e => this.squareClick(r, c)}
              />
            );
          })}
        </View>
      );
    });
  };

  render() {
    const { board } = this.state;
    return (
      <View style={styles.board}>
        <GameEnd
          isVisible={this.state.winner ? true : false}
          playAgain={this.playAgain}
          winner={this.state.winner}
        />
        <View>
          <ListItem
            leftAvatar={{
              title: "S"
            }}
            rightAvatar={{
              title: "A"
            }}
            rightTitle={this.state.player2}
            rightSubtitle={this.state.O || "0"}
            title={this.state.player1}
            subtitle={this.state.X || "0"}
          />
        </View>
        <Text style={styles.text}>{this.state.roomName}</Text>
        <Text style={styles.text}>{this.state.header}</Text>
        {this.renderBoard(board)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  board: {
    flex: 1,
    flexDirection: "column",
    shadowColor: "black",
    shadowOpacity: 0.5,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#FB7D79"
  },
  row: {
    alignSelf: "center",
    flexDirection: "row",
    marginVertical: 0,
    marginHorizontal: 0
  },
  text: {
    marginBottom: 10,
    fontSize: 30,
    color: "#816F90",
    alignSelf: "center"
  }
});
