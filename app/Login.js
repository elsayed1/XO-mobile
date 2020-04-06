import React, { Component } from "react";
import { StyleSheet, View, Text, YellowBox } from "react-native";
import { Card, ListItem, Button, Icon, Input } from "react-native-elements";

import io from "socket.io-client";

class Login extends Component {
  state = {
    player1: null,
    player2: null,
    roomName: null
  };
  componentDidMount() {
    YellowBox.ignoreWarnings([
      "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
    ]);
    this.socket = io("https://agile-everglades-10098.herokuapp.com/");
    //remote server https://agile-everglades-10098.herokuapp.com/
    //local server http://192.168.122.1:3000
  }
  createRoom = () => {
    let { player1 } = this.state;
    this.socket.emit("create game", player1);
    this.socket.on("new game", ({ player1, roomName }) => {
      this.props.navigation.navigate("Board", {
        socket: this.socket,
        player1,
        roomName
      });
    });
  };
  joinRoom = () => {
    let { roomName, player2 } = this.state;
    this.socket.emit("join game", { roomName, player2 });
    this.socket.on("player2", ({ player2, roomName }) => {
      this.props.navigation.navigate("Board", {
        socket: this.socket,
        player2,
        roomName
      });
    });
  };
  render() {
    return (
      <View style={styles.view}>
        <Card containerStyle={styles.card}>
          <Text style={styles.text}>Create new room</Text>
          <Input
            inputStyle={styles.input}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={player1 => this.setState({ player1 })}
            placeholder="enter your name"
            placeholderTextColor="#E3ECF3"
          />
          <Button
            onPress={this.createRoom}
            buttonStyle={styles.button}
            title="create room"
          >
            create room
          </Button>
        </Card>
        <Card containerStyle={styles.card}>
          <Text style={styles.text}>Join a room</Text>
          <Input
            inputStyle={styles.input}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            s
            placeholder="name"
            placeholderTextColor="#E3ECF3"
            onChangeText={player2 => this.setState({ player2 })}
          />
          <Input
            inputStyle={styles.input}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            placeholder="enter room ID"
            placeholderTextColor="#E3ECF3"
            onChangeText={roomName => this.setState({ roomName })}
          />
          <Button
            title="join room"
            buttonStyle={styles.button}
            onPress={this.joinRoom}
          >
            join room
          </Button>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#E3ECF3"
  },
  view: {
    flex: 1,
    backgroundColor: "#E3ECF3",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: "100%",
    padding: 50,
    backgroundColor: "#3B649F",
    borderColor: "transparent",
    opacity: 0.8
  },
  input: {
    width: 150,
    color: "#E3ECF3",
    backgroundColor: "rgba(0,0,0,.4)",
    height: 40,
    borderRadius: 20,
    paddingLeft: 15,
    borderColor: "transparent",
    marginBottom: 10
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#1D253E",
    marginTop: 10
  }
});
export default Login;
